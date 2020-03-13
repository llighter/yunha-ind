/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require("dotenv").config();
const isProd = process.env.ELEVENTY_ENV === "prod";

const fs = require("fs").promises;
const path = require("path");
const log = require("fancy-log");
const rollupPluginNodeResolve = require("rollup-plugin-node-resolve");
const rollupPluginCJS = require("rollup-plugin-commonjs");
const rollupPLuginPostCSS = require("rollup-plugin-postcss");
const rollupPluginVirtual = require("rollup-plugin-virtual");
const rollup = require("rollup");
const terser = isProd ? require("terser") : null;
const {getManifest} = require("workbox-build");
const site = require("./src/site/_data/site");

// Rejection은 promise에서 발생하는 에러를 칭한다.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event
process.on("unhandledRejection", (reason, p) => {
    log.error("Build had unhandled rejection", reason, p);
    process.exit(1);
});

const bootstrapConfig = {
    prod: isProd,
    version:
      "v" +
      new Date()
        .toISOString()
        .replace(/[\D]/g, "")
        .slice(0, 12),
  };
  
  const defaultPlugins = [
    rollupPluginNodeResolve(),
    rollupPluginCJS({
      include: "node_modules/**",
    }),
  ];

/**
 * Builds the cache manifest for inclusion into the Service Worker.
 * 
 * TODO: This relies on both the gulp and CSS tasks occuring
 * before the Rollup build script
 */
async function buildCacheManifest() {
    const toplevelManifest = await getManifest({
        globDirectory: "docs",
        globPatterns: ["images/**", "*.css"],
    });
    if (toplevelManifest.warnings.legnth) {
        throw new Error(`toplevel manifest: ${toplevelManifest.warnings}`);
    }

    // Note that Workbox asumes "blah/index.html" is the same as requests to "blah/" for free, so
    // rewriting the URLs below isn't neccessary
    const contentManifest = await getManifest({
        globDirectory: "docs",
        globPatterns: [
            "index.html",
            "offline/index.html",
            "images/**/*.{png,svg,jpg}",    // .jpg files are used for author, skip
        ]
    });
    if (contentManifest.warnings.length) {
        throw new Error(`content manifest: ${contentManifest.warnings}`);
    }

    const all = [];
    all.push(...toplevelManifest.manifestEntries);
    all.push(...contentManifest.manifestEntries);

    return all;
}

/**
 * Performs main site compilation via Rollup: first on site code, and second
 * to build the Service Worker.
 * 
 * @return {!Array<string></string>} generated source filenames
 */
async function build() {
    const generated = [];

    const postcssConfig = {};
    if (isProd) {
      // nb. Only require() autoprefixer when used.
      const autoprefixer = require("autoprefixer");
      postcssConfig.plugins = [autoprefixer];

      // uses cssnano vs. our reqular CSS uses sass' builtin compression
      postcssConfig.minimize = true;
    }
  
    // Rollup bootstrap to generate graph of source needs. This eventually uses
    // dynamic import to bring in code required for each page (see router.js).
    // Does not hash "bootstrap.js" entrypoint, but hashes all generated chunks,
    // useful for cache busting.
    const appBundle = await rollup.rollup({
      input: "src/lib/bootstrap.js",
      plugins: [
        rollupPluginVirtual({
          yunhaind_config: `export default ${JSON.stringify(bootstrapConfig)};`,
        }),
        rollupPLuginPostCSS(postcssConfig),
        ...defaultPlugins,
      ],
    });
    const appGenerated = await appBundle.write({
      dynamicImportFunction: "window._import",
      sourcemap: true,
      dir: "docs",
      format: "esm",
    });
    for (const {fileName} of appGenerated.output) {
      generated.push(fileName);
    }
  
    const manifest = isProd ? await buildCacheManifest() : [];
    const noticeDev = isProd ? "" : "// Manifest not generated in dev";
    const swBundle = await rollup.rollup({
      input: "src/lib/sw.js",
      plugins: [
        rollupPluginVirtual({
          "cache-manifest": `export default ${JSON.stringify(
            manifest,
          )};${noticeDev}`,
        }),
        ...defaultPlugins,
      ],
      inlineDynamicImports: true, // SW does not support imports
    });
    const swGenerated = await swBundle.write({
      sourcemap: true,
      dir: "docs",
      format: "esm",
    });
    for (const {fileName} of swGenerated.output) {
      generated.push(fileName);
    }
  
    return generated;
  }
async function compressOutput(generated) {
    let inputSize = 0;
    let outputSize = 0;

    for (const fileName of generated) {
        const target = path.join("docs", fileName);

        const raw = await fs.readFile(target, "utf8");
        inputSize += raw.length;

        const result = terser.minify(raw, {
            sourceMap: {
                content: await fs.readFile(target + ".map", "utf8")
                , url: fileName + ".map"
            },
        });

        if (result.error) {
            throw new Error(`could not minify ${fileName}: ${result.error}`);
        }

        outputSize += result.code.length;
        await fs.writeFile(target, result.code, "utf8");
        await fs.writeFile(target + ".map", result.map, "utf8");
    }

    const ratio = outputSize / inputSize;
    log(`Terser JS output is ${(ratio * 100).toFixed(2)}% of source`);
}

(async function() {
    const generated = await build();
    log(`Generated ${generated.length} files`);
    if (!isProd) {
        // await buildTest();
    } else {
        await compressOutput(generated);
    }
})();

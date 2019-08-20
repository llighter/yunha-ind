const { DateTime } = require("luxon");
const fs = require("fs");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const slugify = require('slugify');

const componentsDir = 'src/site/_includes/components';
const Hero = require(`./${componentsDir}/Hero`);
const Aside = require(`./${componentsDir}/Aside`);
const PostCard = require(`./${componentsDir}/PostCard`);
const Breadcrumbs = require(`./${componentsDir}/Breadcrumbs`);
const Author = require(`./${componentsDir}/Author`);
const AuthorInfo = require(`./${componentsDir}/AuthorInfo`);

const filtersDir = 'src/site/_filters';
const prettyDate = require(`./${filtersDir}/pretty-date`);

module.exports = function(eleventyConfig) {

  //----------------------------------------------------------------------------
  // PLUGINS
  //----------------------------------------------------------------------------
  // Syntax highlighting for code snippets
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  // RSS feeds
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setDataDeepMerge(true);

  //----------------------------------------------------------------------------
  // MARKDOWN
  //----------------------------------------------------------------------------
  let markdownItOptions = {
    html: true,
  };
  let markdownItAnchorOptions = {
    level: 2,
    permalink: true,
    permalinkClass: 'w-headline-link',
    permalinkSymbol: '#',
    slugify: function(str) {
      return slugify(str, {
        replacement: '-',
        lower: true,
      });
    },
  };
  const markdownItAttrsOpts = {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', /^data\-.*$/],
  };
  eleventyConfig.setLibrary(
    'md',
    markdownIt(markdownItOptions)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItAttrs, markdownItAttrsOpts)
  );
  
  // eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  // eleventyConfig.addPassthroughCopy("img");
  // eleventyConfig.addPassthroughCopy("css");
  // webpack으로 배출한 결과 파일 경로 추가
  // eleventyConfig.addPassthroughCopy("dist");

  // Copy the src/images directort
  // eleventyConfig.addPassthroughCopy("src/images");

  /* Markdown Plugins */
  // let markdownIt = require("markdown-it");
  // let markdownItAnchor = require("markdown-it-anchor");
  // let options = {
  //   html: true,
  //   breaks: true,
  //   linkify: true
  // };
  // let opts = {
  //   permalink: true,
  //   permalinkClass: "direct-link",
  //   permalinkSymbol: "#"
  // };

  // eleventyConfig.setLibrary("md", markdownIt(options)
  //   .use(markdownItAnchor, opts)
  // );

  // eleventyConfig.setBrowserSyncConfig({
  //   callbacks: {
  //     ready: function(err, browserSync) {
  //       const content_404 = fs.readFileSync('_site/404.html');

  //       browserSync.addMiddleware("*", (req, res) => {
  //         // Provides the 404 content without redirect.
  //         res.write(content_404);
  //         res.end();
  //       });
  //     }
  //   }
  // });

  //----------------------------------------------------------------------------
  // FILTERS
  //----------------------------------------------------------------------------
  eleventyConfig.addFilter('prettyDate', prettyDate);
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  //----------------------------------------------------------------------------
  // SHORTCODES
  //----------------------------------------------------------------------------
  eleventyConfig.addShortcode('Hero', Hero);
  eleventyConfig.addShortcode('Author', Author);
  eleventyConfig.addShortcode('AuthorInfo', AuthorInfo);
  eleventyConfig.addPairedShortcode('Aside', Aside);
  eleventyConfig.addShortcode('PostCard', PostCard);
  eleventyConfig.addShortcode('Breadcrumbs', Breadcrumbs);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    // pathPrefix: "/",

    dir: {
      input: 'src/site/content',
      output: 'docs',
      data: '../_data',
      includes: '../_includes',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    // Because eleventy's passthroughFileCopy does not work with permalinks
    // we need to manually copy assets ourselves using gulp.
    // https://github.com/11ty/eleventy/issues/379
    passthroughFileCopy: true,
  };
};

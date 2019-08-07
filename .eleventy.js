const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


const componentsDir = 'src/site/_includes/components';
const PostCard = require(`./${componentsDir}/PostCard`);


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

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

  // eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  // webpack으로 배출한 결과 파일 경로 추가
  eleventyConfig.addPassthroughCopy("dist");

  // image 경로 추가?
  // eleventyConfig.addPassthroughCopy("posts/201906")

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

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
  // SHORTCODES
  //----------------------------------------------------------------------------
  config.addShortcode('PostCard', PostCard);

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
      output: 'dist',
      data: '../_data',
      includes: '../_includes',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    // Because eleventy's passthroughFileCopy does not work with permalinks
    // we need to manually copy assets ourselves using gulp.
    // https://github.com/11ty/eleventy/issues/379
    passthroughFileCopy: false,
  };
};

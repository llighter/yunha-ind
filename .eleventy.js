const { DateTime } = require("luxon");
const fs = require("fs");

const chalk = require('chalk');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const slugify = require('slugify');

const componentsDir = 'src/site/_includes/components';
const Hero = require(`./${componentsDir}/Hero`);
const Meta = require(`./${componentsDir}/Meta`);
const Aside = require(`./${componentsDir}/Aside`);
const YouTube = require(`./${componentsDir}/YouTube`);
const Tooltip = require(`./${componentsDir}/Tooltip`);
const PostCard = require(`./${componentsDir}/PostCard`);
const Breadcrumbs = require(`./${componentsDir}/Breadcrumbs`);
const Author = require(`./${componentsDir}/Author`);
const AuthorInfo = require(`./${componentsDir}/AuthorInfo`);
const ArticleNavigation = require(`./${componentsDir}/ArticleNavigation`);

const tagsDir = 'src/site/_includes/components/tags';
const {Image, Figure} = require(`./${tagsDir}/Image`);

const collectionsDir = 'src/site/_collections';
const recentTips = require(`./${collectionsDir}/recent-tips`);
const recentBlogPosts = require(`./${collectionsDir}/recent-posts`);
const blogPostsDescending = require(`./${collectionsDir}/blog-posts-descending`);

const filtersDir = 'src/site/_filters';
const md = require(`./${filtersDir}/md`);
const prettyDate = require(`./${filtersDir}/pretty-date`);
const githubLink = require(`./${filtersDir}/github-link`);
const stripLanguage = require(`./${filtersDir}/strip-language`);
const htmlDateString = require(`./${filtersDir}/html-date-string`);
const {memoize, findBySlug} = require(`./${filtersDir}/find-by-slug`);

module.exports = function(eleventyConfig) {
  console.log(chalk.black.bgGreen('Eleventy is building, please wait…'));

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
    // slugify: function(str) {
    //   return slugify(str, {
    //     replacement: '-',
    //     lower: true,
    //   });
    // },
    // TODO #26 1. Edit .eleventy.js to enable non latin characters.
    slugify: function (header) {
      return encodeURI(header.trim()
         .toLowerCase()
        .replace(/[\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~]/g, '') //remove symbol
        .replace(/\s+/g, '-')) // Replace spaces with hyphens
        .replace(/\-+$/, ''); // Replace trailing hyphen
    }
  };
  const markdownItAttrsOpts = {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', /^data\-.*$/],
  };

  const mdLib = markdownIt(markdownItOptions)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttrs, markdownItAttrsOpts)
    .disable('code');

  // custom renderer rules
  const fence = mdLib.renderer.rules.fence;

  const rules = {
    fence: (tokens, idx, options, env, slf) => {
      const fenced = fence(tokens, idx, options, env, slf);
      return `<web-copy-code>${fenced}</web-copy-code>`;
    },
    // TODO: 테이블 관련 작업할 떄 사용하겠지?
    // table_close: () => `</table>\n</div>`,
    // table_open: () => `<div class="w-table-wrapper">\n<table>`,
  }

  mdLib.renderer.rules = {...mdLib.renderer.rules, ...rules};

  eleventyConfig.setLibrary(
    'md',
    mdLib
  );

  //----------------------------------------------------------------------------
  // COLLECTIONS
  //----------------------------------------------------------------------------
  eleventyConfig.addCollection('recentTips', recentTips);
  eleventyConfig.addCollection('blogPosts', blogPostsDescending);
  eleventyConfig.addCollection('recentBlogPosts', recentBlogPosts);
  // Turn collection.all into a lookup table so we can use findBySlug
  // to quickly find collection items without looping
  eleventyConfig.addCollection('memoized', function(collection) {
    return memoize(collection.getAll());
  });
  
  // eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  // eleventyConfig.addPassthroughCopy("img");
  // eleventyConfig.addPassthroughCopy("css");

  // Copy the src/images directort
  // eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        
        const content_404 = fs.readFileSync('docs/404/index.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  //----------------------------------------------------------------------------
  // FILTERS
  //----------------------------------------------------------------------------
  eleventyConfig.addFilter('md', md);
  eleventyConfig.addFilter('prettyDate', prettyDate);
  eleventyConfig.addFilter('findBySlug', findBySlug);
  eleventyConfig.addFilter('stripLanguage', stripLanguage);
  eleventyConfig.addFilter("readableDate", htmlDateString); // TODO: 쓰는건지 안쓰는 건지 확인
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', htmlDateString);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });
  eleventyConfig.addFilter('githubLink', githubLink);

  //----------------------------------------------------------------------------
  // SHORTCODES
  //----------------------------------------------------------------------------
  eleventyConfig.addShortcode('Hero', Hero);
  eleventyConfig.addShortcode('Meta', Meta);
  eleventyConfig.addShortcode('YouTube', YouTube);
  eleventyConfig.addShortcode('Author', Author);
  eleventyConfig.addShortcode('Tooltip', Tooltip);
  eleventyConfig.addShortcode('AuthorInfo', AuthorInfo);
  eleventyConfig.addPairedShortcode('Aside', Aside);
  eleventyConfig.addShortcode('PostCard', PostCard);
  eleventyConfig.addShortcode('Breadcrumbs', Breadcrumbs);
  eleventyConfig.addShortcode('ArticleNavigation', ArticleNavigation);

  //----------------------------------------------------------------------------
  // CUSTOM TAGS
  //----------------------------------------------------------------------------
  eleventyConfig.addNunjucksTag('Image', Image);
  eleventyConfig.addNunjucksTag('Figure', Figure);

  // ----------------------------------------------------------------------------
  // ELEVENTY OPTIONS
  // ----------------------------------------------------------------------------
  // https://www.11ty.io/docs/config/#data-deep-merge
  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: [
      "md",
      "njk",
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
    passthroughFileCopy: false,
  };
};

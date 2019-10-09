
const liveTips = require('../_filters/live-tips');

// Return the three most recent blog posts.
module.exports = (collection) => {
  return collection
    .getFilteredByTag('tip')
    .filter(liveTips)
    .reverse()
    .slice(0, 3);
};

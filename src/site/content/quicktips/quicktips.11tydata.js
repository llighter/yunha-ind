module.exports = {
    // All blog posts will inherit this layout
    // which ensures they generate the right permalinks.
    layout: 'post.njk',
    // Create a path object so things like breadcrumbs can differentiate posts
    // coming from the blog versus other learning paths.
    path: {
        slug: 'quicktips',
        title: 'Tips',
        titleVariation: 'All quick tips',
        description: 'quick tips and some usefull sample code',
    },
};
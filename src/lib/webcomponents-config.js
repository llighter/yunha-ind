/**
 * @fileoverview Configures the WebComponents polyfill path.
 * 
 * This needs to occur in its own file that is included _before_ the loader itself, because ES6
 * modules are all hoisted in the order in which then are found.
 */

 // Set the production path for the Web Components polyfills. Must have leading and tailing slash.
 // This actually loos inside the root PLUS "bundles/<filename>".
 // This isn't configurable as we don't need the polyfill in dev.
 window.WebComponents = {root: "/lib/webcomponents/"};
/**
 * @fileoverview Site bootstrap code.
 *
 * This should import minimal site code, as it exists to load relevant polyfills and then the
 * correct entrypoint via our router.
 */

import config from "yunhaind_config";
import "./webcomponents-config"; // must go before -loader below
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import {swapContent} from "./loader";
import * as router from "./utils/router";
import {store} from "./store";

console.info("llighter.github.io", config.version);

WebComponents.waitFor(async () => {
  // TODO(samthor): This isn't quite the right class name because not all Web Components are ready
  // at this point due to code-splitting.
  document.body.classList.remove("unresolved");

  // Run as long-lived router w/ history & "<a>" bindings
  // Also immediately calls `swapContent()` handler for current location,
  // loading its required JS entrypoint
  router.listen(swapContent);

  // If the site becomes online again, and the special offline page was shown,
  // then trigger a reload
  window.addEventListener("online", () => {
    const {isOffline} = store.getState();
    if (isOffline) {
      router.reload();
    }
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

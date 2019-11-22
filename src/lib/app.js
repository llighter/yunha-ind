import "./components/Header";
import "./components/SideNav";
import {store} from "./store";
import "focus-visible";
import { checkIfUserAcceptsCookies } from "./actions";

// Configures global page state
function onGlobalStateChanged({isSignedIn, isPageLoading}) {
    const progress = document.querySelector(".w-loading-progress");
    progress.hidden = !isPageLoading;

    const main = document.querySelector("main");
    if (isPageLoading) {
        main.setAttribute("aria-busy", "true");
    } else {
        main.removeAttribute("aria-busy");
    }
}

store.subscribe(onGlobalStateChanged);
onGlobalStateChanged(store.getState());

// Give elemetns time to set up before kicking off state changes.
// This is useful for elements with CSS animations who need to have been
// rendered to the page at least once before they start transitioning.
// CUrrently this includes the Snackbar.
setTimeout(() => {
    checkIfUserAcceptsCookies();
}, 0);
import createStore from "unistore";
import devtools from "unistore/devtools";
import getMeta from "./utils/meta";
import config from "yunhaind_config";

const initialState = {
    // The first time the app boots we won't know whether the user is signed
    // in or out.
    // While we check, we should put things into an indeterminate state so we
    // don't render incorrect UI.
    checkingSignedInState: true,

    // The user has successfully signed in; default to cached value to help prevent FOUC
    isSignedIn: Boolean(window.localStorage["yunhaind_isSignedIn"]),
    user:null,

    currentUrl: window.location.pathname,
    isOffline: Boolean(getMeta("offline")),
    isSideNavExpanded: false,
    isSearchExpanded: false,
    
    // Whether to show the progressbar and mark the main content as busy, during a load.
    isPageLoading: false,

};

let store;
if (config.prod) {
    store = createStore(initialState);
} else {
    store = devtools(createStore(initialState));
}

export {store};
import {store} from "./store";

export const expandSideNav = store.action(() => {
    document.body.classList.add("web-side-nav--expanded");
    const main = document.querySelector("main");
    const header = document.querySelector("web-header");
    main.inert = true;
    header.inert = true;
    return {isSideNavExpanded: true};
  });
  
  export const collapseSideNav = store.action(() => {
    document.body.classList.remove("web-side-nav--expanded");
    const main = document.querySelector("main");
    const header = document.querySelector("web-header");
    main.inert = false;
    header.inert = false;
    return {isSideNavExpanded: false};
  });

export const checkIfUserAcceptsCookies = store.action(() => {
    if (localStorage.getItem("web-accepts-cookies")) {
        return {
            userAcceptsCookies: true,
        };
    }

    return {showingSnackbar: true, snackbarType: "cookies"};
});

export const setUserAcceptsCookies = store.action(() => {
    localStorage.setItem("web-accepts-cookies", 1);
    return {
        userAcceptsCookies: true,
        showingSnackbar: false,
        // Note we don't set the snackbarType to null because that would cause the
        // snackbar to re-render and break the animation.
        // Instead, snackbarType is allowed to stick around and future updates can
        // overwrite it.
    };
});
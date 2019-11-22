import {LitElement} from "lit-element";

export class BaseElement extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        // Diable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
    }
}
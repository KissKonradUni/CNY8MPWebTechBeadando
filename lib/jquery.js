/**
 * Author: Konrád Soma Kiss, CNY8MP
 * License: MIT
 * 
 * MockQuery, a JQuery looking library 
 * that uses regular JavaScript, made to
 * show people that JQuery, in fact, is
 * unnecessary in web development in 2024.
 * 
 * ps.: I'm not saying that JQuery is bad,
 * I'm just saying that it's unnecessary.
 * Also, the name of the library is a joke:
 * MockQuery, Mockery, Mock, you get it.
 */

const tagRegexp = /([<])(.*)([>])([<])(.*)([>])/;
// Example: "<div></div>" => ["<", "div", ">", "<", "/div", ">"]

class MockQuery {
    constructor(selector) {
        if (selector instanceof MockQuery) {
            this.element = selector.element;
            this.selector = selector.selector;
        } else if (selector instanceof HTMLElement) {
            this.element = selector;
            this.selector = selector.tagName;
        } else if (tagRegexp.test(selector)) {
            const element = document.createElement(tagRegexp.exec(selector)[2]);
            this.element = element;
            this.selector = selector;
        } else {
            this.selector = selector;
            this.element  = document.querySelector(selector);
        }
    }

    /**
     * Adds a click event listener to the element
     * @param {function} callback
     */
    click(callback) {
        this.element.addEventListener("click", callback);
    }

    /**
     * Prepends an element to the element
     * @param {HTMLElement | MockQuery} element
     */
    prepend(element) {
        if (element instanceof MockQuery) {
            this.element.prepend(element.element);
        } else {
            this.element.prepend(element);
        }
    }

    /**
     * Appends an element to the element
     * @param {HTMLElement | MockQuery} element
    */
    append(element) {
        if (element instanceof MockQuery) {
            this.element.append(element.element);
        } else {
            this.element.append(element);
        }
    }

    /**
     * Inserts an element before this element
     * @param {HTMLElement | MockQuery} element
     */
    before(element) {
        if (element instanceof MockQuery) {
            this.element.parentNode.insertBefore(element.element, this.element);
        } else {
            this.element.parentNode.insertBefore(element, this.element);
        }
    }

    /**
     * Inserts an element after this element
     * @param {HTMLElement | MockQuery} element
    */
    after(element) {
        if (element instanceof MockQuery) {
            this.element.parentNode.insertBefore(element.element, this.element.nextSibling);
        } else {
            this.element.parentNode.insertBefore(element, this.element.nextSibling);
        }
    }

    /**
     * Removes the element from the DOM
     */
    remove() {
        this.element.remove();
    }

    /**
     * If the value is not provided, returns the value of the css property,
     * otherwise sets the value of the css property
     * @param {string} property
     * @param {string | undefined} value
     * @returns {string | undefined} css property
     */
    css(property, value) {
        if (value === undefined) 
            return this.element.style[property];
        this.element.style[property] = value;
    }

    /**
     * If the value is not provided, returns the value of the attribute,
     * otherwise sets the value of the attribute
     * @param {string} property
     * @param {string | undefined} value
     * @returns {string | undefined} attribute
     */
    attr(property, value) {
        if (value === undefined) 
            return this.element.getAttribute(property);
        this.element.setAttribute(property, value);
    }

    /**
     * If the value is not provided, returns the innerHTML of the element,
     * otherwise sets the innerHTML of the element
     * @param {string | undefined} value
     * @returns {string | undefined} innerHTML
     */
    html(value) {
        if (value === undefined) 
            return this.element.innerHTML;
        this.element.innerHTML = value;
    }

    /**
     * If the value is not provided, returns the value of the element,
     * otherwise sets the value of the element
     * @param {string | undefined} value
     * @returns {string | undefined} value
     */
    val(value) {
        if (value === undefined) 
            return this.element.value;
        this.element.value = value;
    }

    /**
     * If the value is not provided, returns the text of the element,
     * otherwise sets the text of the element
     * @param {string | undefined} value
     * @returns {string | undefined} text
     */
    text(value) {
        if (value === undefined) 
            return this.element.innerText;
        this.element.innerText = value;
    }

    /**
     * Adds a class to the element
     * @param {string} className
     */
    addClass(className) {
        this.element.classList.add(className);
    }

    /**
     * Removes a class from the element
     * @param {string} className
     */
    removeClass(className) {
        this.element.classList.remove(className);
    }

    /**
     * Toggles a class on the element
     * @param {string} className
     */
    toggleClass(className) {
        this.element.classList.toggle(className);
    }

    /**
     * Hides the element
     */
    hide() {
        this.attr("hidden", true);
    }

    /**
     * Shows the element
     */
    show() {
        this.attr("hidden", false);
    }

    /**
     * Toggles the visibility of the element
     */
    toggle() {
        let hidden = this.attr("hidden");
        this.attr("hidden", hidden === "true" ? false : true);
    }
}

/**
 * Selects an element from the DOM
 * @param {string | HTMLElement} selector
 * @returns {MockQuery}
 */
function $(selector) {
    return new MockQuery(selector);
}
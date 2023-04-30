import StoreFunc from "./store-func"

/**
 * The special object that has two states: previous and next.
 * Functions binded to this object will be invoked into the store lifecycle.
 * Each subject must have it's name, each binded function should have their names too
 * easily remove them from store lifecycle.
 */
export default class Subject {
    #name = ''
    #prev = null
    #cur = null
    #funcs = []

    /**
     * Constructor
     * @param {String} name Subject name
     * @param {Object} value Subject current value
     */
    constructor(name, value) {
        this.#name = name
        this.#cur = value
    }

    /**
     * Gets Subject name
     * @returns {String} Subject name
     */
    get name() {
        return this.#name
    }

    /**
     * Sets Subject name
     * @param {String} value Subject name
     */
    set name(value) {
        this.#name = value
    }

    /**
     * Gets previous Subject state
     * @returns {Object} Previous Subject state
     */
    get prev() {
        return this.#prev
    }

    /**
     * Sets Subject previous state
     * @param {Object} value Subject previous state
     */
    set prev(value) {
        this.#prev = value
    }

    /**
     * Gets previous Subject state
     * @returns {Object} Previous Subject state
     */
    get cur() {
        return this.#cur
    }

    /**
     * Sets Subject current state
     * @param {Object} value Subject current state
     */
    set cur(value) {
        this.#cur = value
    }

    /**
     * Gets a list of binded store functions
     * @returns {StoreFunc[]} List of binded store functions
     */
    get funcs() {
        return this.#funcs
    }

    /**
     * Gets a list of binded store functions
     * @param {StoreFunc[]} value List of binded store functions
     */
    set funcs(value) {
        this.#funcs = value
    }
}

/**
 * The special object that has two states: previous and next.
 * Functions binded to this object will be invoked into the store lifecycle.
 * Each subject must have it's name, each binded function should have their names too
 * easily remove them from store lifecycle.
 */
export default class Subject {
    /**
     * Subject name
     */
    name = ''

    /**
     * Subject previous value
     */
    prev = null

    /**
     * Subject current value
     */
    cur = null

    /**
     * Subject binded functions
     */
    funcs = []

    /**
     * Constructor
     * @param {*} name Subject name
     * @param {*} value Subject current value
     */
    constructor(name, value) {
        this.name = name
        this.cur = value
    }
}

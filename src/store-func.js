import { v4 as uuidv4 } from 'uuid'
/**
 * A function wrapper to keep unique id and error states. This class helps determine which function should be removed from the subscription and then subject during the invoking of unsub store method
 */
export default class StoreFunc {
    #id = undefined
    #func = undefined
    #error = undefined
    #errorChecked = false

    /**
     * Constructor
     * @param {Function} func Callback function
     */
    constructor(func) {
        this.#id = uuidv4()
        this.#func = func
    }

    /**
     * Gets a function id
     * @returns {String} Function unique id
     */
    get id() {
        return this.#id
    }

    /**
     * Gets a function
     * @returns {Function} Function
     */
    get func() {
        return this.#func
    }

    /**
     * Gets an error
     * @returns {Error} Error
     */
    get error() {
        return this.#error
    }

    /**
     * Sets an error
     * @param {Error} value Error
     */
    set error(value) {
        this.#error = value
    }

    /**
     * Gets an error checked flag
     * @returns {Boolean} Error checked flag
     */
    get errorChecked() {
        return this.#errorChecked
    }

    /**
     * Sets an error checked flag
     * @param {Boolean} value Error checked flag
     */
    set errorChecked(value) {
        this.#errorChecked = value
    }
}
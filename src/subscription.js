import StoreFunc from "./store-func"

/**
 * Subscription class represents the object that contains a subject name and current tied function
 */
export default class Subscription {
    #name = ''
    #func = undefined

    /**
     * Constructor
     * @param {String} name Subject name
     * @param {StoreFunc} func Tied function
     */
    constructor(name, func) {
        this.#name = name
        this.#func = func
    }

    /**
     * Gets name of subscription
     * @returns {String} subscription (subject) name
     */
    get name() {
        return this.#name
    }

    /**
     * Gets tied function
     * @returns {StoreFunc} Tied function
     */
    get func() {
        return this.#func
    }
}
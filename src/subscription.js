/**
 * Subscription class represents the object that contains a subject name and current binded function
 */
export default class Subscription {
    #name = ''
    #func = undefined

    /**
     * Constructor
     * @param {String} name Subject name
     * @param {Function} func Binded function
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
     * Gets binded function
     * @returns {Function} Binded function
     */
    get func() {
        return this.#func
    }
}
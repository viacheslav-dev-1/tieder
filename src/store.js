import Subject from './subject'
import StoreFunc from './store-func'
import Subscription from './subscription'

/**
 * Store management class. It contains a lifecycle - a simple javascript interval
 * where functions are invoked by checking if subject state is changed
 */
export default class Store {
    static #instance = undefined
    #subjects = []

    /**
     * Gets Instance of Store class
     * @returns {Store} Store instance
     */
    static get $() {
        if (!this.#instance) {
            this.#instance = new Store()
            this.#init()
        }

        return this.#instance
    }

    /**
     * Changes the state of subject
     * @param {String} name name of subject
     * @param {Object} value value to set
     */
    mut(name, value) {
        if (this.#isBlank(name)) {
            console.error('Subject name should not be empty')
            return
        }

        const subject = this.#subjects.filter(s => s.name === name)[0]
        if (!subject) {
            this.#subjects.push(new Subject(name, value))
        } else {
            subject.cur = value
        }
    }

    /**
     * Subscribes to the store pipeline. This method adds a function to the subject. Function invokes when state of subject is changed.
     * @param {String} name name of subject
     * @param {Function} func function
     * @returns {Subscription} Created or modified subject
     */
    sub(name, func) {
        if (this.#isBlank(name)) {
            console.error('Subject name should not be empty')
            return
        }

        const subject = this.#subjects.filter(s => s.name === name)[0]
        const storeFunc = new StoreFunc(func)
        if (!subject) {
            const sub = new Subject(name, null)
            sub.funcs.push(storeFunc)
            this.#subjects.push(sub)
        } else {
            subject.funcs.push(storeFunc)
        }
        return new Subscription(name, storeFunc)
    }

    /**
     * Unsubscribes target subscription from the store pipeline
     * @param {Subscription} subscription Subscription object that contains subject name and binded function
     */
    unsub(subscription) {
        if (subscription === undefined || subscription === null || this.#isBlank(subscription?.name) || !subscription?.func) {
            console.error('Subscription cannot be null or undefined or have empty name or be without function')
            return
        }

        const target = this.#subjects.find(it => it.name === subscription.name)
        target.funcs = target.funcs.filter(it => it.id !== subscription.func.id)
    }

    /**
     * Destroys subject by its name - removes the subject with all binded function from the store pipeline
     * @param {String} name Subject name
     */
    destroy(name) {
        if (this.#isBlank(name)) {
            console.error('Subject name should not be empty')
            return
        }

        this.#subjects = this.#subjects.filter(s => s.name !== name)
    }

    /**
     * Gets a list of subjects
     */
    get subjects() {
        return this.#subjects
    }

    /**
     * Gets a subject by its name
     * @param {String} name Subject name
     * @returns {Subject} Subject object
     */
    get(name) {
        if (this.#isBlank(name)) {
            console.error('Subject name should not be empty')
            return
        }

        return this.#subjects.find(s => s.name === name)
    }

    static #init() {
        const subjects = this.#instance.subjects
        setInterval(() => {
            subjects.length > 0 && subjects.forEach(it => {
                if (!it) {
                    return
                }

                let different = false

                if (this.#checkIfNotPrimitive(it.prev) && !this.#checkIfNotPrimitive(it.cur)) {
                    different = true
                }
                else if (!this.#checkIfNotPrimitive(it.prev) && this.#checkIfNotPrimitive(it.cur)) {
                    different = true
                }
                else if (this.#checkIfNotPrimitive(it.prev) && this.#checkIfNotPrimitive(it.cur)) {
                    different = JSON.stringify(it.prev) !== JSON.stringify(it.cur)
                }
                else {
                    different = it.prev !== it.cur
                }

                if (different && it.funcs && it.funcs.length > 0) {
                    it.funcs.forEach(func => {
                        if (func && func.id && func.func) {
                            try {
                                func.func(it.prev, it.cur)
                                if (func.error) {
                                    func.error = undefined
                                    func.errorChecked = false
                                }
                            } catch (e) {
                                if (!func.errorChecked) {
                                    func.error = e
                                    func.errorChecked = true
                                    console.error(`Error occured in subject "${it.name}":`, e)
                                }
                            }
                        }
                    })
                    it.prev = it.cur
                }
            })
        })
    }

    static #checkIfNotPrimitive(value) {
        return typeof value === 'object' ||
            typeof value === 'function' ||
            Array.isArray(value)
    }

    #isBlank(str) {
        return (!str || /^\s*$/.test(str))
    }
}

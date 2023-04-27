import Subject from './subject'

/**
 * Store management class. It contains a lifecycle - a simple javascript interval
 * where functions are invoked by checking if subject state is changed
 */
export default class Store {
    static #instance = undefined
    #subjects = []

    /**
     * Get Instance of Store class
     */
    static get instance() {
        if (!this.#instance) {
            this.#instance = new Store()
            this.#init()
        }

        return this.#instance
    }

    /**
     * Change the state of subject
     * @param {*} name name of subject
     * @param {*} value value to set
     */
    mut(name, value) {
        const subject = this.#subjects.filter(s => s.name === name)[0]
        if (!subject) {
            this.#subjects.push(new Subject(name, value))
        } else {
            subject.cur = value
        }
    }

    /**
     * Subscribe to the store by the subject with binded function that invokes only when Subject state is changed
     * @param {*} name name of subject
     * @param {*} func function
     */
    sub(name, func) {
        const subject = this.#subjects.filter(s => s.name === name)[0]
        if (!subject) {
            const sub = new Subject(name, null)
            sub.funcs.push(func)
            this.#subjects.push(sub)
        } else {
            subject.funcs.push(func)
        }
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
                    it.funcs.forEach(func => func && func(it.prev, it.cur))
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
}

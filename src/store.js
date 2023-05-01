import Subject from './subject'
import StoreFunc from './store-func'
import Subscription from './subscription'

/**
 * Store management class. It contains a lifecycle - a simple javascript interval
 * where functions are invoked by checking if subject state is changed
 */
export default class Store {
    static #instance = undefined
    #interval = undefined
    #subjects = []
    #changedSubjects = []

    /**
     * Gets Instance of Store class
     * @returns {Store} Store instance
     */
    static get $() {
        if (!this.#instance) {
            this.#instance = new Store()
            this.#init()
        } else {
            this.#instance.interval || this.#init()
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

        const subject = this.#subjects.find(s => s.name === name)
        if (!subject) {
            const newSubject = new Subject(name, value)
            this.#subjects.push(newSubject)
            this.#changedSubjects.push(newSubject)
        } else {
            subject.cur = value
            this.#isChanged(subject.prev, value) && this.#changedSubjects.push(subject)
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

        const subject = this.#subjects.find(s => s.name === name)
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

        this.#removeFromArray(this.#subjects.find(it => it.name === subscription.name)?.funcs, f => f.id === subscription.func.id)
        this.#removeFromArray(this.#changedSubjects.find(it => it.name === subscription.name)?.funcs, f => f.id === subscription.func.id)
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

        this.#removeFromArray(this.#subjects, s => s.name === name)
        this.#removeFromArray(this.#changedSubjects, s => s.name === name)
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

    /**
     * Stops the store pipeline - clears and stops the interval. If any Simple Store method is called - the interval starts again
     * @param {Boolean} clearSubjects Flag that determine remove subjects from pipeline or not
     */
    stop(clearSubjects) {
        this.interval && clearInterval(this.interval)
        clearSubjects && (this.#subjects = [])
        clearSubjects && (this.#changedSubjects = [])
        this.#interval = undefined
    }

    static #init() {
        const subjects = this.#instance.changedSubjects
        this.#instance.interval = setInterval(() => {
            subjects.length > 0 && subjects.forEach(it => {
                if (!it) return
                if (it.funcs && it.funcs.length > 0) {
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

                this.#instance.changedSubjects.pop()
            })
        })
    }

    /* SINGLETONE MEMBERS */

    get changedSubjects() {
        return this.#changedSubjects
    }

    get interval() {
        return this.#interval
    }

    set interval(value) {
        this.#interval = value
    }

    /* PRIVATE MEMBERS */

    #removeFromArray(array, predicate) {
        if (array && array.length > 0) {
            const index = this.array.findIndex(predicate)
            index > -1 && array.splice(index, 1)
        }
    }

    #isChanged(prev, cur) {
        let different = false

        if (this.#checkIfNotPrimitive(prev) && !this.#checkIfNotPrimitive(cur)) {
            different = true
        }
        else if (!this.#checkIfNotPrimitive(prev) && this.#checkIfNotPrimitive(cur)) {
            different = true
        }
        else if (this.#checkIfNotPrimitive(prev) && this.#checkIfNotPrimitive(cur)) {
            different = JSON.stringify(prev) !== JSON.stringify(cur)
        }
        else {
            different = prev !== cur
        }

        return different
    }

    #checkIfNotPrimitive(value) {
        return typeof value === 'object' ||
            typeof value === 'function' ||
            Array.isArray(value)
    }

    #isBlank(str) {
        return (!str || /^\s*$/.test(str))
    }
}

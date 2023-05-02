import Store from "./store";
import Subject from "./subject";
import Subscription from "./subscription";

/**
* Changes the state of subject
* @param {String} name name of subject
* @param {Object} value value to set
*/
export function mut(name, value) {
    Store.$.mut(name, value)
}

/**
* Subscribes to the store pipeline. This method adds a function to the subject. Function invokes when state of subject is changed.
* @param {String} name name of subject
* @param {Function} func function
* @returns {Subscription} Created or modified subject
*/
export function sub(name, func) {
    return Store.$.sub(name, func)
}

/**
* Unsubscribes target subscription from the store pipeline
* @param {Subscription} subscription Subscription object that contains subject name and a callback function
*/
export function unsub(subscription) {
    Store.$.unsub(subscription)
}

/**
* Destroys subject by its name - removes the subject with all callback functions from the store pipeline
* @param {String} name Subject name
*/
export function destroy(name) {
    Store.$.destroy(name)
}

/**
* Gets a subject by its name
* @param {String} name Subject name
* @returns {Subject} Subject object
*/
export function subject(name) {
    return Store.$.get(name)
}

/**
* Stops the store pipeline - clears and stops the interval
* @param {Boolean} clearSubjects Flag that determine remove subjects from pipeline or not
*/
export function stop(clearSubjects) {
    Store.$.stop(clearSubjects)
}

export { Subject, Subscription }
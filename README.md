# Tieder
A simple store manager library that is useful for managing a global state (store) of your application.

<h3>Installation</h3>
To install the library type in your terminal the following:

```
npm i tieder
```
<h3>Description</h3>
This library covers a global state functionality. If object state is changed somewhere in your application, these changes are tracked by subscription in another place.<br/>
Methods you can use to effectively manage the object state are listed below.

<hr>

<h4>1. Sub</h4>
<h5>Import</h5>

```javascript
import { sub } from 'tieder'
```
<h5>Description</h5>
Ads a callback function that invokes when the state of the subject is changed

<h5>Example</h5>
Let our subject represents the user name that changes by clicking the submit button and depends on the appropriate input field.  So we want to track our changes and render user name somewhere in our app. To show the username somewhere on the screen let's subscribe our function to this subject:

```javascript
const header = document.querySelector('header .hello-container');
this.subscription = sub('username', (previous, current) => {
  header.innerHTML = `Hello, ${current}!`;
});
```
As you can see here we save our subscription to the variable. This will be used in the future. Subscription - a simple object that contains subject name and a function we just used to subscribe.

<hr>

<h4>2. Mut</h4>
<h5>Import</h5>

```javascript
import { mut } from 'tieder'
```
<h5>Description</h5>
Changes (mutates) the state of the object. Here object - a wrapper called Subject that contains previous and current states with the function that invokes when previous state does not equal to current one

<h5>Example</h5>
To fire a username rendering event we should perform some changes to our subject state. For example, let's do this by clicking on submit button as listed below:

```javascript
const usernameField = document.getElementById('usernameField');
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  mut('username', usernameField.value);
});
```

<b>Note!</b> To handle subscription events properly you should set your subscritions first and then mutate the correspondend states. Basically it means that you should call <i>sub()</i> before <i>mut()</i>. Otherwise it will not work and it will act like a functionless subject.

<hr>

<h4>3. Unsub</h4>
<h5>Import</h5>

```javascript
import { unsub } from 'tieder'
```
<h5>Description</h5>
Unsubscribes target subscription from the store pipeline. Removes a function saved in the Subscription from Subject.

<h5>Example</h5>
Let's imagine that all logic above was in a modal dialog and this component will be destroyed when click on close button.
So we need to unsubscribe our function from the subject state to avoid the possible buffer overflow:

```javascript
const closeBtn = document.getElementById('closeBtnId')
closeBtn.addEventListener('click', () => {
  unsub(this.subscription);
});
```
As you can see, here we use our saved subscription object. This is needed for store engine to know what function must be removed from the subject.

<hr>

<h4>4. Destroy</h4>
<h5>Import</h5>

```javascript
import { destroy } from 'tieder'
```
<h5>Description</h5>
Destroys subject by its name - removes the subject with all functions from the store pipeline

<h5>Example</h5>
It sometimes happens when we should remove the whole subject. It could be possible if the whole subject (mut and sub methods related to one Subject are in one place) is located in one destroyable element (for example modal dialog) and only there. It would be better to remove all tied callback functions and the subject at the same time, so we don't need to unsubscribe each function one by one.

```javascript
const closeBtn = document.getElementById('closeBtnId')
closeBtn.addEventListener('click', () => {
  destroy('username');
});
```
<hr>

<h4>5. Subject</h4>
<h5>Import</h5>

```javascript
import { subject } from 'tieder'
```
<h5>Description</h5>
Gets a subject by its name

<h5>Example</h5>
It often happens when we want to get the current value of the subject for some purposes. Moreover if we don't use sub/unsub functionality - just for saving the data that must be accessible through whole app - we need a simple way to know the subject data. So we can use subject method to retrieve this information:

```javascript
const username = subject('username')?.cur
if (username) { ... }
```
<hr>

<h4>6. Stop</h4>
<h5>Import</h5>

```javascript
import { stop } from 'tieder'
```

<h5>Description</h5>
Stops and clears the pipeline interval. After this none of created Subjects will be tracked.

Store manager does not need special initialization, because it's a singletone and it's initialized automatically.<br>
Store also works with complicated objects such as arrays, classes, functions etc.

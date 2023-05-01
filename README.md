# A Simple Store
This is a Simple Store manager that is suitable for javascript front-end applications.

<h3>Installation</h3>
To install the library - type in your terminal the following:

```
npm i a-simple-store
```
<h3>Description</h3>
This library covers a general store functionality. It means that in one place object state is changed, in another - this changing is tracked by subscription.
There are 5 main methods you can use to effectively manage the object state:

<h4>1. Mut</h4>
<b>Import</b>
<hr>

```javascript
import { mut } from 'a-simple-store'
```
<b>Description</b><hr>
Changes (mutates) the state of the object. Here object - it's a wrapper called Subject and contains previous, current states and the binded function.

<b>Example</b><hr>
Let's take a look at a common example - clicking on submit button to show the user name on the page. In the following code snippet we mutate our state with new data:

```javascript
const usernameField = document.getElementById('usernameField');
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  mut('username', usernameField.value);
});
```
<h4>2. Sub</h4>
<b>Import</b>
<hr>

```javascript
import { sub } from 'a-simple-store'
```
<b>Description</b><hr>
Subscribes the object to the store pipeline. This method adds a function to the subject. Function invokes when state of subject is changed.

<b>Example</b><hr>
In the first example we changed the state by clicking on the submit button. Now we want to track our changes and render user name. So to show the username somewhere on the screen let's subscribe:

```javascript
const header = document.querySelector('header .hello-container');
this.subscription = sub('username', (previous, current) => {
  header.innerHTML = `Hello, ${current}!`;
});
```
As you can see we save our subscription to the variable. This is will be used in the future. Subscription - is a simple object that contains subject name and a function, that we just used to subscribe.


<h4>3. Unsub</h4>
<b>Import</b>
<hr>

```javascript
import { unsub } from 'a-simple-store'
```
<b>Description</b><hr>
Unsubscribes target subscription from the store pipeline. Removes a function saved in the Subscription object.

<b>Example</b><hr>
Let's imagine that all logic above was in a modal dialog and this component will be destroyed when click on close button.
So we need to unsubscribe our function from the subject state.

```javascript
const closeBtn = document.getElementById('closeBtnId')
closeBtn.addEventListener('click', () => {
  unsub(this.subscription);
});
```
As you can see, here we used out saved subscription object. This is needed for store engine to know what function must be removed from the subject.


<h4>4. Destroy</h4>
<b>Import</b>
<hr>

```javascript
import { destroy } from 'a-simple-store'
```
<b>Description</b><hr>
Destroys subject by its name - removes the subject with all binded function from the store pipeline

<b>Example</b><hr>
It sometimes happens when we should remove the whole subject. It could be possible if the whole subject is located in one destroyable element (for example modal window) and only there. It would be better to remove all binded functions and the subject at the same time, so we don't need to unsubscribe each function one by one.

```javascript
const closeBtn = document.getElementById('closeBtnId')
closeBtn.addEventListener('click', () => {
  destroy('username');
});
```

<h4>5. Subject</h4>
<b>Import</b>
<hr>

```javascript
import { subject } from 'a-simple-store'
```
<b>Description</b><hr>
Gets a subject by its name

<b>Example</b><hr>
It often happens when we want to get the current value of the subject for some purposes. Moreover if we don't use sub/unsub functionality - just for saving the data that must be accessible through whole app - we need a simple way to know the subject data. So we can use subject method to retrieve this information:

```javascript
const username = subject('username')?.cur
if (username) { ... }
```
<hr>

Store manager does not need special initialization, because it's a singletone and it's initialized automatically.<br>
Store also works with complicated objects such as arrays, classes, functions etc.

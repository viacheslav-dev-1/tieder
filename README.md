# simple-store
This is a Simple Store manager that is suitable for all front-end applications, but firstly - for javascript vanilla apps.

<h3>How to use</h3>

1. Let's take a look at a common example - clicking of button that leads to text appearing on some page. In the following code snippet we mutate our state with new data:
```javascript
const usernameField = document.getElementById('usernameField');
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  Store.$.mut('username', usernameField.value);
});
```

2. And show the username somewhere on the screen by subscribing on its state:
```javascript
const header = document.querySelector('header .hello-container');
this.subscription = Store.$.sub('username', (previous, current) => {
  header.innerHTML = `Hello, ${current}!`;
});
```

3. Let's imagine that all logic above was in a modal dialog and this component will be destroyed when click on close button.
So we need to remove our subscription from the store timer.
```javascript
const closeBtn = document.getElementById('closeBtnId')
closeBtn.addEventListener('click', () => {
  Store.$.unsub(this.subscription);
  /* Other logic */
});
```

As you can see, in callback function we can access previous state too.
This store manager does not need special initialization, because it's a singletone and it's initialized automatically by calling <b>instance</b> property.
Store also can work with complicated objects, such as arrays, classes, functions etc.

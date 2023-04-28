# simple-store
This is a Simple Store manager that is suitable for all front-end applications, but firstly - for javascript vanilla apps.

<h3>How to use</h3>

1. Let's take a look at a common example - clicking on button that leads to text appearing on some page. In the following code snippet we mutate our state with new data:
```javascript
const usernameField = document.getElementById('usernameField');
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  Store.instance.mut('username', usernameField.value);
});
```

2. And show the username somewhere on the screen by subscribing on its state:
```javascript
const header = document.querySelector('header .hello-container');
Store.instance.sub('username', (previous, current) => {
  header.innerHTML = `Hello, ${current}!`;
});
```

As you can see, in callback function we can access previous state too.
This store manager does not need special initialization, because it's a singletone and it's initialized automatically by calling <b>instance</b> property.
Store also can work with complicated objects, such as arrays, classes, functions etc.

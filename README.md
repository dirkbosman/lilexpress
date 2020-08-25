# lilexpress (NodeJS with Express)

## Initial Set-up:

### Libraries
- npm (node package manager)
- npm install express
- npm install ejs
- npm install body-parser
- npm install multer
- npm i nodemon --save-dev
- npm init -y

### Directories
- Create a folder `exercises_express` then go to this folder in your terminal and execute:

## Exercise 1 ([Help](http://expressjs.com/guide/routing.html))

Install express into your directory with the `npm install express` command.
In order to open a server on port 3000 (`node app.js`), create an `app.js` file and add this content:

```js
const express = require("express");

const app = express();
app.listen(3000, () => console.log("Server running on port 3000"));
```

You can now open http://localhost:3000 in the browser.
If you see an error (`Cannot GET /`), that is expected behaviour as we haven't defined any `get` route yet. Still, it means your server is up and running.

## Exercise 2 ([Help](https://expressjs.com/en/guide/routing.html))

In this exercise, you are going to create an index route with the `get` method.
In `app.js`, create the get index route and have it output the string 'How are you?'.

```js
const express = require("express");
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("How are you?");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Exercise 3 ([Help](http://expressjs.com/fr/4x/api.html#res.sendFile))

In this exercise, you are going to create the homepage for your app and serve it on the `home` route. Create a new directory `public` and inside it, create a html file called `homepage.html` and write this content in it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello</title>
  </head>
  <body>
    <h1>How are you?</h1>
  </body>
</html>
```

In `app.js`, get express to send this file when hitting the route `home` (at http://localhost:3000/home)

## Exercise 4 ([Help](http://expressjs.com/fr/4x/api.html#res.json))

In this exercise you'll get your server to send back some JSON when a _PUT_ request is performed.
The JSON will look like this:

```js
{"good" : "yep"}
```

In `app.js`, get express to send this json when hitting the route `home` with the method _PUT_.
Try out your request with curl (or postman):

- Input: `$ curl -X PUT http://localhost:3000/home`
- Output:

```
{"good":"yep"}
```

or

- Input: `$ curl http://localhost:3000/home`
- Output:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello</title>
  </head>
  <body>
    <h1>How are you?</h1>
  </body>
</html>
```

## Exercise 5 ([Help](https://ejs.co/) && [Help](http://expressjs.com/guide/using-template-engines.html) && [Help](https://scotch.io/tutorials/use-ejs-to-template-your-node-application))

To start with (ejs) templating, create a directory `views` under the root directory of your project. Add a file with this template in:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <% if (title) { %>
    <h1><%= title %></h1>
    <% } %>
  </body>
</html>
```

Render this EJS code if the user accesses the URL `/test-ejs` and render this page with `Hey` as value of `title` variable. Remember that in `app.js`, you need to define the directory of your views and the name of the template engine you are using this way:

```
// Necessary to render ejs-template(s). Keep these lines before the routes for better organisation.
app.set("views", "./views");
app.set("view engine", "ejs");

// First template page
app.get("/test-ejs", function (req, res) {
  res.render("pages/test-ejs", { title: "Hey" });
});
```

## Exercise 6 ([Help](https://ejs.co/))

We pass an array to our new page `/test-ejs2`:

`{users : ['Bob', 'John', 'Jane' ]}`

Create an EJS page that uses the `forEach` method to list each element.

## Exercise 7 ([Help](https://ejs.co/))

Create a template with two **input:text** fields to enter the first and last name and show it on the `/test-ejs3` route.

## Exercise 8 ([Help](https://github.com/expressjs/body-parser))

Submit the first and last name with the previous form to `/test-ejs3` _POST_ route.

Display in the console (terminal) the result of the _POST_ as a json with fields `name` and `surname`.

## Exercise 9 ([Help](http://expressjs.com/en/api.html#req.params))

Create a route of the type `/number/1` in file `/test-ejs4`, where the number will be a variable `:id` and will be displayed on the page. E.g. on the route `/number/1337` we will see:

```
The number is 1337
```

### Appendix ([Help](https://www.npmjs.com/package/nodemon))

Instead of the normal `node` server start, you can add below to your `package.json` instead to be able to just run `npm start`:

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
```

If you are tired of always restarting the server while developing (not production), hot-reloading via [nodemon](https://www.npmjs.com/package/nodemon) can come to the rescue.

- Install it like this `npm i nodemon --save-dev` (it will add a new entry under `devDependencies` in your `package.json`). 
- Change the `npm start` script in the `package.json` to be `nodemon app.js`.
- Now restart the server; your server will automatically reload on file change. To see the newest changes, you'll still have to reload the browser.
- Nodemon is only for development use, that's why it's wise to add another entry to your package.json scripts: `"start-prod": "node app.js"`. This is the command you are going to run when you app is deployed on a remote host.

Your `scripts` entry in `package.json` should now look like this:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "nodemon app.js",
  "start-prod": "node app.js"
}
```

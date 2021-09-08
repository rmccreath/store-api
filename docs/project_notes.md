# Project Notes

## Create Basic API

1. Create project directory, supporting documentation, and version control.
2. Associate project with npm (node's package manager) - run `npm init`:
   - This will start a wizard, complete the items which will generate the `package.json` file (this can be edited after creation).
3. Add dependencies using `npm install --save <package>` (`--save` adds the package to the `package.json` file):
   - [`express`](https://www.npmjs.com/package/express) - fast, minimalist web framework for Node.
4. Create a server file, `server.js`:
   - "Import" HTTP: `const http = require('http');`
   - Add port: `const port = process.env.PORT || 3000;` - when working on production, it's likely the `PORT` variable can be injected, in this case a fallback is provided, 3000.
   - Setup server: `const server = http.createServer(<listener>);` - a listener is required which is a function
   - Start the server: `server.listen(port)`
5. Create an app file, `app.js`:
   - "Import" express: `const express = require('express');`
   - Start app: `const app = express();`
   - Add middleware (any incoming request goes through `use`)

```
app.use((req, res, next) => {  // request, response, next (another function as part of the middleware)
  res.status(200).json({
    message: 'It works!'
    });
  });
```

    - Add exports: `module.exports = app;`

6. Import app to server and pass as listener to the server: `const app = require('./app');`, `const server = http.createServer(app);`
7. That's the first chunk of the functioning code written. Test it by running: `node server.js` (`node` starts something with the node library). This should continue running now without error.
   - Go to http://localhost:3000/ - you should see `{"message":"It works!"}`
   - Use Insomnia (or another API tool, e.g. Postman) to test other HTTP methods (all should be the same return just now)

## Adding Routes

1. Taking the basic API created before, a little tidying up of the project directory is a good idea:
   - Create a directory for all API related content, `api`
   - Within `api`, create a directory for the API routes, `routes`
   - Add a file for the different routes, starting with `products.js` here
2. Inside the file for the route, it'll start similar to the `app.js` file. "Import" express: `const express = require('express');`
3. Add router to handle various routes and endpoints: `const router = express.Router();`
4. Use the router to register different routes in the router file:

```
// HTTP GET
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
    });
  });
```

```
// HTTP POST
router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /products'
    });
  });
```

```
// HTTP GET - specific product with parameter passing
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;

  if (id == 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
      });
  } else {
    res.status(200).json({
        message: 'You passed an ID'
      });
  }
});
```

```
// HTTP PATCH
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product!'
    });
});
```

```
// HTTP DELETE
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
    });
});
```

5. Export: `module.exports = router;`
6. Link `app.js` to router:
   - "Import": `const productRoutes = require('./api/routes/products');`
   - Create the middleware: `app.use('/products', productRoutes);` - this uses `/products` so the router definition shouldn't. This allows us to split them on a feature basis.
7. In this case, routes have been added for products but there are more routes for orders created in a similar fashion. Remember to create the file in routes and add the import and link within `app.js`

## Improve Server Utilisation in Development

1. Add [`nodemon`](https://github.com/remy/nodemon) as a development dependency: `npm install --save-dev nodemon` - this is a wrapper for `node` and will automatically monitor the files in the project and when something is changed, restart the server:
   - This isn't a global package so will need to add a `start` script to `package.json`: inside `scripts: {}`, add `"start": "nodemon server.js"`. This will then find the local package to utilise functions from `nodemon`.
   - Run `npm start` - this will trigger the script above and make use of `nodemon`.
2. Add [`morgan`](https://www.npmjs.com/package/morgan) for logging:
   - Install as a dependency: `npm install --save morgan`
   - "Import" to `app.js`: `const morgan = require('morgan');`
   - Add `morgan` to beginning of request stack (while not returning anything, it will output a log and then hit `next`): `app.use(morgan('dev'));`

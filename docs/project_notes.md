# Project Notes

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

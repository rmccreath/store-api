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

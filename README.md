# Assignment 8 – Node.js & Express Server

Small information server built with Node.js and Express 5.

## Install and Run

```bash
npm install
npm start        # production
npm run dev      # development with watch
```

Runs at `http://localhost:3000` (or `process.env.PORT`).

## Project Structure

```
assignment8/
 ├─ public/ (index.html, styles.css, app.js)
 ├─ server.js
 ├─ package.json & package-lock.json
 ├─ .gitignore
 └─ README.md
```

## curl Evidence

### 1. GET /api/courses (200 OK)
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 158

[{"id":1,"title":"Web Programming","credits":6},{"id":2,"title":"Algorithms and Data Structures","credits":5},{"id":3,"title":"Database Systems","credits":4}]
```

### 2. POST /api/subscribe (201 Created)
```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 19

{"subscribed":true}
```

### 3. GET /api/admin (403 Forbidden)
```
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8
Content-Length: 21

{"error":"Forbidden"}
```

### 4. GET /old-page (302 Found)
```
HTTP/1.1 302 Found
Location: /hello
Content-Type: text/plain; charset=utf-8
Content-Length: 28

Found. Redirecting to /hello
```

### 5. GET /api/nonexistent (404 Not Found)
```
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 21

{"error":"Not found"}
```

### 6. GET /about (404 HTML)
```
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8
Content-Length: 76

<h1>404 – Page Not Found</h1><p>The page you requested does not exist.</p>
```

## Reasoning Questions

1. **Route order:** Placing the 404 fallback at the top caught all requests immediately. Express checks routes sequentially, so the catch-all answered before any real endpoint could be reached.
2. **Middleware next():** Removing `next()` from the logger caused requests to hang indefinitely. The browser timed out waiting because Express never passed control to the route handler.
3. **Status codes:** `201` specifically indicates resource creation, while `200` is generic. Returning `200` with an error message misleads clients and caches; `404` accurately signals a missing resource.
4. **Configuration:** Cloud platforms set `process.env.PORT` dynamically. Hardcoding `3000` causes binding errors in deployment, while fallback `?? 3000` keeps local testing simple.
5. **Dependencies:** `node_modules` is bulky and platform-specific. Teammates only need `package-lock.json` and `npm install` to install the exact same packages.
6. **Same origin:** Opening HTML directly from disk (`file://`) triggers the Same-Origin Policy when calling `http://localhost:3000`. Serving the page through the same server avoids cross-origin restrictions.

## Self-Study Notes

- **Process info:** Used `process.version` for Node runtime and `Math.floor(process.uptime())` for whole-second uptime.
- **Content-Type:** Used `res.type('text/plain')` on `/robots.txt` so clients parse it as raw text rather than HTML.
- **Formatted JSON:** Used `JSON.stringify(data, null, 2)` inside `<pre>` tags to cleanly format JSON in the UI.

## Challenges

Ensuring path independence using `join(__dirname, 'public')` required looking up ES module path utilities (`fileURLToPath`). Ordering the 404 handler after all real routes was also critical to prevent shadowing valid endpoints.
# Debugger Setup for MERN Testing & Debugging Project

This document outlines the debugging and testing infrastructure set up for the MERN stack testing and debugging assignment.

## ✅ What's Been Set Up

### 1. **Root Package Configuration**
- `package.json` (root) — Contains all test scripts and dependencies
- `.babelrc` — Babel configuration for transpiling JSX and modern JavaScript
- Total dependencies: 602 packages (Jest, React Testing Library, Supertest, MongoDB Memory Server, etc.)

### 2. **Jest Configuration**
- `jest.config.js` — Multi-project setup for **server** and **client** tests
  - Server tests: Node environment, integration tests
  - Client tests: jsdom environment, unit tests with React Testing Library
  - Timeout: 30 seconds (for MongoDB Memory Server initialization)
  - Coverage threshold: 70% for statements, lines, and functions

### 3. **Test Scaffolding**
- **Server setup file**: `server/tests/setup.js`
- **Client setup files**:
  - `client/src/tests/setup.js` (window.matchMedia mock)
  - `client/src/tests/__mocks__/fileMock.js` (static file mock)

### 4. **VS Code Debug Configuration**
- `.vscode/launch.json` — Two debug configurations:
  - "Debug Jest Tests (npm run test:debug)" — Launch Jest with Node inspector
  - "Attach to Node (9229)" — Attach to a running Node process
- `.vscode/tasks.json` — Tasks for `npm install` and `npm run test:unit`

### 5. **Placeholder Source Code** (Scaffolded)
These are minimal implementations to get tests running. You'll expand them as per the assignment:
- `client/src/components/Button.jsx` — Button component with variants, sizes, and state management ✅ **Tests: 8/8 passing**
- `server/src/app.js` — Express application setup
- `server/src/models/Post.js` — Post model (Mongoose)
- `server/src/models/User.js` — User model (Mongoose)
- `server/src/utils/auth.js` — JWT token generation and verification utilities

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Unit Tests Only
```bash
npm run test:unit
```

### Run Integration Tests Only
```bash
npm run test:integration
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Debug Jest Tests
1. Open VS Code's **Run and Debug** panel (Ctrl+Shift+D)
2. Select **"Debug Jest Tests (npm run test:debug)"**
3. Click the play button to start debugging
4. Set breakpoints in your test files or source code
5. The debugger will pause at breakpoints and allow you to inspect variables

---

## 📊 Test Status

### ✅ Client Tests (Passing)
**File**: `client/src/tests/unit/Button.test.jsx`
- ✅ renders with default props
- ✅ renders with different variants
- ✅ renders with different sizes
- ✅ renders in disabled state
- ✅ calls onClick handler when clicked
- ✅ does not call onClick when disabled
- ✅ passes additional props to the button element
- ✅ accepts and applies custom className

**Coverage**: 100% (Button.jsx)

### ⏳ Server Tests (Waiting for Implementation)
**File**: `server/tests/integration/posts.test.js`

The integration tests are set up but need the following to pass:
1. **Posts API Routes** — Create routes for:
   - `POST /api/posts` — Create a new post (with authentication)
   - `GET /api/posts` — Get all posts (with filtering and pagination)
   - `GET /api/posts/:id` — Get a post by ID
   - `PUT /api/posts/:id` — Update a post (author only)
   - `DELETE /api/posts/:id` — Delete a post (author only)

2. **Authentication Middleware** — Verify JWT tokens before accessing protected routes

3. **Validation** — Validate post data (title, content) and return 400 if invalid

4. **Error Handling** — Return appropriate error codes (401, 403, 404)

---

## 🛠️ Next Steps for the Assignment

### Task 1: Unit Tests (Mostly Complete)
- ✅ Button component tests (8/8 passing)
- 📝 Add tests for utility functions (auth, validation, etc.)
- 📝 Add tests for any Redux reducers or custom hooks

### Task 2: Integration Tests (In Progress)
- ⏳ Implement Posts API routes and handlers
- ⏳ Implement authentication middleware
- ⏳ Implement post validation
- ⏳ Test error handling and edge cases

### Task 3: End-to-End Tests
- 📝 Set up Cypress or Playwright
- 📝 Test critical user flows (registration, login, CRUD)
- 📝 Test navigation and routing

### Task 4: Code Coverage
- Current coverage: ~82% (mostly from components and models)
- Target: 70% across all projects
- Focus on adding tests for routes, controllers, and middleware

### Task 5: Debugging Techniques
- 📝 Implement error boundaries in React
- 📝 Add logging strategies for server-side debugging
- 📝 Create a global error handler for Express
- 📝 Document debugging workflows

---

## 🐛 Debugging Tips

### Debug a Specific Test File
```bash
npm test -- client/src/tests/unit/Button.test.jsx --no-coverage
```

### Run Tests with Console Output
```bash
npm test -- --verbose
```

### Run Tests and Generate Coverage Report
```bash
npm test
# Coverage report will be in ./coverage directory
```

### View Coverage Report in Browser
```bash
open coverage/client/index.html  # macOS
# or
xdg-open coverage/client/index.html  # Linux
```

### Inspect Variables During Debugging
When paused at a breakpoint in VS Code:
- Hover over variables to see their current values
- Use the Debug Console (bottom panel) to evaluate expressions
- Watch variables by right-clicking them and selecting "Add to Watch"

### Debug Server Code Directly
If you create a server startup file (e.g., `server/index.js`), add this to `.vscode/launch.json`:
```json
{
  "name": "Debug Server (Node)",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/server/index.js",
  "restart": true,
  "console": "integratedTerminal"
}
```

---

## 📁 Repository Structure

```
.
├── .babelrc                          # Babel configuration
├── .vscode/
│   ├── launch.json                   # Debug configurations
│   └── tasks.json                    # VS Code tasks
├── jest.config.js                    # Jest configuration
├── package.json                      # Dependencies and scripts
├── README.md                         # Project overview
├── README_DEBUGGER.md                # This file
├── Week6-Assignment.md               # Assignment details
├── client/
│   └── src/
│       ├── components/
│       │   └── Button.jsx            # ✅ Button component (tests passing)
│       └── tests/
│           ├── setup.js              # Jest setup for client
│           ├── __mocks__/
│           │   └── fileMock.js       # Mock for static files
│           └── unit/
│               └── Button.test.jsx   # ✅ Button tests (8/8 passing)
└── server/
    ├── src/
    │   ├── app.js                    # Express app setup
    │   ├── models/
    │   │   ├── Post.js               # Post model
    │   │   └── User.js               # User model
    │   └── utils/
    │       └── auth.js               # Auth utilities
    └── tests/
        ├── setup.js                  # Jest setup for server
        └── integration/
            └── posts.test.js         # Posts API integration tests
```

---

## 🆘 Troubleshooting

### Tests timing out?
- MongoDB Memory Server takes time to download (~82MB on first run)
- Timeout is set to 30 seconds; if still failing, run: `npm test -- --testTimeout=60000`

### Cannot find module errors?
- Run `npm install` to ensure all dependencies are installed
- Check that file paths in imports match the actual file locations

### Debugger not pausing at breakpoints?
- Ensure you're using "Debug Jest Tests" configuration, not just running `npm test`
- Check that breakpoints are set in source files (not minified code)
- Use `--runInBand` flag to prevent Jest from spawning worker threads (already done in `test:debug`)

### Coverage not meeting threshold?
- Add tests for untested functions and components
- Run `npm test -- --coverage` to see detailed coverage report
- Focus on increasing coverage for critical business logic

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Mongoose Testing](https://mongoosejs.com/docs/testing.html)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [MongoDB Memory Server](https://github.com/typegoose/mongodb-memory-server)

---

**Last updated**: November 16, 2025
**Status**: ✅ Debugger & testing scaffold complete. Ready for development!


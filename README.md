# Testing and Debugging MERN Applications

This repository contains starter code and a fully scaffolded testing and debugging setup for a MERN application. It includes unit and integration tests, a VS Code debug configuration, and in-memory database support for fast, isolated server tests.

## Quick project status

- Client unit tests: passing (see `client/src/tests/unit/Button.test.jsx`)
- Server integration tests: passing (in-memory MongoDB via mongodb-memory-server)
- Coverage: overall ~85% (see `coverage/` after running tests)

For a full, machine-readable test report and debugging guide see `TEST_RESULTS.md` and `README_DEBUGGER.md`.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run all tests

```bash
npm test
```

3. Run only client unit tests

```bash
npm run test:unit
```

4. Run only server integration tests

```bash
npm test -- server
```

5. Run tests in watch mode (development)

```bash
npm run test:watch
```

## Debugging in VS Code

- Open the Run & Debug view (Ctrl+Shift+D).
- Use the "Debug Jest Tests (npm run test:debug)" launch configuration to run Jest under the Node inspector. This uses `--runInBand` so breakpoints will be hit.
- To attach to a running Node server, use the "Attach to Node (9229)" configuration.

## Where to look next

- `README_DEBUGGER.md` — Detailed debugging setup and examples
- `TEST_RESULTS.md` — Test run summary and coverage results
- `server/src/` — Server code (Express routes, models, utils)
- `client/src/` — Client React components and unit tests

## Notes and tips

- Integration tests use an in-memory MongoDB server; the first run may download a MongoDB binary and take ~30–60s.
- If tests time out when the in-memory DB initializes, rerun with an increased timeout: `npm test -- --testTimeout=60000`.
- When debugging tests, prefer the VS Code launch configuration to ensure the debugger attaches correctly.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest](https://github.com/visionmedia/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)

---

If you want anything added to this README (badges, contributor instructions, CI steps, or a shorter student-facing checklist), tell me which and I'll add it.
// server/tests/setup.js - Jest setup file for server tests
// This file runs before any server-side tests are executed

// Suppress console output during tests (optional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
// };

// Set a longer timeout for integration tests that may involve database operations
jest.setTimeout(10000);

// You can add global test fixtures here (e.g., mock database, environment setup)

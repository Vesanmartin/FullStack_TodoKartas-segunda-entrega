// Polyfill para Node 18+
import { TextEncoder, TextDecoder } from "util";
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// Reexportamos desde react-router para Jest
export * from "react-router";
export { MemoryRouter, Link } from "react-router";
export default {};

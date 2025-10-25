// habilita jest-dom
import '@testing-library/jest-dom';

// ✅ Corrige error "TextEncoder is not defined" en Jest + react-router
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

# Tests for Chromium Formatters

## Installation

```bash
npm install --include=dev
```

## Usage

```bash
npm test
```

## Chromium Source Files

All files had their `import` paths and the test format function modified to reference `dist/main.js`, and filetypes adjusted between JS and TS as needed.

- [CSSFormatter.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/CSSFormatter.test.ts)
- [FormattedContentBuilder.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormattedContentBuilder.test.ts)
- [HTMLFormatter.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/HTMLFormatter.test.ts)
- [JavaScriptFormatter.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/JavaScriptFormatter.test.ts)
- [JSONFormatter.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/JSONFormatter.test.ts)
- [ScopeParser.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/ScopeParser.test.ts)
- [Substitute.js](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/Substitute.test.ts)
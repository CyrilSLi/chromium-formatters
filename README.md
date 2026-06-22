# chromium-formatters

The same formatters used by Chrom(ium) DevTools' "Pretty Print" feature, extracted into a standalone module for use outside of it. The supported languages are CSS, HTML, JavaScript, and JSON.

[npm](https://www.npmjs.com/package/chromium-formatters)&nbsp;&nbsp;&nbsp;[jsDelivr](https://www.jsdelivr.com/package/npm/chromium-formatters)

## Installation

This library has no external dependencies and has both ESM and UMD builds.

## Usage

### ESM (e.g. Node.js with "type": "module" or browser with `<script type="module">`):

```js
import chromiumFormatter from 'dist/main.esm.js';

// Use the MIME type corresponding with the language of the input string (e.g. for JavaScript):
const { content } = chromiumFormatter('text/javascript', input);

// Use a different indent amount (default is 4 spaces):
const { content } = chromiumFormatter('text/javascript', input, '  ');
```

### UMD (e.g. AMD, CJS, or browser `<script>` tag without `type="module"`):

```html
<script src="dist/main.js"></script>
<script>
    const { content } = chromiumFormatter("text/javascript", input);
</script>
```

```js
// CommonJS
const chromiumFormatter = require('../dist/main.js');
const { content } = chromiumFormatter("text/javascript", input);
```

## Build

```bash
npm run build
```

## Tests

See [tests/README.md](./tests/README.md).

## Chromium Source Files

All files had their `import` paths modified to reference this project's flat `src` directory, and filetypes adjusted between JS and TS as needed.

- acorn.mjs: Acorn version 8.10.0, as per [README.chromium](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/third_party/acorn/README.chromium).
- [AcornTokenizer.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/AcornTokenizer.ts)
- [ArrayUtilities.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/ArrayUtilities.ts)
- [CSSFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/CSSFormatter.ts)
- [ESTreeWalker.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/ESTreeWalker.ts)
- [FormattedContentBuilder.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormattedContentBuilder.ts)
- [FormatterActions.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormatterActions.ts)
- [FormatterWorker.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormatterWorker.ts)
  - The debug function `disableLoggingForTest` and its required import [root.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/root/root.ts) were removed.
  - codemirror.trimmed.mjs: Codemirror version 5.61.0, as per [README.chromium](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/third_party/codemirror/README.chromium).
  - codemirror.trimmed.mjs was created from concatenating `lib/codemirror.js`, `mode/css/css.js`, and `mode/xml/xml.js`, only keeping the parts of the code used by the formatters.
- [HTMLFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/HTMLFormatter.ts)
- [IdentityFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/IdentityFormatter.ts)
- [JavaScriptFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/JavaScriptFormatter.ts)
- [JSONFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/JSONFormatter.ts)
- [platform.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/platform.ts): A thinned-down version only importing and re-exporting `ArrayUtilities` and `StringUtilities`.
- [ScopeParser.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/ScopeParser.ts)
- [StringUtilities.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/StringUtilities.ts)
  - The type file [Brand.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/Brand.ts) was removed.
- [Substitute.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/Substitute.ts)
- [text_utils.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/models/text_utils/text_utils.ts): A thinned-down version only importing and re-exporting `TextCursor`.
- [TextCursor.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/models/text_utils/TextCursor.ts)
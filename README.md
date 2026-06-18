# chromium-format-javascript

The same formatters used by Chrom(ium) DevTools' "Pretty Print" feature, extracted into a standalone module for use outside of it. The supported languages are CSS, HTML, JavaScript, and JSON.

## Installation

This library has no external dependencies and has both ESM and UMD builds.

## Usage

### ESM (e.g. Node.js with "type": "module" or browser with `<script type="module">`):

```js
// Only import the formatter functions you need, the supported languages are CSS, HTML, JavaScript, and JSON.
import { chromiumFormatCSS, chromiumFormatHTML, chromiumFormatJavaScript, chromiumFormatJSON } from 'dist/main.esm.js';

// Use the formatter function corresponding with the language of the input string (e.g. for JavaScript):
const output = chromiumFormatters.chromiumFormatJavaScript(input);

// Use a different indent amount (default is 4 spaces):
const output = chromiumFormatters.chromiumFormatJavaScript(input, indentString="  ");
```

```js
// Or use a wildcard import to access all formatter functions:
import * as chromiumFormatters from 'dist/main.esm.js';

const output = chromiumFormatters.chromiumFormatJavaScript(input);
```

### UMD (e.g. AMD, CJS, or browser `<script>` tag without `type="module"`):

```html
<script src="dist/main.cjs"></script>
<script>
    // The four formatter functions are available as global objects:
    const output = chromiumFormatJavaScript(input);
</script>
```

```js
// CommonJS
const { chromiumFormatCSS, chromiumFormatHTML, chromiumFormatJavaScript, chromiumFormatJSON } = require('../dist/main.cjs');
const output = chromiumFormatJavaScript(input);
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
- [ESTreeWalker.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/ESTreeWalker.ts)
- [FormatterActions.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormatterActions.ts)
- [FormattedContentBuilder.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormattedContentBuilder.ts)
- [FormatterWorker.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/FormatterWorker.ts)
  - The debug function `disableLoggingForTest` and its required import [root.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/root/root.ts) were removed.
  - codemirror.trimmed.mjs: Codemirror version 5.61.0, as per [README.chromium](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/third_party/codemirror/README.chromium).
  - codemirror.trimmed.mjs was created from concatenating `lib/codemirror.js`, `mode/css/css.js`, and `mode/xml/xml.js`, only keeping the parts of the code used by the formatters.
- [JavaScriptFormatter.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/entrypoints/formatter_worker/JavaScriptFormatter.ts)
- [platform.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/platform.ts): A thinned-down version only importing and re-exporting `ArrayUtilities` and `StringUtilities`.
- [StringUtilities.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/StringUtilities.ts)
  - The type file [Brand.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/core/platform/Brand.ts) was removed.
- [text_utils.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/models/text_utils/text_utils.ts): A thinned-down version only importing and re-exporting `TextCursor`.
- [TextCursor.ts](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/models/text_utils/TextCursor.ts)
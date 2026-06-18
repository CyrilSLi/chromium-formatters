import { CSSFormatter } from './CSSFormatter.ts';
import { HTMLFormatter } from './HTMLFormatter.ts';
import { JavaScriptFormatter } from './JavaScriptFormatter.ts';
import { JSONFormatter } from './JSONFormatter.ts';
import { FormattedContentBuilder } from './FormattedContentBuilder.ts';

function chromiumFormatFactory(formatterClass) {
    return (source, indentString='    ') => {
        const builder = new FormattedContentBuilder(indentString);
        const formatter = new formatterClass(builder);
        formatter.format(source, []);
        return builder.content();
    };
}

export const chromiumFormatCSS = chromiumFormatFactory(CSSFormatter);
export const chromiumFormatHTML = chromiumFormatFactory(HTMLFormatter);
export const chromiumFormatJavaScript = chromiumFormatFactory(JavaScriptFormatter);
export const chromiumFormatJSON = chromiumFormatFactory(JSONFormatter);
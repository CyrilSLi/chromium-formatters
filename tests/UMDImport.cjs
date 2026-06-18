const { assert } = require('chai');
const { chromiumFormatCSS, chromiumFormatHTML, chromiumFormatJavaScript, chromiumFormatJSON } = require('../dist/main.cjs');

describe('UMD Import', () => {
    it('Imports CSS formatter', () => {
        assert.strictEqual(typeof chromiumFormatCSS, 'function');
    });
    it('Imports HTML formatter', () => {
        assert.strictEqual(typeof chromiumFormatHTML, 'function');
    });
    it('Imports JavaScript formatter', () => {
        assert.strictEqual(typeof chromiumFormatJavaScript, 'function');
    });
    it('Imports JSON formatter', () => {
        assert.strictEqual(typeof chromiumFormatJSON, 'function');
    });
});
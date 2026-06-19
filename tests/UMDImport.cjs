const { assert } = require('chai');
const chromiumFormatter = require('../dist/main.cjs');

describe('UMD Import', () => {
    it('Imports formatter', () => {
        assert.strictEqual(typeof chromiumFormatter, 'function');
    });
});
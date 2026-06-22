const { assert } = require('chai');
const fs = require('fs');
const requireJS = require('requirejs');

requireJS.config({ baseUrl: 'dist' });
fs.writeFileSync("dist/main.cjs", fs.readFileSync("dist/main.js", "utf-8"), "utf-8"); // Node requires a .cjs extension for CommonJS modules

describe('UMD Import', () => {
    it('CJS import successful', () => {
        const chromiumFormatter = require('../dist/main.cjs');
        assert.strictEqual(typeof chromiumFormatter, 'function');
    });

    it('AMD import successful', () => {
        requireJS(['main'], (chromiumFormatter) => {
            assert.strictEqual(typeof chromiumFormatter, 'function');
        });
    });
});

after(() => {
    if (fs.existsSync("dist/main.cjs")) {
        fs.rmSync("dist/main.cjs"); // Remove the temporary .cjs file after tests are done
    }
});
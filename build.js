import fs from "fs";
import { minify } from "terser";

function logFileSize(filePath) {
    console.log(`> ${filePath}: ${(fs.statSync(filePath).size / 1024).toFixed(2)} KB\n`);
}



console.log("Building ESM module...");
await Bun.build({
    entrypoints: ["src/main.esm.js"],
    outdir: "dist",
    naming: "main.esm.js",
    format: "esm",
    target: "browser"
});
logFileSize("dist/main.esm.js");



console.log("Minifying ESM module...");
const esmCode = fs.readFileSync("dist/main.esm.js", "utf-8");
fs.writeFileSync("dist/main.esm.min.js", (await minify(esmCode, {
    compress: true,
    mangle: true,
})).code, "utf-8");
logFileSize("dist/main.esm.min.js");



console.log("Building UMD module...");
await Bun.build({
    entrypoints: ["src/main.esm.js"],
    outdir: "dist",
    naming: "main.cjs",
    format: "iife",
    target: "browser"
});

console.log("Injecting UMD shim...");
let umdCode = fs.readFileSync("dist/main.cjs", "utf-8");
const umdShim = fs.readFileSync("src/umd-shim.js", "utf-8");
umdCode = umdCode.replace("})();", umdShim);
fs.writeFileSync("dist/main.cjs", umdCode, "utf-8");
logFileSize("dist/main.cjs");



console.log("Minifying UMD module...");
fs.writeFileSync("dist/main.min.cjs", (await minify(umdCode, {
    compress: true,
    mangle: true,
})).code, "utf-8");
logFileSize("dist/main.min.cjs");



console.log("Build complete!");
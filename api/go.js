const { readFileSync, writeFileSync, createWriteStream, unlink } = require('fs');
const { get } = require('https');
// const { get } = require('https');
const { exec, execSync } = require("child_process");

const definitions = "https://taiwnaa.dev.spacehub.mn/swagger/v1/swagger.json";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
// const host = "localhost:44302";

const versionTracker = readFileSync("./versionTracker", 'utf8');

const _version = versionTracker.split(".");
_version[2] = parseInt(_version[2]) + 1;

const version = _version.join(".");

function updateVersion() {

    try {
        writeFileSync("./versionTracker", version);
        console.log("[Gen] New npm version is: " + version);
    } catch (error) {
        console.error("[Gen] Versioning failed due to:\n" + error + "\n");
    }

}

function clean() {
    // try {
    //     console.log("[Gen] Cleaning old code (lib,doc,test)");
    //     fs.rmSync("./lib", { force: true, recursive: true });
    //     fs.rmSync("./doc", { force: true, recursive: true });
    //     fs.rmSync("./test", { force: true, recursive: true });
    //     console.log("[Gen] Successfully removed old code");
    // } catch (error) {
    //     console.log("[Gen] Cleaning old code failed due to:\n" + error);
    // }
}

async function downloadJson() {

    const dest = "swagger.json";



    console.log("[Gen] Downloading data from " + definitions);

    const jsonFile = createWriteStream(dest);
    await new Promise((resolve, reject) => {
        get(definitions, (res) => {
            res.pipe(jsonFile);
            jsonFile.on('finish', () => {
                jsonFile.close(resolve);
            });
        }).on('error', (err) => {
            console.error(err);

            jsonFile.on('error', () => {
                unlink(dest); reject();
            });
        });
    });
}


const extraOpts = {
    npmName: "cuko_api_swagger",
    npmRepository: "https://github.com/sadespresso/cuko_api_swagger",
    npmVersion: version,
    supportsES6: "true",
    nullSafeAdditionalProps: "true",
    useSingleRequestParameter: "true",
};

function execute() {
    const _xtra = Object.keys(extraOpts).map(key => `--additional-properties=${key}=${extraOpts[key]}`).join(" ");

    try {
        console.log("[Gen] OpenAPI generation started");
        execSync(`openapi-generator-cli generate -i swagger.json ${_xtra} -g typescript-axios --enable-post-process-file`);
        console.log("[Gen] OpenAPI generation successfully finished");


    } catch (error) {
        console.error("[Gen] OpenAPI generation failed due to:\n" + error);
    }
    try {
        console.log("[Gen] Installing dependencies with pnpm");
        execSync("pnpm i --ignore-scripts");
        console.log("[Gen] Dependencies resolved with PNPM");
    } catch (error) {
        console.log("[Gen] Installing dependencies failed due to:\n" + error);
    }
    try {
        console.log("[Gen] Transpiling to JS");
        execSync("pnpm add -D tsup");
        execSync("pnpm tsup index.ts --format esm,cjs,iife --dts");
        execSync("npm pkg set main=\"./dist/index.js\" module=\"./dist/index.mjs\"");
        execSync("npm pkg delete scripts");
        console.log("[Gen] Successfully transpiled to JS");
    } catch (error) {
        console.log("[Gen] Transpiling to JS failed due to:\n" + error);
    }
    writeFileSync("./.gitignore", "node_modules\ndist\napi.ts\nbase.ts\ncommon.ts\nconfiguration.ts\n");

}

async function go() {
    updateVersion();
    clean();
    await downloadJson();
    execute();
}

go();
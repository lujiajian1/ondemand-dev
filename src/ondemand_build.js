const { run: jscodeshift } = require('jscodeshift/src/Runner');
const path = require('path');
const colors = require('colors');

const options = {
    dry: true,
    print: false,
    verbose: 1,
    cpus: 1,
};
const transformPath = path.resolve(__dirname, './transformer.js');
const filepaths = [path.resolve(__dirname, './App.tsx')];

const runParse = async() => {
    if (filepaths.length === 0) {
        return;
    }
    try {
        const res = await jscodeshift(transformPath, filepaths, options);
        console.log(colors.bgRed('transform success！', res));
    } catch (err) {
        console.log(colors.bgYellow(err), '---err');
    }
};

runParse();
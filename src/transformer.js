const fs = require('fs');
const path = require('path');


const outputFilePath = path.resolve(__dirname, './ondemandApp.tsx');

module.exports = function transformer(file, api, options) {
    const j = api.jscodeshift;
    const ast = j(file.source);
    ast.find(j.ImportDeclaration).forEach(path => {
        let needChange = false;
        let name = '';
        j(path).find(j.Identifier).forEach(path1 => {
            if (path1.value.name === 'AComp' || path1.value.name === 'BComp') {
                needChange = true;
                name = path1.value.name;
            }
        });
        if (needChange) {
            j(path).replaceWith();
            j(path).insertBefore(`const ${name} = () => null;`);
        }
    });

    fs.writeFileSync(outputFilePath, ast.toSource(), 'utf-8');
    return ast.toSource();
};
module.exports.parser = 'tsx';
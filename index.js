const fs = require('fs');
let xml = null;

function getJSCode(content) {
    return (
        `import React from 'react';
         import ${process.argv[4] || 'SvgIcon'} from '../${process.argv[4] || 'SvgIcon'}';
            const ${process.argv[3]} = props => (
                <${process.argv[4] || 'SvgIcon'} {...props}>
                    ${content}
                </${process.argv[4] || 'SvgIcon'}>
            );

            export default ${process.argv[3]};
        `);
}

function getStyle(content) {
    return (
        `import React from 'react';
         import ${process.argv[4] || 'SvgIcon'} from '../${process.argv[4] || 'SvgIcon'}';
            const ${process.argv[3]} = props => (
                <${process.argv[4] || 'SvgIcon'} {...props}>
                    ${content}
                </${process.argv[4] || 'SvgIcon'}>
            );

            export default ${process.argv[3]};
        `);
}

function getJSCode(content) {
    return (
        `import React from 'react';
         import ${process.argv[4] || 'SvgIcon'} from '../${process.argv[4] || 'SvgIcon'}';
            const ${process.argv[3]} = props => (
                <${process.argv[4] || 'SvgIcon'} {...props}>
                    ${content}
                </${process.argv[4] || 'SvgIcon'}>
            );

            export default ${process.argv[3]};
        `);
}

function svgToReact() {
    process.chdir(process.argv[2]);
    fs.readdir(process.cwd(), function (err, files) {
        files.some(function (file) {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                xml = data.toString('utf8');
                if (xml.indexOf('style') > -1) {
                    console.log(xml.replace(/\r?\n|\r|\s/g,'').match(/^.*<style type="text\/css>">(.*)(\/>|<\/style>).*<path(.*)(\/>|<\/path>).*$/)[1]);
                    console.log(xml.replace(/\r?\n|\r|\s/g,'').match(/^.*<style(.*)(\/>|<\/style>).*<path(.*)(\/>|<\/path>).*$/)[3]);
                } else {
                    console.log(false)
                }
                
            });
            return true;
        })
    });
}

module.exports = svgToReact;

svgToReact();
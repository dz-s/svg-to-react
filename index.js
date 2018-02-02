const fs = require('fs');
const path = require('path');
let xml = null;

function getPath(content) {
    return (
        `<path ${content} />;`.replace("class", "className"));
}

function getStyle(content) {
    return (
        `<style type="text/css">{"${content}"}</style>`
    );
}

function getJSCode(xml, fname) {
    return (
        `import React from 'react';
         import ${process.argv[4] || 'SvgIcon'} from '../${process.argv[4] || 'SvgIcon'}';
            const ${fname} = props => (
                <${process.argv[4] || 'SvgIcon'} {...props}>
                    ${getStyle(xml[1])}
                    ${getPath(xml[3])}
                </${process.argv[4] || 'SvgIcon'}>
            );

            export default ${fname};
        `);
}

function svgToReact() {
    process.chdir(process.argv[2]);
    fs.readdir(process.cwd(), function (err, files) {
        files.forEach(function (file) {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                xml = data.toString('utf8');
                if (xml.indexOf('<style') > -1) {
                    xml = xml.replace(/\r?\n|\r|\s/g, '').match(/^.*<styletype="text\/css">(.*)(\/>|<\/style>).*<path(.*)(\/>|<\/path>).*$/);
                    fs.writeFile(file + '.js', getJSCode(xml, path.basename(file, '.svg').replace('-','_')), function(err) {
                        if(err) {
                            return console.log(err);
                        }                    
                    }); 
                } else {
                    console.log(false)
                }

            });
        })
    });
}

module.exports = svgToReact;

svgToReact();
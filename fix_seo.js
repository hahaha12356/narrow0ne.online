const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== '.git' && f !== '.trae') {
                walkDir(dirPath, callback);
            }
        } else {
            callback(path.join(dir, f));
        }
    });
}

const rootDir = "D:\\games\\narrow0ne.online";
const targetDomainOld = "narrowone.store";
const targetDomainNew = "narrow0ne.online";

let count = 0;

walkDir(rootDir, (filepath) => {
    if (!filepath.endsWith('.html') && !filepath.endsWith('.json')) return;

    try {
        let content = fs.readFileSync(filepath, 'utf8');
        let newContent = content;
        
        // Replace domain
        if (newContent.includes(targetDomainOld)) {
            newContent = newContent.split(targetDomainOld).join(targetDomainNew);
        }
        
        // Replace links
        if (newContent.includes('href="index.html"')) {
            newContent = newContent.split('href="index.html"').join('href="/"');
        }
        if (newContent.includes('href="/index.html"')) {
            newContent = newContent.split('href="/index.html"').join('href="/"');
        }

        if (content !== newContent) {
            console.log(`Modifying ${filepath}`);
            fs.writeFileSync(filepath, newContent, 'utf8');
            count++;
        }
    } catch (e) {
        console.error(`Error processing ${filepath}: ${e}`);
    }
});

console.log(`Total files modified: ${count}`);

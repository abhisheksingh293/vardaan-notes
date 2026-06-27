const fs = require('fs');
const path = require('path');

const responsiveCSS = `
    /* Injected Responsive Styles */
    @media (max-width: 1024px) {
        .container { max-width: 95% !important; padding: 15px !important; }
        .institute-name { font-size: 20pt !important; }
    }
    @media (max-width: 768px) {
        .container { max-width: 100% !important; padding: 10px !important; margin: 0 !important; }
        .institute-name { font-size: 16pt !important; }
        .tagline { font-size: 11pt !important; }
        .worksheet-title { font-size: 13pt !important; }
        .meta-info { 
            flex-direction: column !important; 
            gap: 8px !important; 
            font-size: 10pt !important; 
            padding: 10px !important; 
            align-items: flex-start !important;
        }
        .chapter-header { font-size: 11pt !important; }
        .question-item { flex-direction: column !important; align-items: flex-start !important; }
        .q-num { margin-bottom: 4px !important; }
        .watermark { width: 90% !important; }
    }
`;

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('.git') && !fullPath.includes('.gemini') && !fullPath.includes('node_modules')) {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('institute-name') && !content.includes('/* Injected Responsive Styles */')) {
                content = content.replace('</head>', `    <style>${responsiveCSS}</style>\n</head>`);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Injected CSS into ' + fullPath);
            }
        }
    }
}

processDir(__dirname);
console.log('Done!');

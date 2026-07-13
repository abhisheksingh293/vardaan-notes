const fs = require('fs');

function injectHeroImage(filePath, imagePath, altText) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the first paragraph after <h1>
    const pRegex = /(<h1>.*<\/h1>\s*<p>)([^<])/;
    const replacement = `$1\n            <img src="${imagePath}" alt="${altText}" class="image-float-right ai-image" style="width: 35%; max-width: 250px; margin-top: 5px;">\n            $2`;
    
    if (pRegex.test(content)) {
        content = content.replace(pRegex, replacement);
        
        // Ensure clearfix follows the paragraph if not already there
        const pCloseRegex = /(<img src="${imagePath}"[\s\S]*?<\/p>)/;
        if (pCloseRegex.test(content) && !content.includes('<div class="clearfix"></div>', content.indexOf(imagePath))) {
             content = content.replace(pCloseRegex, `$1\n        <div class="clearfix"></div>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`Failed to update ${filePath}: <h1>...<p> pattern not found.`);
    }
}

injectHeroImage('C7_Algebraic Identities/ChapterNotes.html', '../images/C7_AlgebraicIdentities.png', 'Algebraic Identities Conceptual Diagram');
injectHeroImage('C8_Polynomials/ChapterNotes.html', '../images/C8_Polynomials.png', 'Polynomials Abstract Math Curve');

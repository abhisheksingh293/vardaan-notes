const fs = require('fs');

const chapters = [
    'C5_Profit Loss and Discount', 
    'C6_Compound Interest', 
    'C7_Algebraic Identities', 
    'C8_Polynomials'
];

const styleRegex = /style="width:\s*\d+%;\s*max-width:\s*\d+px;/g;

chapters.forEach(ch => {
    const filePath = `${ch}/ChapterNotes.html`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modifications = 0;
        
        content = content.replace(styleRegex, (match) => {
            modifications++;
            return 'style="width: 42%; max-width: 320px;';
        });

        if (modifications > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Increased dimensions for ${modifications} images in ${ch}.`);
        }
    }
});

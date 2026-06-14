const fs = require('fs');
const chapters = ['C5_Profit Loss and Discount', 'C6_Compound Interest', 'C7_Algebraic Identities', 'C8_Polynomials'];

chapters.forEach(ch => {
    const path = `${ch}/ChapterNotes.html`;
    if(fs.existsSync(path)) {
        const text = fs.readFileSync(path, 'utf8');
        const lines = text.split('\n');
        lines.forEach((line, i) => {
            if(line.includes('<svg class="concept-diagram"')) {
                console.log(`\n================================`);
                console.log(`Found SVG in ${ch} at line ${i+1}:`);
                console.log(lines.slice(Math.max(0, i-2), i+15).join('\n'));
            }
        });
    }
});

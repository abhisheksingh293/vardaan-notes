const fs = require('fs');
const chapters = [
    'C9_Linear Equations in One Variable',
    'C10_Parallel Lines',
    'C11_Understanding Quadrilaterals'
];

chapters.forEach(ch => {
    const path = `${ch}/ChapterNotes.html`;
    if(fs.existsSync(path)) {
        const text = fs.readFileSync(path, 'utf8');
        const lines = text.split('\n');
        
        console.log(`\n======== ${ch} ========`);
        
        // Check for Hero Images
        let hasHero = false;
        lines.slice(0, 500).forEach(line => {
            if(line.includes('<img src') && line.includes('ai-image')) {
                hasHero = true;
                console.log(`Hero Image found: ${line.trim()}`);
            }
        });
        if(!hasHero) console.log("Missing Hero Image!");

        // Check for Concept SVGs
        lines.forEach((line, i) => {
            if(line.includes('<svg class="concept-diagram"')) {
                console.log(`\nFound SVG at line ${i+1}:`);
                console.log(lines.slice(i-2, i+15).join('\n'));
            }
        });
    }
});

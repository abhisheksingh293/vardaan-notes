const fs = require('fs');
const filePath = 'C3_Exponents and Radicals/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the Radical Parts image floating right inside the yellow box
const target1 = `<span class="box-label">Important Terminology</span>
            <p>When`;
const rep1 = `<span class="box-label">Important Terminology</span>
            <img src="../images/C3_RadicalParts.png" alt="Radical Terminology" class="image-float-right ai-image" style="width: 35%; max-width: 200px; margin-bottom: 20px;">
            <p>When`;
content = content.replace(target1, rep1);

// 2. Inject the Power Law image floating right inside the green box
const target2 = `<span class="box-label">Fact File: The 5 Laws</span>
            <ul>`;
const rep2 = `<span class="box-label">Fact File: The 5 Laws</span>
            <img src="../images/C3_PowerLaw.png" alt="Power Law" class="image-float-right ai-image" style="width: 35%; max-width: 200px; margin-top: 5px;">
            <ul>`;
content = content.replace(target2, rep2);

// 3. Remove all SVG concepts below blocks and add clearfix inside the box
// Note: [\\s\\S] is safe for multiline matches in JS
const svgRegex = /<\/ul>\s*<\/div>\s*<svg class="concept-diagram"[\s\S]*?<\/svg>/g;
content = content.replace(svgRegex, `</ul>\n            <div class="clearfix"></div>\n        </div>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("C3 updated successfully.");

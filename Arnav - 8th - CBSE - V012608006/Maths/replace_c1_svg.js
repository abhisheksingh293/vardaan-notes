const fs = require('fs');
const filePath = 'C1_Squares and Square Roots/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const svg1Regex = /<svg\s+class="concept-diagram".*? viewBox="0 0 400 150"[\s\S]*?<\/svg>/;
const replacement1 = `        <div style="text-align: center; margin: 25px 0;">
            <p style="font-size: 1.25rem; font-weight: bold; color: var(--text-main); margin-bottom: 12px;">3 + 6 = 9 ($3^2$)</p>
            <img src="../images/C1_TriangularNumbers.png" alt="Triangular Numbers" class="ai-image" style="width: 25%; max-width: 140px; display: block; margin: 0 auto;">
        </div>`;

const svg2Regex = /<svg\s+class="concept-diagram".*? viewBox="0 0 400 300"[\s\S]*?<\/svg>/;
const replacement2 = `        <div style="text-align: center; margin: 25px 0;">
            <img src="../images/C1_PythagoreanTriplet.png" alt="Pythagorean Triplet" class="ai-image" style="width: 30%; max-width: 180px; display: block; margin: 0 auto 12px auto;">
            <p style="font-size: 1.1rem; font-weight: bold; color: var(--pink-border);">$3^2 + 4^2 = 9 + 16 = 25 = 5^2$</p>
        </div>`;

if (svg1Regex.test(content)) {
    content = content.replace(svg1Regex, replacement1);
    console.log("Replaced SVG 1 (Triangular Numbers)");
} else {
    console.log("Could not find SVG 1!");
}

if (svg2Regex.test(content)) {
    content = content.replace(svg2Regex, replacement2);
    console.log("Replaced SVG 2 (Pythagorean Triplets)");
} else {
    console.log("Could not find SVG 2!");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("File saved.");

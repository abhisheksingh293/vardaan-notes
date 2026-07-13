const fs = require('fs');
const filePath = 'c:/Users/Ankit Raj Sharma/Desktop/Class 6 to 8/Arnav Mishra/Maths/C11_Understanding Quadrilaterals/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// The Square SVG's bad polyline:
// <polyline points="100,90 110,90 110,100" fill="none" stroke="var(--pink-border)" stroke-width="2"/>
// And let's update text anchors to be safe or perfectly centered? 
// <text x="75" y="185" fill="var(--text-main)" font-size="14" font-weight="bold">Square</text>

const target = `            <!-- Square -->
            <svg class="concept-diagram" viewBox="0 0 200 200" width="30%" xmlns="http://www.w3.org/2000/svg">
                <polygon points="40,40 160,40 160,160 40,160" fill="var(--yellow-bg)" opacity="0.4" stroke="var(--yellow-border)" stroke-width="3" stroke-linejoin="round"/>
                <line x1="40" y1="40" x2="160" y2="160" stroke="var(--yellow-border)" stroke-width="2" stroke-dasharray="4,4"/>
                <line x1="160" y1="40" x2="40" y2="160" stroke="var(--yellow-border)" stroke-width="2" stroke-dasharray="4,4"/>
                <polyline points="40,55 55,55 55,40" fill="none" stroke="var(--pink-border)" stroke-width="2"/>
                <polyline points="100,90 110,90 110,100" fill="none" stroke="var(--pink-border)" stroke-width="2"/>
                <text x="75" y="185" fill="var(--text-main)" font-size="14" font-weight="bold">Square</text>
            </svg>`;

const replacement = `            <!-- Square -->
            <svg class="concept-diagram" viewBox="0 0 200 200" width="30%" xmlns="http://www.w3.org/2000/svg">
                <polygon points="40,40 160,40 160,160 40,160" fill="var(--yellow-bg)" opacity="0.4" stroke="var(--yellow-border)" stroke-width="3" stroke-linejoin="round"/>
                <line x1="40" y1="40" x2="160" y2="160" stroke="var(--yellow-border)" stroke-width="2" stroke-dasharray="4,4"/>
                <line x1="160" y1="40" x2="40" y2="160" stroke="var(--yellow-border)" stroke-width="2" stroke-dasharray="4,4"/>
                <polyline points="40,55 55,55 55,40" fill="none" stroke="var(--pink-border)" stroke-width="2"/>
                <!-- Centered rotated right angle marker for diagonal intersection -->
                <polyline points="93,93 100,86 107,93" fill="none" stroke="var(--pink-border)" stroke-width="2"/>
                <text x="100" y="185" text-anchor="middle" fill="var(--text-main)" font-size="14" font-weight="bold">Square</text>
            </svg>`;

const regex = /<!-- Square -->[\s\S]*?<text.*?Square<\/text>\s*<\/svg>/;

if (regex.test(content)) {
    content = content.replace(regex, replacement.trim());
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Square SVG fixed!");
} else {
    console.log("Could not find the Square SVG block.");
}

// I should also center the texts for Rhombus and Rectangle!
const rhombusRegex = /<text x="65" y="195" fill="var\(--text-main\)" font-size="14" font-weight="bold">Rhombus<\/text>/;
if (rhombusRegex.test(content)) {
    content = content.replace(rhombusRegex, '<text x="100" y="195" text-anchor="middle" fill="var(--text-main)" font-size="14" font-weight="bold">Rhombus</text>');
    fs.writeFileSync(filePath, content, 'utf8');
}

const rectangleRegex = /<text x="70" y="165" fill="var\(--text-main\)" font-size="14" font-weight="bold">Rectangle<\/text>/;
if (rectangleRegex.test(content)) {
    content = content.replace(rectangleRegex, '<text x="100" y="165" text-anchor="middle" fill="var(--text-main)" font-size="14" font-weight="bold">Rectangle</text>');
    fs.writeFileSync(filePath, content, 'utf8');
}

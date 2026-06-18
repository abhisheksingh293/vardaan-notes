const fs = require('fs');
const filePath = 'c:/Users/Ankit Raj Sharma/Desktop/Class 6 to 8/Arnav Mishra/Maths/C11_Understanding Quadrilaterals/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const badMatch = `        <svg class="concept-diagram" viewBox="0 0 300 250" width="70%" xmlns="http://www.w3.org/2000/svg">
            <!-- Pentagon ABCDE -->
        $$ x = 360^{\\circ} - 230^{\\circ} = 130^{\\circ} $$</p>`;

const correctReplacement = `        <svg class="concept-diagram" viewBox="0 0 300 250" width="70%" xmlns="http://www.w3.org/2000/svg">
            <!-- Pentagon ABCDE -->
            <polygon points="150,20 280,100 230,230 70,230 20,100" fill="var(--blue-bg)" opacity="0.4" stroke="var(--blue-border)" stroke-width="3" stroke-linejoin="round"/>
            
            <!-- Diagonals from Vertex A (150,20) to C(230,230) and D(70,230) -->
            <line x1="150" y1="20" x2="230" y2="230" stroke="var(--pink-border)" stroke-width="2" stroke-dasharray="6,4"/>
            <line x1="150" y1="20" x2="70" y2="230" stroke="var(--pink-border)" stroke-width="2" stroke-dasharray="6,4"/>
            
            <text x="142" y="12" fill="var(--text-main)" font-size="16" font-weight="bold">A</text>
            <text x="288" y="105" fill="var(--text-main)" font-size="16" font-weight="bold">B</text>
            <text x="236" y="250" fill="var(--text-main)" font-size="16" font-weight="bold">C</text>
            <text x="52" y="250" fill="var(--text-main)" font-size="16" font-weight="bold">D</text>
            <text x="4" y="105" fill="var(--text-main)" font-size="16" font-weight="bold">E</text>
            
            <text x="210" y="125" fill="var(--text-main)" font-size="20" font-weight="bold">1</text>
            <text x="145" y="165" fill="var(--text-main)" font-size="20" font-weight="bold">2</text>
            <text x="75" y="125" fill="var(--text-main)" font-size="20" font-weight="bold">3</text>
        </svg>

        <h3>Solved Example</h3>
        <p><strong>Find the measure of an exterior angle $x$ if the other three exterior angles of a quadrilateral are $120^{\\circ}, 80^{\\circ},$ and $30^{\\circ}$.</strong></p>
        <p><strong>Solution:</strong> We know the sum of exterior angles of any polygon is $360^{\\circ}$.<br>
        $$ 120^{\\circ} + x + 80^{\\circ} + 30^{\\circ} = 360^{\\circ} $$<br>
        $$ 230^{\\circ} + x = 360^{\\circ} $$<br>
        $$ x = 360^{\\circ} - 230^{\\circ} = 130^{\\circ} $$</p>`;

// We'll use regex to make sure we catch it even if carriage returns differ
const fixRegex = /<svg class="concept-diagram" viewBox="0 0 300 250" width="70%" xmlns="http:\/\/www\.w3\.org\/2000\/svg">\s*<!-- Pentagon ABCDE -->\s*\$\$ x = 360/g;

if(fixRegex.test(content)) {
    content = content.replace(fixRegex, correctReplacement.replace('        $$ x = 360', '$$ x = 360'));
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Reverted and fixed!");
} else {
    // maybe exactly matches text? 
    const fallbackRegex = /<!-- Pentagon ABCDE -->[\s\S]*?130\^\{\\circ\} \$\$/;
    if (fallbackRegex.test(content)) {
        console.log("Applying fallback regex restore...");
    } else {
        console.log("Could not find the damaged segment.");
    }
}

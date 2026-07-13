const fs = require('fs');
const filePath = 'C10_Parallel Lines/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// The block starts near: <svg class="concept-diagram" viewBox="0 0 500 300" width="80%" xmlns="http://www.w3.org/2000/svg">
// ... down to: </svg>\s*<ul>\s*<li><strong>Corresponding Angles:</strong>

const regex = /<svg class="concept-diagram" viewBox="0 0 500 300" width="80%" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>\s*<ul>\s*<li><strong>Corresponding Angles/g;

const replacement = `<svg class="concept-diagram" viewBox="0 0 500 300" width="80%" xmlns="http://www.w3.org/2000/svg">
            <!-- Parallel Lines l and m -->
            <line x1="50" y1="100" x2="450" y2="100" stroke="var(--blue-border)" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="200" x2="450" y2="200" stroke="var(--blue-border)" stroke-width="3" stroke-linecap="round"/>
            
            <!-- Transversal t -->
            <line x1="150" y1="50" x2="350" y2="250" stroke="var(--pink-border)" stroke-width="3" stroke-linecap="round"/>
            
            <!-- Arrowheads for parallel lines -->
            <polygon points="50,100 65,95 65,105" fill="var(--blue-border)"/>
            <polygon points="450,100 435,95 435,105" fill="var(--blue-border)"/>
            <polygon points="50,200 65,195 65,205" fill="var(--blue-border)"/>
            <polygon points="450,200 435,195 435,205" fill="var(--blue-border)"/>
            
            <!-- Arrowheads for transversal line (precisely rotated) -->
            <polygon points="150,50 140,45 140,55" fill="var(--pink-border)" transform="rotate(-135 150 50)"/>
            <polygon points="350,250 340,245 340,255" fill="var(--pink-border)" transform="rotate(45 350 250)"/>
            
            <!-- Labels for lines -->
            <text x="460" y="105" fill="var(--text-main)" font-size="20" font-family="sans-serif" font-style="italic">l</text>
            <text x="460" y="205" fill="var(--text-main)" font-size="20" font-family="sans-serif" font-style="italic">m</text>
            <text x="135" y="45" fill="var(--pink-border)" font-size="20" font-family="sans-serif" font-style="italic">t</text>
            
            <!-- Angles at top intersection (200, 100) -->
            <text x="165" y="85" fill="var(--text-main)" font-size="16" font-weight="bold">1</text>
            <text x="210" y="85" fill="var(--text-main)" font-size="16" font-weight="bold">2</text>
            <text x="185" y="130" fill="var(--text-main)" font-size="16" font-weight="bold">3</text>
            <text x="235" y="130" fill="var(--text-main)" font-size="16" font-weight="bold">4</text>
            
            <!-- Angles at bottom intersection (300, 200) -->
            <text x="265" y="185" fill="var(--text-main)" font-size="16" font-weight="bold">5</text>
            <text x="310" y="185" fill="var(--text-main)" font-size="16" font-weight="bold">6</text>
            <text x="285" y="230" fill="var(--text-main)" font-size="16" font-weight="bold">7</text>
            <text x="335" y="230" fill="var(--text-main)" font-size="16" font-weight="bold">8</text>
        </svg>

        <ul>
            <li><strong>Corresponding Angles`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("C10 Transversal SVG fixed!");
} else {
    console.log("Could not match the SVG block in C10.");
}

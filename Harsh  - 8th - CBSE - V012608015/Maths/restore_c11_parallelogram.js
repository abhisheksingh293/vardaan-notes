const fs = require('fs');
const filePath = 'C11_Understanding Quadrilaterals/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// The exact line that wasn't deleted:
//                 <!-- Trapezium -->
//                 <polygon points="80,30 220,30 270,120 30,120" fill="var(--green-bg)" opacity="0.4" stroke="var(--green-border)" stroke-width="3" stroke-linejoin="round"/>
//                 <li><strong>Opposite angles</strong> are equal (e.g., $\angle A = \angle C$ and $\angle B = \angle D$).</li>

const correctBlock = `                <!-- Trapezium -->
                <polygon points="80,30 220,30 270,120 30,120" fill="var(--green-bg)" opacity="0.4" stroke="var(--green-border)" stroke-width="3" stroke-linejoin="round"/>
                <!-- Parallel arrows on top and bottom -->
                <polygon points="150,30 140,25 140,35" fill="var(--green-border)"/>
                <polygon points="150,120 140,115 140,125" fill="var(--green-border)"/>
                <text x="110" y="80" fill="var(--text-main)" font-size="18" font-weight="bold">Trapezium</text>
            </svg>
            <svg class="concept-diagram" viewBox="0 0 300 150" width="45%" xmlns="http://www.w3.org/2000/svg">
                <!-- Parallelogram -->
                <polygon points="80,30 260,30 220,120 40,120" fill="var(--blue-bg)" opacity="0.4" stroke="var(--blue-border)" stroke-width="3" stroke-linejoin="round"/>
                <!-- Parallel arrows top/bottom -->
                <polygon points="170,30 160,25 160,35" fill="var(--blue-border)"/>
                <polygon points="130,120 120,115 120,125" fill="var(--blue-border)"/>
                <!-- Parallel double arrows left edge -->
                <polygon points="56,84 48,80 48,88" fill="var(--blue-border)" transform="rotate(-66.04 56 84)"/>
                <polygon points="64,66 56,62 56,70" fill="var(--blue-border)" transform="rotate(-66.04 64 66)"/>
                <!-- Parallel double arrows right edge -->
                <polygon points="236,84 228,80 228,88" fill="var(--blue-border)" transform="rotate(-66.04 236 84)"/>
                <polygon points="244,66 236,62 236,70" fill="var(--blue-border)" transform="rotate(-66.04 244 66)"/>
                <text x="150" y="82" text-anchor="middle" fill="var(--text-main)" font-size="18" font-weight="bold">Parallelogram</text>
            </svg>
        </div>

        <div class="yellow-box">
            <span class="box-label">Important</span>
            <p><strong>Properties of a Parallelogram:</strong></p>
            <ol>
                <li><strong>Opposite angles</strong>`;

const brokenRegex = /                <!-- Trapezium -->\s*<polygon points="80,30 220,30 270,120 30,120" fill="var\(--green-bg\)" opacity="0\.4" stroke="var\(--green-border\)" stroke-width="3" stroke-linejoin="round"\/>\s*<li><strong>Opposite angles<\/strong>/;

if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, correctBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Restored Parallelogram and Trapezium!");
} else {
    console.log("Could not find the broken segment. It might be further damaged.");
}

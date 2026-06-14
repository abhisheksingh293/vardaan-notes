const fs = require('fs');
const filePath = 'C2_Cubes and Cube Roots/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const regex1 = /<p><strong>Example 1: Is 216 a perfect cube\?<\/strong><\/p>[\s\S]*?<svg class="concept-diagram" viewBox="0 0 500 150"[\s\S]*?<\/svg>/;
const rep1 = `<p><strong>Example 1: Is 216 a perfect cube?</strong></p>
        <img src="../images/C2_PrimeTriplets.png" alt="Prime Triplet Grouping" class="image-float-right ai-image" style="width: 45%; max-width: 320px; margin-top: 5px;">
        <ul>
            <li>Step 1: Resolve 216 into prime factors: $216 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3$</li>
            <li>Step 2: Group them in triplets: $\\underline{2 \\times 2 \\times 2} \\times \\underline{3 \\times 3 \\times 3} = 2^3 \\times 3^3$</li>
            <li>Step 3: No factor is left over. Hence, 216 is a perfect cube. $216 = (2 \\times 3)^3 = 6^3$.</li>
        </ul>
        <div class="clearfix"></div>`;

const regex2 = /<p><strong>Example: Estimate the cube root of 175616<\/strong><\/p>[\s\S]*?<svg class="concept-diagram" viewBox="0 0 500 200"[\s\S]*?<\/svg>/;
const rep2 = `<p><strong>Example: Estimate the cube root of 175616</strong></p>
        <img src="../images/C2_CubeEstimation.png" alt="Cube Root Estimation" class="image-float-left ai-image" style="width: 45%; max-width: 320px; margin-top: 5px;">
        <ol>
            <li><strong>Step 1:</strong> Form groups of three digits starting from the rightmost digit. <br>
            Groups: <strong>175</strong> and <strong>616</strong></li>
            <li><strong>Step 2:</strong> Look at the first group (616). Its unit digit is 6. Since we know $6^3 = 216$ (ends in 6), the ones digit of our required cube root must be <strong>6</strong>.</li>
            <li><strong>Step 3:</strong> Look at the second group (175). Find the consecutive perfect cubes it lies between. We know $5^3 = 125$ and $6^3 = 216$. <br>
            Since $125 < 175 < 216$ (or $5^3 < 175 < 6^3$), we take the smaller number, which is <strong>5</strong>. This is the tens digit.</li>
            <li><strong>Result:</strong> $\\sqrt[3]{175616} = 56$.</li>
        </ol>
        <div class="clearfix"></div>`;

let modified = false;

if (regex1.test(content)) {
    content = content.replace(regex1, rep1);
    console.log("Replaced SVG 1 (Prime Factorisation of 216)");
    modified = true;
} else {
    console.log("Failed to find SVG 1");
}

if (regex2.test(content)) {
    content = content.replace(regex2, rep2);
    console.log("Replaced SVG 2 (Estimation of 175616)");
    modified = true;
} else {
    console.log("Failed to find SVG 2");
}

if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("C2 updated successfully.");
}

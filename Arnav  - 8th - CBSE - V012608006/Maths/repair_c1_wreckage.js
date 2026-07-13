const fs = require('fs');
const filePath = 'C1_Squares and Square Roots/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const regexErr = /<div class="clearfix"><\/div>\s*<p>\s*<img src="\.\.\/images\/C1_PythagoreanTriplet\.png"[\s\S]*?<div class="clearfix"><\/div>\s*<\/ul>/;

const correctText = `<div class="clearfix"></div>

        <h3>B. Numbers Between Square Numbers</h3>
        <p>If we take any natural number $n$ and its successor $(n+1)$, there are exactly <strong>$2n$ non-perfect square numbers</strong> lying between $n^2$ and $(n+1)^2$.</p>
        <p><em>Example:</em> Between $3^2$ (9) and $4^2$ (16), there are $2 \\times 3 = 6$ non-square numbers (which are 10, 11, 12, 13, 14, 15).</p>

        <h3>C. Pythagorean Triplets</h3>
        <p>
            <img src="../images/C1_PythagoreanTriplet.png" alt="Pythagorean Triplet" class="image-float-left ai-image" style="width: 45%; max-width: 300px; margin-top: 5px;">
            Three natural numbers $a, b,$ and $c$ are said to form a Pythagorean triplet if $a^2 + b^2 = c^2$.
        </p>
        <p style="font-size: 1.1rem; font-weight: bold; color: var(--pink-border);">$3^2 + 4^2 = 9 + 16 = 25 = 5^2$</p>
        <p><strong>General Form:</strong> For any natural number $m > 1$, we have $(2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2$. Hence, <strong>$(2m, m^2 - 1, m^2 + 1)$</strong> forms a Pythagorean triplet.</p>
        <div class="clearfix"></div>

        <h3>Topic 3 Practice Questions:</h3>
        <ul>
            <li><strong>Q1:</strong> How many non-square numbers lie between $40^2$ and $41^2$?</li>
            <li><strong>Q2:</strong> Observe the pattern and fill in the blank: $1111^2 = 1234321$. What is $111111^2$?</li>
            <li><strong>Q3:</strong> Which of the following triplets is a Pythagorean triplet? (a) (6, 7, 8) &nbsp; (b) (10, 24, 26).</li>
        </ul>`;

if (regexErr.test(content)) {
    content = content.replace(regexErr, correctText);
    console.log("SUCCESSFULLY FIXED WRECKAGE");
    fs.writeFileSync(filePath, content, 'utf8');
} else {
    console.log("Uh oh, regex didn't match the wreckage.");
}

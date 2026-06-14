const fs = require('fs');
const filePath = 'C1_Squares and Square Roots/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// For Triangular Numbers
const regex1 = /<p>Numbers whose dot patterns can be arranged as triangles[\s\S]*?<img src="\.\.\/images\/C1_TriangularNumbers\.png" alt="Triangular Numbers"[^>]*>[\s]*<\/div>/;
const rep1 = `<p>
            <img src="../images/C1_TriangularNumbers.png" alt="Triangular Numbers" class="image-float-right ai-image" style="width: 40%; max-width: 260px; margin-top: 5px;">
            Numbers whose dot patterns can be arranged as triangles are called triangular numbers (1, 3, 6, 10, 15...). If we combine two consecutive triangular numbers, we get a square number! For example: $1 + 3 = 4 = 2^2$, and $6 + 10 = 16 = 4^2$.
        </p>
        <p style="font-size: 1.25rem; font-weight: bold; color: var(--text-main); text-align: left; padding-left: 20px;">3 + 6 = 9 ($3^2$)</p>
        <div class="clearfix"></div>`;

// For Pythagorean Triplets
const regex2 = /<p>Three natural numbers \$a, b,\$ and \$c\$ are said to form a Pythagorean triplet if \$a\^2 \+ b\^2 = c\^2\.\$<\/p>[\s\S]*?<img src="\.\.\/images\/C1_PythagoreanTriplet\.png" alt="Pythagorean Triplet"[^>]*>[\s\S]*?<\/div>/;
const rep2 = `<p>
            <img src="../images/C1_PythagoreanTriplet.png" alt="Pythagorean Triplet" class="image-float-left ai-image" style="width: 45%; max-width: 300px; margin-top: 5px;">
            Three natural numbers $a, b,$ and $c$ are said to form a Pythagorean triplet if $a^2 + b^2 = c^2$.
        </p>
        <p style="font-size: 1.1rem; font-weight: bold; color: var(--pink-border);">$3^2 + 4^2 = 9 + 16 = 25 = 5^2$</p>
        <p><strong>General Form:</strong> For any natural number $m > 1$, we have $(2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2$. Hence, <strong>$(2m, m^2 - 1, m^2 + 1)$</strong> forms a Pythagorean triplet.</p>
        <div class="clearfix"></div>`;

if (regex1.test(content)) {
    content = content.replace(regex1, rep1);
    console.log("Replaced Triangular Numbers layout.");
} else {
    console.log("Target 1 not found!");
}

if (regex2.test(content)) {
    // wait I need to wipe out the paragraph below it too, since I included it in rep2
    const regex2b = /<p>Three natural numbers \$a, b,\$ and \$c\$ are said to form a Pythagorean triplet if \$a\^2 \+ b\^2 = c\^2\.\$<\/p>[\s\S]*?<img src="\.\.\/images\/C1_PythagoreanTriplet\.png" alt="Pythagorean Triplet"[\s\S]*?<\/div>\s*<p><strong>General Form:<\/strong> For any natural number \$m > 1\$, we have \$\(2m\)\^2 \+ \(m\^2 - 1\)\^2 = \(m\^2 \+ 1\)\^2\.\$ Hence, <strong>\$\(2m, m\^2 - 1, m\^2 \+ 1\)\$<\/strong> forms a Pythagorean triplet\.<\/p>/;
    
    if (regex2b.test(content)) {
        content = content.replace(regex2b, rep2);
        console.log("Replaced Pythagorean Triplet layout.");
    } else {
        console.log("Target 2b not found!");
    }
} else {
    console.log("Target 2 not found!");
}

fs.writeFileSync(filePath, content, 'utf8');

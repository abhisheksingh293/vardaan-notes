const fs = require('fs');

function fixC2() {
    const p = 'C2_Cubes and Cube Roots/ChapterNotes.html';
    let content = fs.readFileSync(p, 'utf8');
    
    const badRegex = /<!-- MAIN CONTAINER -->\s*<div class="paper-sheet">\s*<rect x="0"/;
            
    const goodText = `<!-- MAIN CONTAINER -->
    <div class="paper-sheet">
        
        <!-- BRANDING HEADER (MANDATORY) -->
        <div class="branding-header">
            <div class="institute-name">Vardaan Learning Institute</div>
            <div class="system-name">Class 8 Maths • Chapter Notes</div>
            
            <!-- CONTACT INFO ROW (Hidden on Screen, Visible on Print) -->
            <div class="contact-info">
                <span>🌐 vardaanlearning.com</span>
                <span>📞 9508841336</span>
            </div>
        </div>

        <!-- DYNAMIC CONTENT STARTS HERE -->
        <h1>Cubes and Cube Roots</h1>
        
        <p>In this chapter, we will expand our understanding of exponents from square (power of 2) to <strong>exponent three</strong>. We will learn to calculate the cubes of positive and negative rational numbers, recognize perfect cubes, and extract cube roots through various methods including prime factorisation and estimation.</p>

        <div class="diagram-container">
            <img src="../images/C2_PerfectCube3D.png" alt="Perfect Cube 3x3x3" class="ai-image">
        </div>

        <h2>1. Cubes and Perfect Cubes</h2>
        
        <div class="blue-box">
            <span class="box-label">Concept</span>
            <p><strong>Cube of a Number:</strong> The cube of a number is the product obtained by multiplying the number by itself three times. It is read as the number raised to the power 3.</p>
            <p>For a number $n$, its cube is $n^3 = n \\times n \\times n$.</p>
            <p><strong>Perfect Cube:</strong> A number $n$ is a perfect cube if there is an integer $m$ such that $n = m \\times m \\times m$. Example: $64 = 4 \\times 4 \\times 4$, so 64 is a perfect cube.</p>
        </div>

        <h3>Checking for Perfect Cubes</h3>
        <p>To check if a number is a perfect cube, we express it as a product of its prime factors. If the prime factors can be grouped into <strong>triplets</strong> (groups of three identical factors) and no factor is left ungrouped, the number is a perfect cube.</p>

        <p><strong>Example 1: Is 216 a perfect cube?</strong></p>
        <ul>
            <li>Step 1: Resolve 216 into prime factors: $216 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3$</li>
            <li>Step 2: Group them in triplets: $\\underline{2 \\times 2 \\times 2} \\times \\underline{3 \\times 3 \\times 3} = 2^3 \\times 3^3$</li>
            <li>Step 3: No factor is left over. Hence, 216 is a perfect cube. $216 = (2 \\times 3)^3 = 6^3$.</li>
        </ul>
        
        <svg class="concept-diagram" viewBox="0 0 500 150" width="70%" xmlns="http://www.w3.org/2000/svg">
            <rect x="0"`;

    if (content.match(badRegex)) {
        content = content.replace(badRegex, goodText);
        fs.writeFileSync(p, content, 'utf8');
        console.log("Fixed C2 successfully");
    } else {
        console.log("C2 string target not found!");
    }
}

function fixC5() {
    const p = 'C5_Profit Loss and Discount/ChapterNotes.html';
    let content = fs.readFileSync(p, 'utf8');
    
    const badRegex = /<!-- BRANDING HEADER \(MANDATORY\) -->\s*<rect x="50"/;
            
    const goodText = `<!-- BRANDING HEADER (MANDATORY) -->
        <div class="branding-header">
            <div class="institute-name">Vardaan Learning Institute</div>
            <div class="system-name">Class 8 Maths • Chapter Notes</div>
            
            <!-- CONTACT INFO ROW (Hidden on Screen, Visible on Print) -->
            <div class="contact-info">
                <span>🌐 vardaanlearning.com</span>
                <span>📞 9508841336</span>
            </div>
        </div>

        <!-- DYNAMIC CONTENT STARTS HERE -->
        <h1>5. Profit, Loss and Discount</h1>
        
        <p>In commercial mathematics, understanding how money is exchanged for goods is essential. This chapter deals with the fundamental concepts of buying and selling, calculating profits or losses, understanding how shopkeepers offer discounts to attract customers, and how Value Added Tax (VAT) is applied to purchases.</p>

        <div class="diagram-container">
            <img src="../images/C5_ProfitLossConcept.png" alt="Profit and Loss Visual" class="ai-image">
        </div>

        <h2>1. Recall: Profit and Loss Basics</h2>
        
        <div class="blue-box">
            <span class="box-label">Concept</span>
            <p><strong>Cost Price (C.P.):</strong> The amount paid to purchase an article or the price at which an article is made.</p>
            <p><strong>Selling Price (S.P.):</strong> The price at which an article is sold to the customer.</p>
            <p><strong>Profit:</strong> When S.P. > C.P., the difference is called profit. <br> $Profit = S.P. - C.P.$</p>
            <p><strong>Loss:</strong> When C.P. > S.P., the difference is called loss. <br> $Loss = C.P. - S.P.$</p>
        </div>
        
        <svg class="concept-diagram" viewBox="0 0 500 150" width="70%" xmlns="http://www.w3.org/2000/svg">
            <!-- Define arrowhead markers -->
            <defs>
                <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="var(--green-border)" />
                </marker>
                <marker id="arrowPink" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="var(--pink-border)" />
                </marker>
            </defs>

            <rect x="50"`;

    if (content.match(badRegex)) {
        content = content.replace(badRegex, goodText);
        fs.writeFileSync(p, content, 'utf8');
        console.log("Fixed C5 successfully");
    } else {
        console.log("C5 string target not found!");
    }
}

fixC2();
fixC5();

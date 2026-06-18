const fs = require('fs');
const filePath = 'C5_Profit Loss and Discount/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the Profit Loss image floating right inside the blue-box
const t1 = `<span class="box-label">Concept</span>
            <p><strong>Cost`;
const r1 = `<span class="box-label">Concept</span>
            <img src="../images/C5_ProfitLoss.png" alt="Cost Price and Selling Price" class="image-float-right ai-image" style="width: 38%; max-width: 240px; margin-top: 5px;">
            <p><strong>Cost`;
content = content.replace(t1, r1);

// Remove first SVG (around line 451-477)
const s1 = /<\/div>\s*<svg class="concept-diagram" viewBox="0 0 500 150"[\s\S]*?<\/svg>/;
content = content.replace(s1, `<div class="clearfix"></div>\n        </div>`);

// 2. Inject the Discount image floating right inside the green-box
const t2 = `<span class="box-label">Fact File</span>
            <p><strong>Marked Price (M.P.)`;
const r2 = `<span class="box-label">Fact File</span>
            <img src="../images/C5_Discount.png" alt="Marked Price and Discount" class="image-float-right ai-image" style="width: 38%; max-width: 240px; margin-top: 5px;">
            <p><strong>Marked Price (M.P.)`;
content = content.replace(t2, r2);

// Remove second SVG (around line 524-547)
const s2 = /<\/div>\s*<svg class="concept-diagram" viewBox="0 0 500 120"[\s\S]*?<\/svg>/;
content = content.replace(s2, `<div class="clearfix"></div>\n        </div>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("C5 SVGs replaced.");

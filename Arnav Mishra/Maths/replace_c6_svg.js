const fs = require('fs');
const filePath = 'C6_Compound Interest/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the Simple vs Compound Interest Graph floating right
const t1 = `<p><strong>Example:</strong> Let Principal = Ã¢â€šÂ¹1000 and Rate = 10% per annum.</p>\r\n        <ul>`;
const fallback_t1 = `<p><strong>Example:</strong> Let Principal = Ã¢â€šÂ¹1000 and Rate = 10% per annum.</p>\n        <ul>`;
const r1 = `<p><strong>Example:</strong> Let Principal = Ã¢â€šÂ¹1000 and Rate = 10% per annum.</p>
        <img src="../images/C6_InterestGraph.png" alt="Simple vs Compound Interest Graph" class="image-float-right ai-image" style="width: 38%; max-width: 260px; margin-top: 5px;">
        <ul>`;

if (content.includes(t1)) {
    content = content.replace(t1, r1);
} else if (content.includes(fallback_t1)) {
    content = content.replace(fallback_t1, r1);
}

// Remove first SVG
const svg1 = /<\/ul>\s*<svg class="concept-diagram" viewBox="0 0 500 200"[\s\S]*?<\/svg>/;
content = content.replace(svg1, `</ul>\n        <div class="clearfix"></div>`);

// 2. Inject the Compounding Timeline floating right inside the yellow box
const t2 = `<span class="box-label">Important Terminology</span>\r\n            <p><strong>Conversion Period`;
const fallback_t2 = `<span class="box-label">Important Terminology</span>\n            <p><strong>Conversion Period`;
const r2 = `<span class="box-label">Important Terminology</span>
            <img src="../images/C6_CompoundingTimeline.png" alt="Compounding Timeline" class="image-float-right ai-image" style="width: 35%; max-width: 250px; margin-top: 5px;">
            <p><strong>Conversion Period`;

if (content.includes(t2)) {
    content = content.replace(t2, r2);
} else if (content.includes(fallback_t2)) {
    content = content.replace(fallback_t2, r2);
}

// Remove second SVG
const svg2 = /<\/ul>\s*<\/div>\s*<svg class="concept-diagram" viewBox="0 0 500 120"[\s\S]*?<\/svg>/;
content = content.replace(svg2, `</ul>\n            <div class="clearfix"></div>\n        </div>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("C6 SVGs replaced correctly.");

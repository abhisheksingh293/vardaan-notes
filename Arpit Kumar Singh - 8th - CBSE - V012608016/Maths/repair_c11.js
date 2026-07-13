const fs = require('fs');

function repair() {
    const p = 'C11_Understanding Quadrilaterals/ChapterNotes.html';
    let content = fs.readFileSync(p, 'utf8');

    // 1. Repair the damaged HTML block
    // The fuzzy matcher replaced from <h2>1. Introduction to Curves and Polygons</h2>
    // down to <p><strong>Classification of Polygons:</strong> ...</p> with NOTHING but <h2>1. Introduction...</h2>
    
    // We will find "<h2>1. Introduction to Curves and Polygons</h2>" followed immediately by "<ul>"
    // and replace it with the correct HTML.
    
    // Actually the diff showed it replaced from '<p>\n<img src="../images/C11_...' down to '...they have:</p>' with NOTHING.
    // Let's use string operations:
    const badRegex = /<h2>1\. Introduction to Curves and Polygons<\/h2>\s*<ul>\s*<li>3 sides:/;
    const goodHtml = `<h2>1. Introduction to Curves and Polygons</h2>
        <p>
            <img src="../images/C11_RealWorldPolygons.png" alt="Polygons in Architecture" class="image-float-right ai-image">
            In our daily life, we come across various plane surfaces (like a notebook page or a desk top). When you join points on these surfaces without lifting your pencil and without retracing any portion, you draw a <strong>curve</strong>. Curves can be open or closed.</p>
        <div class="clearfix"></div>
        
        <div class="blue-box">
            <span class="box-label">Concept</span>
            <p><strong>Polygon:</strong> A simple closed curve made up of <em>only</em> line segments is called a polygon.</p>
            <p><strong>Classification of Polygons:</strong> Polygons are classified by the number of sides (or vertices) they have:</p>
            <ul>
                <li>3 sides:`;
    
    if (content.match(badRegex)) {
        content = content.replace(badRegex, goodHtml);
        console.log("Repaired damaged text in C11.");
    } else {
        console.log("Could not find the damaged text in C11.");
    }
    
    // 2. Fix the overlap issue globally in the CSS of C11
    // We can add overflow: hidden to the colored boxes so they establish a block formatting context
    // and don't slide under floated images.
    
    const cssTarget = `.blue-box { background-color: var(--blue-bg); border-left: 5px solid var(--blue-border); }`;
    const cssFix = `.blue-box, .yellow-box, .green-box, .pink-box { overflow: hidden; /* Fixes overlap with floated images */ }\n        ` + cssTarget;
    
    if (content.includes(cssTarget) && !content.includes('overflow: hidden; /* Fixes overlap with floated images */')) {
        content = content.replace(cssTarget, cssFix);
        console.log("Injected overflow fix into C11 CSS.");
    }

    fs.writeFileSync(p, content, 'utf8');
}

repair();

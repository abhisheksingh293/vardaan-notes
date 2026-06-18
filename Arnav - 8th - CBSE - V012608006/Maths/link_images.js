const fs = require('fs');

const cssToAdd = `
        /* Concept Diagrams and AI Images */
        .diagram-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0;
            padding: 15px;
            background-color: var(--bg-secondary);
            border-radius: 8px;
            text-align: center;
        }
        .concept-diagram {
            max-width: 100%;
            height: auto;
        }
        .ai-image {
            max-width: 90%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        html.dark-mode .ai-image {
            filter: invert(1) hue-rotate(180deg);
        }
`;

function ensureCSS(content) {
    if (!content.includes('.diagram-container {') && content.includes('/* Dark Mode and Basic Layout Variables */')) {
        content = content.replace('/* Dark Mode and Basic Layout Variables */', cssToAdd + '\n        /* Dark Mode and Basic Layout Variables */');
    }
    return content;
}

function updateC1() {
    let p = 'C1_Squares and Square Roots/ChapterNotes.html';
    let content = fs.readFileSync(p, 'utf8');
    content = ensureCSS(content);
    const oldImg = /<img src="\.\.\/images\/C1_PerfectSquareGrid\.png".*?class="image-float-right">/;
    const newImg = `<div class="diagram-container">
            <img src="../images/C1_PerfectSquareGrid.png" alt="Perfect Square 4x4 Grid" class="ai-image">
        </div>`;
    if (content.match(oldImg)) {
        content = content.replace(oldImg, newImg);
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated C1");
    }
}

function updateC4() {
    let p = 'C4_Direct and Inverse Variation/ChapterNotes.html';
    let content = fs.readFileSync(p, 'utf8');
    content = ensureCSS(content);
    const oldImg = /<img src="\.\.\/images\/C4_VariationVisuals\.png".*?class="image-float-right">/;
    const newImg = `<div class="diagram-container">
            <img src="../images/C4_VariationVisuals.png" alt="Direct and Inverse Variation Examples" class="ai-image">
        </div>`;
    if (content.match(oldImg)) {
        content = content.replace(oldImg, newImg);
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated C4");
    }
}

function updateChapter(folder, imageFilename, altText) {
    let p = folder + '/ChapterNotes.html';
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    content = ensureCSS(content);
    
    // Check if completely missing
    if (!content.includes(imageFilename)) {
        const newImg = `
        <div class="diagram-container">
            <img src="../images/${imageFilename}" alt="${altText}" class="ai-image">
        </div>
`;
        // Insert right before the first <h2>
        const h2Match = content.match(/<h2>/);
        if (h2Match) {
            content = content.replace(/<h2>/, newImg + '\n        <h2>');
            fs.writeFileSync(p, content, 'utf8');
            console.log("Updated " + folder);
        }
    } else {
        console.log(folder + " already has the image.");
    }
}

updateC1();
updateC4();
updateChapter('C10_Parallel Lines', 'C10_RailwayTracks.png', 'Parallel Railway Tracks');
updateChapter('C11_Understanding Quadrilaterals', 'C11_RealWorldPolygons.png', 'Polygons in Architecture');
updateChapter('C12_Construction of Quadrilaterals', 'C12_GeometryTools.png', 'Geometry Construction Tools');
updateChapter('C13_Introduction to Graphs', 'C13_StockMarketGraph.png', 'Line Graph Concept');
updateChapter('C14_Mensuration', 'C14_RealWorld3DShapes.png', '3D Shapes');

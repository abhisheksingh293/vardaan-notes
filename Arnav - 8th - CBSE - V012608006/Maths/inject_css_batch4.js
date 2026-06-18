const fs = require('fs');

const cssBlock = `        /* --- NEWSPAPER STYLE IMAGES --- */
        .image-float-right { float: right; width: 25%; max-width: 180px; margin: 8px 0 14px 18px; border-radius: 0; border: none; box-shadow: none; transition: none; }
        .image-float-left { float: left; width: 25%; max-width: 180px; margin: 8px 18px 14px 0; border-radius: 0; border: none; box-shadow: none; transition: none; }
        html.dark-mode .image-float-right, html.dark-mode .image-float-left { filter: invert(1); opacity: 1; }

        @media (max-width: 768px) {
            .diagram-container,
            .diagram-container:nth-of-type(even),
            .image-float-right,
            .image-float-left {
                float: none !important;
                display: block !important;
                width: 90% !important;
                max-width: 500px !important;
                min-width: 0 !important;
                margin: 20px auto !important;
                clear: both !important;
            }
        }
        
        /* --- STRICT PRINT CONFIGURATION --- */`;

function fixCSS(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if newspaper style already exists
    if (!content.includes('/* --- NEWSPAPER STYLE IMAGES --- */')) {
        // Inject right before STRICT PRINT
        content = content.replace('/* --- STRICT PRINT CONFIGURATION --- */', cssBlock);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Injected CSS to " + file);
    } else {
        console.log("CSS already exists in " + file);
    }
}

fixCSS('C7_Algebraic Identities/ChapterNotes.html');
fixCSS('C8_Polynomials/ChapterNotes.html');
fixCSS('C9_Linear Equations in One Variable/ChapterNotes.html');


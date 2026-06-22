const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = [
  'generate_subject_pages.js',
  'generate_student_pages.js',
  'index.html'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Inject an override for .card to remove background, border, and shadows
  const overrideCss = '\n    .card { background: transparent !important; border: none !important; box-shadow: none !important; backdrop-filter: none !important; }\n  </style>';
  
  if (!content.includes('background: transparent !important;')) {
    content = content.replace('</style>', overrideCss);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed card background from ${file}`);
  } else {
    console.log(`Already removed from ${file}`);
  }
}

console.log("Running generators to apply changes...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done removing card backgrounds!");

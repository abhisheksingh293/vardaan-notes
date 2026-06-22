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

  // Remove the transparent override we added previously
  content = content.replace(/\s*\.card\s*\{\s*background:\s*transparent\s*!important;[^}]*\}/g, '');

  // Add the square override only for grid-based cards (index and students)
  if (file === 'index.html' || file === 'generate_student_pages.js') {
    const squareCss = '\n    .card { aspect-ratio: 1 / 1; justify-content: center; }\n  </style>';
    if (!content.includes('aspect-ratio: 1 / 1;')) {
      content = content.replace('</style>', squareCss);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}

console.log("Running generators to apply changes...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done making cards square!");

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

  // Remove .card:hover blocks
  content = content.replace(/\.card:hover\s*\{[^}]*\}/g, '');
  
  // Remove .card:hover::before blocks
  content = content.replace(/\.card:hover::before\s*\{[^}]*\}/g, '');
  
  // Remove .brand:hover blocks
  content = content.replace(/\.brand:hover\s*\{[^}]*\}/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed hover effects from ${file}`);
}

console.log("Running generators to apply changes...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done removing hover effects!");

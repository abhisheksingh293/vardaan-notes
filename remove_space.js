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

  // Reduce the padding-top of .wrap from 60px to 20px
  content = content.replace(/(\.wrap\s*\{[^}]*padding:\s*)60px(\s+24px\s+100px;[^}]*\})/g, '$120px$2');

  // Remove the margin-top: 40px from .head
  content = content.replace(/(\.head\s*\{[^}]*)margin-top:\s*40px;([^}]*\})/g, '$1margin-top: 0px;$2');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated spacing in ${file}`);
}

console.log("Running generators to apply changes...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done making cards square!");

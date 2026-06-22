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

  // Remove transition properties
  content = content.replace(/transition:\s*[^;]+;/g, '');
  
  // Remove animation properties
  content = content.replace(/animation:\s*[^;]+;/g, '');
  
  // Remove @keyframes lines
  content = content.split('\n').filter(line => !line.includes('@keyframes')).join('\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed animations from ${file}`);
}

console.log("Running generators to update all generated pages...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done removing animations!");

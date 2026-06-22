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

  // Replace specific transform lines used for hover effects
  content = content.replace(/transform:\s*scale\(1\.02\);?/g, '');
  content = content.replace(/transform:\s*translateY\(-8px\)\s*scale\(1\.02\);?/g, '');
  content = content.replace(/transform:\s*translateX\(8px\);?/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed click/hover movement from ${file}`);
}

console.log("Running generators to apply changes...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done removing transforms!");

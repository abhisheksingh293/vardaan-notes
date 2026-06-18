const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const directoryToWatch = __dirname;
let debounceTimeout = null;

console.log('✅ Watching for folder and file changes...');
console.log('Whenever you add a new student, subject, or chapter, index.html will update automatically!');

fs.watch(directoryToWatch, { recursive: true }, (eventType, filename) => {
  // Ignore changes to index.html itself or hidden files/git to prevent infinite loops
  if (filename && (filename.includes('index.html') || filename.includes('.git'))) {
    return;
  }

  // Debounce the execution to prevent running the script multiple times for a single action
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    console.log(`\nDetected change in ${filename || 'directory'}. Updating portal...`);
    
    exec('node generate_subject_pages.js && node generate_student_pages.js && node auto_update_index.js', (err, stdout, stderr) => {
      if (err) {
        console.error('Error updating index.html:', err);
        return;
      }
      console.log(stdout.trim());
    });
  }, 1000); // Wait 1 second after the last change before updating
});

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexFile = path.join(rootDir, 'index.html');

// Recursive function to find the first HTML file
function findFirstHtml(dir, basePath) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const found = findFirstHtml(path.join(dir, item.name), basePath);
        if (found) return found;
      } else if (item.name.endsWith('.html')) {
        return path.relative(basePath, path.join(dir, item.name)).replace(/\\/g, '/');
      }
    }
  } catch (e) {}
  return null;
}

// 1. Find all valid student directories
const students = [];
const items = fs.readdirSync(rootDir, { withFileTypes: true });

for (const item of items) {
  if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'Worksheets' || item.name === 'Images') {
    continue;
  }
  
  const studentDir = path.join(rootDir, item.name);
  let files = [];
  try { files = fs.readdirSync(studentDir); } catch(e) {}
  
  let primaryHtml = null;

  // Heuristic 1: Matches name without spaces
  const expectedName = item.name.replace(/\s+/g, '') + '.html';
  primaryHtml = files.find(f => f.toLowerCase() === expectedName.toLowerCase());
  
  // Heuristic 2: Custom
  if (!primaryHtml && item.name === 'VidyaPrakash Kalia') primaryHtml = 'AaravKalia.html';
  
  // Heuristic 3: Any .html at root (not worksheet)
  if (!primaryHtml) {
    primaryHtml = files.find(f => f.endsWith('.html') && !f.toLowerCase().includes('worksheet'));
  }
  
  // Heuristic 4: Any .html at root
  if (!primaryHtml) {
    primaryHtml = files.find(f => f.endsWith('.html'));
  }

  // Heuristic 5: Recursive search for ANY html file inside subfolders!
  if (!primaryHtml) {
    primaryHtml = findFirstHtml(studentDir, studentDir);
  }
  
  // Generate URL-friendly link
  let link = '#';
  if (primaryHtml) {
    // split by '/' because it might be a relative path like "Physics/ChapterNotes.html"
    const parts = primaryHtml.split('/');
    const encodedParts = parts.map(p => encodeURIComponent(p).replace(/%20/g, ' '));
    link = `./${encodeURIComponent(item.name).replace(/%20/g, ' ')}/${encodedParts.join('/')}`;
  }
  
  // Count subjects and chapters
  let subjectCount = 0;
  let chapterCount = 0;
  
  try {
    const studentContents = fs.readdirSync(studentDir, { withFileTypes: true });
    for (const subItem of studentContents) {
      if (subItem.isDirectory() && !subItem.name.startsWith('.') && subItem.name !== 'Images') {
        subjectCount++;
        
        try {
          const subjectPath = path.join(studentDir, subItem.name);
          const chapters = fs.readdirSync(subjectPath, { withFileTypes: true });
          for (const chap of chapters) {
            if (chap.isDirectory() && !chap.name.startsWith('.')) {
              chapterCount++;
            }
          }
        } catch(err) {}
      }
    }
  } catch(e) {}
                
  students.push({
    name: item.name,
    link: link,
    subjects: subjectCount,
    chapters: chapterCount
  });
}

// Sort alphabetically
students.sort((a, b) => a.name.localeCompare(b.name));

// 2. Read and update index.html
try {
    let htmlContent = fs.readFileSync(indexFile, 'utf8');

    const regex = /const\s+students\s*=\s*\[[\s\S]*?\];/;
    const replacement = `const students = ${JSON.stringify(students, null, 6)};`;

    if (regex.test(htmlContent)) {
      htmlContent = htmlContent.replace(regex, replacement);
      fs.writeFileSync(indexFile, htmlContent, 'utf8');
      console.log(`✅ Successfully updated index.html! Found ${students.length} students.`);
    } else {
      console.log('❌ Error: Could not find "const students = [...]" array in index.html.');
    }
} catch (e) {
    console.log('❌ Error reading index.html: ' + e.message);
}

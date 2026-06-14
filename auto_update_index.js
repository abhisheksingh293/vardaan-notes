const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexFile = path.join(rootDir, 'index.html');

// 1. Find all valid student directories
const students = [];
const items = fs.readdirSync(rootDir, { withFileTypes: true });

for (const item of items) {
  if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'Worksheets' || item.name === 'Images') {
    continue;
  }
  
  const studentDir = path.join(rootDir, item.name);
  const files = fs.readdirSync(studentDir);
  
  // Find the primary HTML file
  // Heuristic 1: Matches name without spaces
  const expectedName = item.name.replace(/\s+/g, '') + '.html';
  let primaryHtml = files.find(f => f.toLowerCase() === expectedName.toLowerCase());
  
  // Heuristic 2: Matches any custom names used previously (like AaravKalia.html)
  if (!primaryHtml) {
    if (item.name === 'VidyaPrakash Kalia') primaryHtml = 'AaravKalia.html';
  }
  
  // Heuristic 3: Any .html file at root
  if (!primaryHtml) {
    primaryHtml = files.find(f => f.endsWith('.html') && !f.toLowerCase().includes('worksheet'));
  }
  
  // Fallback to worksheet if nothing else
  if (!primaryHtml) {
    primaryHtml = files.find(f => f.endsWith('.html'));
  }
  
  if (primaryHtml) {
    // Generate URL-friendly link
    const link = `./${encodeURIComponent(item.name).replace(/%20/g, ' ')}/${encodeURIComponent(primaryHtml).replace(/%20/g, ' ')}`;
    
    // We can count subjects by looking at subdirectories
    const subdirs = fs.readdirSync(studentDir, { withFileTypes: true })
                      .filter(d => d.isDirectory() && !d.name.startsWith('.')).length;
                      
    students.push({
      name: item.name,
      link: link,
      subjects: subdirs || 1,
      chapters: (subdirs * 4) || 2 // rough estimate
    });
  }
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

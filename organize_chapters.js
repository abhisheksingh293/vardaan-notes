const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const items = fs.readdirSync(rootDir, { withFileTypes: true });

let moveCount = 0;

for (const item of items) {
  if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'Worksheets' || item.name === 'Images') continue;
  
  const studentDir = path.join(rootDir, item.name);
  let studentContents = [];
  try { studentContents = fs.readdirSync(studentDir, { withFileTypes: true }); } catch(e) {}

  for (const subItem of studentContents) {
    if (subItem.isDirectory() && !subItem.name.startsWith('.') && subItem.name !== 'Worksheets' && subItem.name !== 'Images') {
      const subjectName = subItem.name;
      const subjectPath = path.join(studentDir, subjectName);
      
      let subjectContents = [];
      try { subjectContents = fs.readdirSync(subjectPath, { withFileTypes: true }); } catch(e) {}
      
      for (const fileItem of subjectContents) {
        if (fileItem.isFile() && fileItem.name.endsWith('.html')) {
          const expectedName = subjectName.replace(/\s+/g, '') + '.html';
          if (fileItem.name.toLowerCase() === expectedName.toLowerCase()) continue;
          if (fileItem.name.toLowerCase() === subjectName.toLowerCase() + '.html') continue;
          
          const chapterName = fileItem.name.replace('.html', '');
          const chapterFolderPath = path.join(subjectPath, chapterName);
          
          if (!fs.existsSync(chapterFolderPath)) {
             fs.mkdirSync(chapterFolderPath);
          }
          
          const oldPath = path.join(subjectPath, fileItem.name);
          const newPath = path.join(chapterFolderPath, fileItem.name);
          
          fs.renameSync(oldPath, newPath);
          console.log(`✅ Moved ${fileItem.name} into folder /${subjectName}/${chapterName}`);
          moveCount++;
        }
      }
    }
  }
}

console.log(`\n🎉 Finished! Moved ${moveCount} loose HTML files into their own chapter folders.`);

const fs = require('fs');
const path = require('path');

const mappings = [
  { src: "Abhinav  - 9th - ICSE - V022609022", dest: "Abhinav - 9th - ICSE - V022609022" },
  { src: "Astuti Jha  - 6th - ICSE - V022606013", dest: "Astuti Jha - 6th - ICSE - V022606013" },
  { src: "Garima  - 12th - CBSE - V022612020", dest: "Garima - 12th - CBSE - V022612020" },
  { src: "Mayank Mishra  - 10th - ICSE - V012610007", dest: "Mayank Mishra - 10th - ICSE - V012610007" },
  { src: "SURYANSH PANDEY a - 7th - CBSE - V022607024", dest: "Suryansh Pandey - 7th - CBSE - V022607024" },
  { src: "SURYANSH VIPRAVANSHI - 7th - CBSE - V022607024", dest: "Suryansh Pandey - 7th - CBSE - V022607024" },
  { src: "Tanvi Bharti - 11th - CBSE - V022611025", dest: "Tanvi kumari - 11th - CBSE - V022611025" },
  { src: "Tanvi kumari - Jamshedpur - Jamshedpur - V022611025", dest: "Tanvi kumari - 11th - CBSE - V022611025" }
];

const basePath = __dirname;

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied: ${src} -> ${dest}`);
    } else {
      console.log(`Skipped (already exists): ${dest}`);
    }
  }
}

mappings.forEach(mapping => {
  const srcPath = path.join(basePath, mapping.src);
  const destPath = path.join(basePath, mapping.dest);

  if (fs.existsSync(srcPath)) {
    console.log(`\nMerging ${mapping.src} into ${mapping.dest}...`);
    
    // Ensure dest exists
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }

    try {
      copyRecursiveSync(srcPath, destPath);
      console.log(`Deleting source folder: ${srcPath}`);
      fs.rmSync(srcPath, { recursive: true, force: true });
      console.log('Done.');
    } catch (err) {
      console.error(`Error during merge: ${err}`);
    }
  } else {
    console.log(`\nSource not found, skipping: ${mapping.src}`);
  }
});

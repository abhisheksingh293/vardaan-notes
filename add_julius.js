const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const students = [
    "Abhay Kumar - 9th - ICSE - V022609014",
    "Abhinav - 9th - ICSE - V022609022",
    "Chahat - 9th - ICSE - V022609021",
    "Arsh Sharma - 10th - ICSE - V012610021",
    "Mayank Mishra - 10th - ICSE - V012610007"
];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=https://julius-caesar-s7cz.vercel.app/">
    <title>Julius Caesar</title>
</head>
<body>
    <p>Redirecting to Julius Caesar...</p>
</body>
</html>`;

for (const student of students) {
    const englishPath = path.join(rootDir, student, "English");
    if (!fs.existsSync(englishPath)) {
        fs.mkdirSync(englishPath, { recursive: true });
        console.log(`Created English folder for ${student}`);
    }
    
    const chapterPath = path.join(englishPath, "Julius Caesar");
    if (!fs.existsSync(chapterPath)) {
        fs.mkdirSync(chapterPath, { recursive: true });
        console.log(`Created Julius Caesar folder for ${student}`);
    }
    
    const filePath = path.join(chapterPath, "chapternotes.html");
    fs.writeFileSync(filePath, htmlContent, "utf8");
    console.log(`Created chapternotes.html for ${student}`);
}

console.log("Running generators to update the portal...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
    execSync('node auto_update_index.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done adding Julius Caesar to 9th and 10th ICSE students.");

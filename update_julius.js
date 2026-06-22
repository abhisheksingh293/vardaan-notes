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
    <title>Julius Caesar</title>
    <script>window.location.replace("https://julius-caesar-s7cz.vercel.app/");</script>
</head>
<body style="background-color: #f5f7fb; margin: 0; padding: 0;">
</body>
</html>`;

for (const student of students) {
    const englishPath = path.join(rootDir, student, "English");
    const chapterPath = path.join(englishPath, "Julius Caesar");
    const filePath = path.join(chapterPath, "chapternotes.html");
    
    if (fs.existsSync(chapterPath)) {
        fs.writeFileSync(filePath, htmlContent, "utf8");
        console.log(`Updated chapternotes.html for ${student} to redirect silently without text.`);
    }
}

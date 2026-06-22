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

const targetUrl = "https://julius-caesar-s7cz.vercel.app/";

for (const student of students) {
    const englishPath = path.join(rootDir, student, "English");
    const chapterPath = path.join(englishPath, "Julius Caesar");
    const htmlFilePath = path.join(chapterPath, "chapternotes.html");
    const linkFilePath = path.join(chapterPath, "link.txt");
    
    if (fs.existsSync(chapterPath)) {
        // Write the link.txt file so generator puts URL right in the link
        fs.writeFileSync(linkFilePath, targetUrl, "utf8");
        
        // Remove the chapternotes.html so it doesn't use the redirecting HTML anymore
        if (fs.existsSync(htmlFilePath)) {
            fs.unlinkSync(htmlFilePath);
        }
        
        console.log(`Updated Julius Caesar for ${student} to use direct link.txt.`);
    }
}

console.log("Running generators to update the portal with direct links...");
try {
    execSync('node generate_subject_pages.js', { stdio: 'inherit' });
    execSync('node generate_student_pages.js', { stdio: 'inherit' });
    execSync('node auto_update_index.js', { stdio: 'inherit' });
} catch (error) {
    console.error("Error running generators:", error);
}

console.log("Done updating Julius Caesar to open directly.");

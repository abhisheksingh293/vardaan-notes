const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const supabaseUrl = 'https://foctcuhwfdxducidccsk.supabase.co';
// Using the service role key to ensure we have access
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvY3RjdWh3ZmR4ZHVjaWRjY3NrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQ1NjI3MSwiZXhwIjoyMDc4MDMyMjcxfQ.DOAsIPmSQwWg4t9n7jOvMRGn0qd2OhHKc5OIW2z9RKQ';

async function syncStudents() {
  console.log('Fetching active students from database...');
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/students?select=student_id,full_name,class,board,student_code&is_active=eq.true`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const students = await response.json();
    let newFoldersCreated = 0;

    for (const student of students) {
      if (!student.full_name || !student.class || !student.board || !student.student_code) {
        continue; // Skip if any essential info is missing
      }

      // Format: Full Name - Class - Board - Student Code
      const folderName = `${student.full_name} - ${student.class} - ${student.board} - ${student.student_code}`;
      const folderPath = path.join(rootDir, folderName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`✅ Created new folder: "${folderName}"`);
        newFoldersCreated++;
      }
    }

    if (newFoldersCreated > 0) {
      console.log(`\n🎉 Successfully created ${newFoldersCreated} new student folder(s).`);
      console.log('Running generators to update the portal...');
      try {
        execSync('node generate_student_pages.js', { stdio: 'inherit' });
        execSync('node auto_update_index.js', { stdio: 'inherit' });
      } catch (e) {
        console.error('Error running generators:', e.message);
      }
    } else {
      console.log('✅ All student folders are already up to date. No new students found.');
    }

  } catch (error) {
    console.error('❌ Error syncing students:', error);
  }
}

syncStudents();

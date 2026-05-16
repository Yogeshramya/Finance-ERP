const { execSync } = require('child_process');

try {
  // Get list of changed files
  const status = execSync('git status --porcelain').toString();
  
  if (!status) {
    console.log('✨ No changes to sync. Repository is up to date.');
    process.exit(0);
  }

  // Extract up to 5 recently worked on files for the commit message
  const files = status.split('\n')
    .filter(line => line.trim())
    .map(line => {
        const parts = line.trim().split(' ');
        return parts[parts.length - 1].split('/').pop(); // Just the filename
    })
    .slice(0, 5)
    .join(', ');

  const commitMsg = `Auto-Sync: Updated ${files}${status.trim().split('\n').length > 5 ? ' and others...' : ''}`;
  
  console.log('🚀 Staging all recent changes...');
  execSync('git add .');
  
  console.log(`📝 Committing with reason: "${commitMsg}"`);
  try {
    execSync(`git commit -m "${commitMsg}"`);
  } catch (e) {
    // Handle case where files are staged but nothing to commit (e.g. whitespace only)
    console.log('No significant changes to commit.');
  }
  
  console.log('📤 Pushing to GitHub (origin main)...');
  execSync('git push origin main');
  
  console.log('✅ Production Sync Complete!');
} catch (error) {
  console.error('❌ Sync failed:', error.stderr?.toString() || error.message);
  process.exit(1);
}

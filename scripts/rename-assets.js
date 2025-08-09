import { readdirSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '../attached_assets');
const files = readdirSync(assetsDir);

// Rename files with spaces to use hyphens
files.forEach(file => {
  if (file.includes(' ')) {
    const newName = file.replace(/\s+/g, '-');
    const oldPath = join(assetsDir, file);
    const newPath = join(assetsDir, newName);
    
    try {
      renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${newName}`);
    } catch (err) {
      console.error(`Error renaming ${file}:`, err);
    }
  }
});

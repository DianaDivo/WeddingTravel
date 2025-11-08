import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = 'github-upload';

// Файлы и папки, которые НЕ нужно копировать
const EXCLUDE = [
  'node_modules',
  'dist',
  'build',
  '.env',
  '.env.local',
  'github-upload',
  'prepare-github.js',
  '.git',
  '.netlify',
  'package-lock.json',
  '.DS_Store',
  'Thumbs.db',
  '*.log'
];

// Проверка, нужно ли исключить файл/папку
function shouldExclude(itemPath) {
  const itemName = path.basename(itemPath);
  return EXCLUDE.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(itemName);
    }
    return itemName === pattern;
  });
}

// Рекурсивное копирование
function copyRecursive(src, dest) {
  if (shouldExclude(src)) {
    return;
  }

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    items.forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied: ${path.relative(__dirname, src)}`);
  }
}

// Основная функция
function prepareGitHubUpload() {
  console.log('🚀 Preparing files for GitHub upload...\n');

  // Удаляем старую папку если существует
  if (fs.existsSync(OUTPUT_DIR)) {
    console.log('🗑️  Removing old github-upload folder...');
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }

  // Создаём новую папку
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Копируем все файлы и папки (кроме исключений)
  const items = fs.readdirSync(__dirname);
  
  items.forEach(item => {
    const srcPath = path.join(__dirname, item);
    const destPath = path.join(__dirname, OUTPUT_DIR, item);
    
    if (!shouldExclude(srcPath)) {
      copyRecursive(srcPath, destPath);
    }
  });

  console.log('\n✅ Done! Files are ready in the "github-upload" folder');
  console.log('\n📋 Next steps:');
  console.log('1. Go to https://github.com/new and create a new repository');
  console.log('2. Name it "wedding-travel" (or any name you like)');
  console.log('3. Click "uploading an existing file"');
  console.log('4. Drag and drop ALL files from the "github-upload" folder');
  console.log('5. Click "Commit changes"\n');
  console.log('⚠️  Important: Upload ALL files and folders, not just the github-upload folder itself!\n');
}

prepareGitHubUpload();

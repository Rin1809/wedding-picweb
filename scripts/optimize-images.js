import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANH_DIR = path.resolve(__dirname, '../anh');
const BACKUP_DIR = path.resolve(__dirname, '../anh_originals');

if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

const files = fs.readdirSync(ANH_DIR).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`Found ${files.length} images to optimize.`);

async function optimizeImages() {
    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const filePath = path.join(ANH_DIR, file);
        const backupPath = path.join(BACKUP_DIR, file);

        try {
            // 1. Backup original
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(filePath, backupPath);
            }

            // 2. Optimization
            const imageBuffer = await sharp(backupPath)
                .resize(1920, 1080, { // Max width or height
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80, mozjpeg: true })
                .toBuffer();

            // 3. Overwrite original
            fs.writeFileSync(filePath, imageBuffer);

            const originalSize = fs.statSync(backupPath).size / 1024 / 1024;
            const newSize = fs.statSync(filePath).size / 1024 / 1024;

            console.log(`Optimized ${file}: ${originalSize.toFixed(2)}MB -> ${newSize.toFixed(2)}MB`);
            successCount++;
        } catch (error) {
            console.error(`Error optimizing ${file}:`, error);
            errorCount++;
        }
    }

    console.log('-----------------------------------');
    console.log(`Done! Success: ${successCount}, Errors: ${errorCount}`);
}

optimizeImages();

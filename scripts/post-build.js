const fs = require('fs/promises');
const path = require('path');
const deleteFolder = require('./delete-folder.js');

async function mergeFolders(sourceFolder, targetFolder) {
  try {
    await fs.access(sourceFolder);
    await fs.access(targetFolder);

    const sourceFiles = await fs.readdir(sourceFolder);
 
    for (const file of sourceFiles) {
      const sourceFilePath = path.join(sourceFolder, file);
      const targetFilePath = path.join(targetFolder, file);

      const stats = await fs.stat(sourceFilePath);

      if (stats.isFile()) {
        await fs.copyFile(sourceFilePath, targetFilePath);
      } else if (stats.isDirectory()) {
        try {
          await fs.access(targetFilePath);
        } catch (error) {
          await fs.mkdir(targetFilePath, { recursive: true });
        }
        await mergeFolders(sourceFilePath, targetFilePath);
      }
    }
    console.log('Merged!');

    await deleteFolder(sourceFolder);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
 
mergeFolders('./docs/browser', './docs');
 
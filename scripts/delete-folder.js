const fs = require('fs/promises');
 
async function deleteFolder(sourceFolder) {
  try {
    await fs.rm(sourceFolder, { recursive: true });
    console.log(`Folder ${sourceFolder} deleted!`);
  } catch (error) {
    console.error(`Error while deleting folder ${sourceFolder}: ${error}`);
  }
}

module.exports = deleteFolder;
const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith('backend\\index.ts') || name.endsWith('backend/index.ts')) {
         files.push(name);
      }
    }
  }
  return files;
}

const targetDir = path.join(process.cwd(), 'artifacts/modules/Home');
const files = getFiles(targetDir);
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('../../../../lib/db/src')) {
     content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/db\/src/g, '../../../../../lib/db/src');
     changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
}
console.log('Fixed paths in ' + count + ' backend files.');

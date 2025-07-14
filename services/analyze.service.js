import fs from 'fs/promises';
import path from 'path';

export async function analyzeRepoStructure(repoPath) {
  const result = {
    folders: [],
    folderContents: {},
    dependencies: [],
    scripts: [],
    readmeSnippet: '',
  };
  console.log(result);
  try {
    const entries = await fs.readdir(repoPath, { withFileTypes: true });
    result.folders = entries.filter(e => e.isDirectory()).map(d => d.name);

      for (const folder of result.folders) {
        const fullPath = path.join(repoPath, folder);
        try {
          const sub = await fs.readdir(fullPath);
          result.folderContents[folder] = sub.slice(0, 5); // max 5 entries
        } catch (err) {
          result.folderContents[folder] = [];
        }
      }

    console.log(result);
  } catch (err) {
    console.error('Failed to read repo folders:', err.message);
  }

  try {
    const packageJsonPath = path.join(repoPath, 'package.json');
    const pkgRaw = await fs.readFile(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(pkgRaw);
    result.dependencies = Object.keys(pkg.dependencies || {});
    result.scripts = Object.keys(pkg.scripts || {});
  } catch (err) {
    console.warn('No valid package.json found:', err.message);
  }

  try {
    const readmePath = path.join(repoPath, 'README.md');
    const readmeContent = await fs.readFile(readmePath, 'utf-8');
    result.readmeSnippet = readmeContent
      .split('\n')
      .filter(Boolean)
      .slice(0, 8)
      .join(' ')
      .trim();
  } catch (err) {
    console.warn('README not found:', err.message);
  }

  return result;
}

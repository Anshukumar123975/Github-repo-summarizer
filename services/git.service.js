import simpleGit from 'simple-git';

export async function cloneRepo(repoUrl, localPath) {
  const git = simpleGit();
  await git.clone(repoUrl, localPath);
}

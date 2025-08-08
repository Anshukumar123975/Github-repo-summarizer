import simpleGit from "simple-git"

export async function cloneRepository(repoUrl, clonePath){
    const git = simpleGit();
    await git.clone(repoUrl, clonePath);
}
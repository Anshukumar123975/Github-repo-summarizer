import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url';
import { cloneRepository } from './git.service.js';
import { globby } from 'globby'
import { encoding_for_model } from '@dqbd/tiktoken';
import { generateRepoSummary } from './summarize.service.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TOKEN_LIMIT = 28000;

const tokenizer = encoding_for_model('gpt-3.5-turbo');

function countTokens(text){
    return tokenizer.encode(text).length;
}

export const crawlRepo = async(repoUrl) => {
    let totaltokens=0;
    let tokens=0;
    let result=[];
    const repoName = repoUrl.split('/').pop().replace('.git', '');
    const clonePath = path.join(__dirname, '../temp', repoName);
    await cloneRepository(repoUrl, clonePath);
    let readmePath;
    if(await fs.pathExists(path.join(clonePath, 'README.md'))) {
      readmePath = path.join(clonePath, 'README.md');
    } 
    else if(await fs.pathExists(path.join(clonePath, 'Readme.md'))) {
      readmePath = path.join(clonePath, 'Readme.md');
    }
    let readme='';
    if(readmePath){
        readme = fs.readFileSync(readmePath, 'utf-8');
    }
    else{
        readme='No readme found'
    }
    if(readme){
        result.push(readme);
    }
    totaltokens+=countTokens(readme);
    const names = await globby(['**'], {
        cwd: clonePath,
        gitignore: true,
        onlyFiles: false,
        deep:4,
    });
    for(let n of names){
        tokens=countTokens(n);
        totaltokens+=tokens;
        if(totaltokens>TOKEN_LIMIT){
            break;
        }
        result.push(n);
    }
    const summary = await generateRepoSummary(result);
    setTimeout(()=>{
        fs.remove(clonePath);
    }, 3000);
    tokenizer.free();
    return summary;
}
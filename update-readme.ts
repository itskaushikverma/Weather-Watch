import { readFileSync, writeFileSync } from 'node:fs';
import https from 'node:https';
import type { IncomingMessage } from 'node:http';

interface PortfolioData {
  portfolio?: string;
  github?: string;
  linkedin?: string;
  x?: string;
}

function fetchURL(): Promise<PortfolioData> {
  return new Promise((resolve, reject) => {
    https
      .get('https://pget.vercel.app/', (res: IncomingMessage) => {
        let data = '';

        res.on('data', (chunk: Buffer | string) => {
          data += chunk.toString();
        });

        res.on('end', () => {
          let cleaned = data.trim();

          try {
            const parsed = JSON.parse(cleaned) as PortfolioData;
            resolve(parsed);
            return;
          } catch {
            // not JSON → continue
          }

          resolve({});
        });
      })
      .on('error', reject);
  });
}

async function main(): Promise<void> {
  try {
    const data = await fetchURL();
    const readme = readFileSync('README.md', 'utf-8');
    let updatedReadme = readme;

    updatedReadme = updatedReadme.replace(/\[Portfolio\]\(.*?\)/, `[Portfolio](${data.portfolio})`);
    updatedReadme = updatedReadme.replace(/\[GitHub\]\(.*?\)/, `[GitHub](${data.github})`);
    updatedReadme = updatedReadme.replace(/\[LinkedIn\]\(.*?\)/, `[LinkedIn](${data.linkedin})`);
    updatedReadme = updatedReadme.replace(/\[Twitter\]\(.*?\)/, `[Twitter](${data.x})`);

    writeFileSync('README.md', updatedReadme);
    console.log('Updated README with:', data);
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  }
}

void main();

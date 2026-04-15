import { readFileSync, writeFileSync } from "node:fs";
import https from "node:https";
import type { IncomingMessage } from "node:http";

function fetchURL(): Promise<string> {
    return new Promise((resolve, reject) => {
        https
            .get("https://pget.vercel.app/", (res: IncomingMessage) => {
                let data = "";

                res.on("data", (chunk: Buffer | string) => {
                    data += chunk.toString();
                });

                res.on("end", () => {
                    const trimmed = data.trim();

                    try {
                        const parsed = JSON.parse(trimmed) as { url?: string };
                        resolve(parsed.url ?? trimmed);
                    } catch {
                        resolve(trimmed);
                    }
                });
            })
            .on("error", reject);
    });
}

async function main(): Promise<void> {
    try {
        const url = await fetchURL();
        const readme = readFileSync("README.md", "utf-8");
        const updatedReadme = readme.replace(/\[Portfolio\]\(.*?\)/, `[Portfolio](${url})`);

        writeFileSync("README.md", updatedReadme);
        console.log("Updated README with:", url);
    } catch (err) {
        console.error("Error:", err);
        process.exitCode = 1;
    }
}

void main();
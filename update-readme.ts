const fs = require("fs");
const https = require("https");
import type { IncomingMessage } from "http";

function fetchURL(): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get("https://pget.vercel.app/", (res: IncomingMessage) => {
            let data = "";

            res.on("data", (chunk: Buffer | string) => {
                data += chunk.toString();
            });
            res.on("end", () => {
                const trimmed = data.trim();

                try {
                    const parsed = JSON.parse(trimmed);
                    resolve(parsed?.url ?? trimmed);
                } catch {
                    resolve(trimmed);
                }
            });
        }).on("error", reject);
    });
}

(async () => {
    try {
        const url = await fetchURL();

        let readme = fs.readFileSync("README.md", "utf-8");

        readme = readme.replace(
            /\[Portfolio\]\(.*?\)/,
            `[Portfolio](${url})`
        );

        fs.writeFileSync("README.md", readme);

        console.log("Updated README with:", url);
    } catch (err) {
        console.error("Error:", err);
    }
})();
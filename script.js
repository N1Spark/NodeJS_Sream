import path from "node:path";
import fs, { read, write } from "node:fs"
import { Transform } from "node:stream";
import { log } from "node:console";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "data.txt");

//task_1
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });
readStream.on("data", (chunk) => {
    const chars = chunk.split('');
    chars.forEach((char, index) => {
        setTimeout(() => {
            process.stdout.write(char);
        }, index * 100);
    });
});

//task2
const upperCase = new Transform({
    transform(chunk) {
        this.push(chunk.toString().toUpperCase());
    }
});
readStream
    .pipe(upperCase)
    .on('data', (chunk) => {
        log(chunk.toString());
    });
const yargs = require("yargs")
  .alias("a", "action")
  .alias("s", "shift")
  .alias("i", "input")
  .alias("o", "output")
  .demand(["a", "s"], "--action and --shift are required arguments").argv;
const fs = require("fs");
const { Transform } = require("stream");
const commands = require("./commands");

let action = yargs.action;
let shift = yargs.shift;
let input = yargs.input;
let output = yargs.output;

if (!input) {
  process.stdout.write(
    `Please enter string for encoding/decoding or Ctrl + C for exit`
  );
  process.stdout.write("\n> ");
  process.stdin.on("data", (data) => {
    let stringifiedData = data.toString();
    process.stdout.write(commands.applyAction(shift, stringifiedData, action));
  });
}

const transform = new Transform({
  transform(chunk, encoding, callback) {
    let chunkString = chunk.toString();
    let transformed = commands.applyAction(shift, chunkString, action);
    callback(null, transformed);
  },
});

if (input) {
  fs.createReadStream(input)
    .pipe(transform)
    .pipe(fs.createWriteStream(output))
    .on("finish", () => {
      if (action === "encode") {
        return console.log("Encryption done!");
      }
      if (action === "decode") {
        return console.log("Decryption done!");
      }
    });
}

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
// let output = yargs.output;

const transform = new Transform({
  transform(chunk, encoding, callback) {
    let chunkString = chunk.toString();
    if (action === "encode") {
      let encoded = commands.encode(shift, chunkString);
      callback(null, encoded);
    } else if (action === "decode") {
      let decoded = commands.decode(shift, chunkString);
      callback(null, decoded);
    }
  },
});

fs.createReadStream(input)
  .pipe(transform)
  .pipe(fs.createWriteStream("output.txt"))
  .on("finish", () => console.log("Done"));

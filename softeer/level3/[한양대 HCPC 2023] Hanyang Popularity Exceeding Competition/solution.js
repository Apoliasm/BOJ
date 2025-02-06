const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(
    line
      .trim()
      .split(" ")
      .map((element) => parseInt(element, 10))
  );
}).on("close", () => {
  let n = input[0][0];
  let popularity = 0;
  let people = [...input.slice(1, n + 1)];
  people.forEach((person, index) => {
    let [p, c] = people[index];
    let absPX = p - popularity >= 0 ? p - popularity : popularity - p;
    if (absPX <= c) {
      popularity += 1;
    }
  });
  console.log(popularity);
  process.exit(0);
});

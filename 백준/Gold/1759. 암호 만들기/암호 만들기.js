const { read } = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const vowels = ["a", "e", "o", "i", "u"];
class Char {
  constructor(value) {
    this.value = value;
    this.vowel = vowels.includes(value);
  }
}

let l = 0;
let c = 0;
let lineCount = 0;
let chars = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [l, c] = line
        .trim()
        .split(" ")
        .map((num) => Number(num));
      lineCount += 1;
    } else {
      chars = line
        .trim()
        .split(" ")
        .sort()
        .map((char) => {
          return new Char(char);
        });
      readline.close();
    }
  })
  .on("close", () => {
    const visited = Array.from({ length: c }).map((element) => {
      return false;
    });
    dfs(0, 0, 0, 0);

    function dfs(charIndex, depth, consonant, vowel) {
      if (depth < l) {
        for (let currentIndex = charIndex; currentIndex < c; currentIndex++) {
          if (visited[currentIndex] === false) {
            visited[currentIndex] = true;
            if (chars[currentIndex].vowel) {
              dfs(currentIndex + 1, depth + 1, consonant, vowel + 1);
            } else {
              dfs(currentIndex + 1, depth + 1, consonant + 1, vowel);
            }
            visited[currentIndex] = false;
          }
        }
      } else {
        if (consonant >= 2 && vowel >= 1) {
          console.log(
            chars
              .filter((_, filterIndex) => {
                return visited[filterIndex] === true;
              })
              .map((charObj) => {
                return charObj.value;
              })
              .join("")
          );
        }
      }
    }
  });

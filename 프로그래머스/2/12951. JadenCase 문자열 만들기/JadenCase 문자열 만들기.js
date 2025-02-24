function solution(s) {
    const altered = s.replace(/[A-Z]/g,(substr) => substr.toLowerCase())
    .replace(/(^| )[a-z]/g,substr => substr.toUpperCase())
    return altered;
}
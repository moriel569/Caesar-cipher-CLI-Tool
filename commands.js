const encode = (shift, text) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text[i].charCodeAt();

    if (charCode > 96 && charCode < 123) {
      charCode += shift % 26;
      if (charCode > 122) {
        charCode = charCode - 122 + 96;
      } else if (charCode < 97) {
        charCode = charCode - 97 + 123;
      }
    }

    if (charCode > 64 && charCode < 91) {
      charCode += shift % 26;
      if (charCode > 90) {
        charCode = charCode - 90 + 64;
      } else if (charCode < 65) {
        charCode = charCode - 65 + 91;
      }
    }
    result += String.fromCharCode(charCode);
  }

  return result;
};

const decode = (shift, text) => {
  console.log(shift, text);
};

module.exports = {
  encode,
  decode,
};

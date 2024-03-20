function generate(num) {
    const genset = "abcdefghijklmnopqrstuvwxyz!@#$%";
    let result=''
    for (let x=0; x<num;x++) {
        result = result.concat(genset[Math.floor(Math.random()*genset.length-1)]);
    }
    result = result.concat("---");
    result = result.concat(Math.floor(+new Date() / 1000));
    return result;
}

module.exports = { generate }
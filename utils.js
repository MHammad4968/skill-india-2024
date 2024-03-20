function generate(num) {
    const genset = "abcdefghijklmnopqrstuvwxyz!@#$%&";
    let result=''
    for (let x=0; x<num;x++) {
        result = result.concat(genset[Math.floor(Math.random()*(genset.length-1))]);
    }
    result = result.concat("---");
    result = result.concat(Math.floor(+new Date() / 1000));
    return result;
}
function prettyTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
}

module.exports = { generate, prettyTime }
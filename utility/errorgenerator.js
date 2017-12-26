function errorgenerator(error) {
    var arr = []
    for (key in error) {
        arr.push(error[key].properties)
    }
    return arr
}
module.exports = { errorgenerator }
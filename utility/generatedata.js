function generatedata(data) {
  if (Array.isArray(data)) {
    console.log("dqaqaww")
    return data
  }
  var arr = []
  arr.push(data)
  return arr
}
module.exports = { generatedata }
module.exports = function (str) {
  const argv = process.argv
  const result = argv.find(item => item.startsWith(str))
  if (result) {
    return result.split('=')[1]
  }
  return null
}

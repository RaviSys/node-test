module.exports = (options) => {
  return (req, res, next) => {
    console.log(options)
    next()
  }
}

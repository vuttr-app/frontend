module.exports = (request, response, next) => {
  const content = require('./custom-responses.js')
  if (!content(request, response)) {
    next()
  }
}

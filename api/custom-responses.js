module.exports = function (request, response) {
  if (request.originalUrl === '/api/tools?id=1') {
    response.status(204)
    response.end()
    return true
  }
  return false
}


const { request } = require('@vue/cli-shared-utils')

module.exports = async function getUsers () {
  let result
  try {
    result = await request.get('https://controlla.com.mx/developers.json')
  } catch (e) {
    return e
  }
  return result
}

const { request } = require('@vue/cli-shared-utils')

module.exports = async function getUsers () {
  let result
  try {
    result = await request.get('https://gist.githubusercontent.com/IvanSotelo/eae8471afc971edb621583b5ef3a8ec7/raw/664bb916326f59480e32bfa146c3b80e26a7e44a/developers.json')
  } catch (e) {
    return e
  }
  return result
}

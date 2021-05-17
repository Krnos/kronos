// fetch the latest version and save it on disk
// so that it is available immediately next time
module.exports = async function checkHasPermissions (gitUser) {
  const getUsers = require('./getUsers')
  const res = await getUsers()
  if (res.statusCode === 200) {
    const { developers } = res.body
    if (developers.includes(gitUser)) {
      return true
    }
  }
  return false
}

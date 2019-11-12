const getVersions = require('../packages/kronos-get-versions/getVersions')
const generate = require('../packages/kronos-generate/generate')

var kronos = {}
kronos.generate = generate
kronos.getVersions = getVersions

module.exports = kronos

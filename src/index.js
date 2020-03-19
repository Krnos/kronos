const getVersions = require('../packages/kronos-get-versions/getVersions')
const generate = require('../packages/kronos-generate/generate')
const generateModel = require('../packages/kronos-generate-model/generateModel')

var kronos = {}
kronos.generate = generate
kronos.getVersions = getVersions
kronos.generateModel = generateModel

module.exports = kronos

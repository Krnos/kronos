const getVersions = require('../packages/kronos-get-versions/getVersions')
const generate = require('../packages/kronos-generate/generate')
const generateModel = require('../packages/kronos-generate-model/generateModel')
const checkHasPermissions = require('../packages/kronos-check-has-permissions/checkHasPermissions')

var kronos = {}
kronos.generate = generate
kronos.getVersions = getVersions
kronos.generateModel = generateModel
kronos.checkHasPermissions = checkHasPermissions

module.exports = kronos

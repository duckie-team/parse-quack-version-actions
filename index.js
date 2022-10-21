const core = require('@actions/core')
const fs = require('fs')

try {
  const path = core.getInput('path')
  fs.readFile(path, 'utf8', (error, version) => {
    if (error) {
      core.setFailed(error.message)
      return
    }
    if (version === null) {
      core.setFailed('No version found')
    } else {
      let versions = version.split('\n').map(line => line.split('=')[1])
      versions.length = 3 // fix `x.y.z` format
      core.setOutput('version', versions.join('.'))
    }
  })
} catch (error) {
  core.setFailed(error.message)
}

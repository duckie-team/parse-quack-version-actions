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
      const versions = version.split('\n').map(line => line.split('=')[1])
      if (versions[3] !== undefined) versions.pop()
      core.setOutput('version', versions.join('.'))
    }
  })
} catch (error) {
  core.setFailed(error.message)
}

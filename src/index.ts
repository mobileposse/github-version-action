import * as core from '@actions/core'
import * as github from '@actions/github'
import * as semver from 'semver'

async function run() {
  try {
    const token = core.getInput('repo_token', { required: true })
    const majorVersion = core.getInput('major_version', { required: true })
    const client = new github.GitHub(token)

    core.info('Getting current version number from Github tags')
    const version = await getVersion(client, majorVersion)
    core.setOutput('new_version', version)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

const getVersion = async (client: github.GitHub, majorVersion: string) => {
  const tagsResponse = await client.repos.listTags({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    per_page: 100
  })

  const tags = tagsResponse.data.map(t => t.name)

  for (const tag of tags) {
    console.log(`checking tag: ${tag}`)
    const version = semver.coerce(tag)
    if (version && semver.valid(version)) {
      if (version.major.toString() === majorVersion) {
        const newVersion = semver.inc(version, 'patch') || '0.0.0'
        return `${semver.major(newVersion)}.${semver.minor(newVersion)}.${semver.patch(newVersion)}`
      }
    }
  }

  throw new Error('Unable to locate a semver compliant tag')
}

run()

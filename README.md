# Github Version Action

This action scans the repository tags and grabs the latest semver compliant tag. The minor build number is then incremented and returned as an output.

## Inputs

### `repo_token`

**Required** Github token to use for creating the release

## Outputs

### `new_version`

The time we greeted you.

## Example usage

```yaml
uses: mobileposse/github-release-action@v1
with:
  repo_token: ${{ secrets.GITHUB_TOKEN }}
```

## Publishing

Compile a version of `index.js` that includes all dependencies

```
npx ncc build dist/index.js -o lib
```

## Local Testing

```
INPUT_REPO_TOKEN='your token here' GITHUB_REPOSITORY='org/repo' node lib/index.js
```

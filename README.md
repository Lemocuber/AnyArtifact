[![Human Generated Badge](https://img.shields.io/badge/license-human_generated-229028?style=for-the-badge)](https://github.com/Lemocuber/HumanGeneratedLicense)

# AnyArtifact

Download Github Action Artifacts, anywhere straight through a plain URL  
Powered by Cloudflare Workers

## Usage

Deploy the project, then 
```
For a index of artifacts
- https://your-domain/repo-username/repo-name

Plus query strings, e.g. index of latest successful build on specific branch
- https://your-domain/repo-username/repo-name/?branch=branch-name&status=completed

For a certain artifact
- https://your-domain/repo-username/repo-name/artifact-name
```

It's easy as that!
  
Intentionally fixed at the latest workflow run,   
Fork your own version if need alternate behavior.

## Deployment

- Create new Cloudflare Worker (start with Hello World)
- Click edit code and paste `worker.js` content inside then hit deploy
- Navigate to settings and set environment variable `TOKEN` = your [Github Token](https://github.com/settings/tokens)
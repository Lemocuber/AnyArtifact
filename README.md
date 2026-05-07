[![Human Generated Badge](https://img.shields.io/badge/license-human_generated-229028?style=for-the-badge)](https://github.com/Lemocuber/HumanGeneratedLicense)

# AnyArtifact

Download Github Action Artifacts, anywhere straight through a plain URL  
Powered by Cloudflare Workers

## Usage

Deploy the project, then 
```
For a index of artifacts
- https://your-domain/repo-username/repo-name

For a certain artifact
- https://your-domain/repo-username/repo-name/artiface-name
```

It's easy as that!
  
Intentionally fixed at the latest workflow run,   
Fork your own version if need alternate behavior.

## Deployment

- Create new Cloudflare Worker (start with Hello World)
- Click edit code and paste `worker.js` content inside then hit deploy
- Navigate to settings and set environment variable `TOKEN` = your [Github Token](https://github.com/settings/tokens)
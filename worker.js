
/*
 * AnyArtifact by Lemocuber
 * https://github.com/Lemocuber/AnyArtifact
 */

export default {
  async fetch(request, env, ctx) {
    const AUTH = { 'Authorization': `Bearer ${env.TOKEN}`, 'User-Agent': 'AnyArtifact (https://github.com/Lemocuber/AnyArtifact) / Cloudflare Worker' };
    const HTML = { 'Content-Type': 'text/html; charset=utf-8' };

    try {
      const worker = new URL(request.url).origin;
      const path = new URL(request.url).pathname.replace(/\/$/, '');
      const [_, re, po, item] = path.match(/^\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
      const artifacts = await getArtifacts(`${re}/${po}`, AUTH);

      if (item in artifacts) {
        const res = await fetch(artifacts[item], { headers: AUTH });
        const headers = new Headers(res.headers);
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        return new Response(res.body, { status: res.status, headers });
      }

      return new Response(
        `<html><body>${Object.keys(artifacts).map(name => (
          `<a href="${worker}/${re}/${po}/${name}">${name}</a>`
        )).join('<br/>')}</body></html>`,
        { status: 200, headers: HTML }
      );
    }
    catch {
      return new Response("I'm a Teapot", { status: 418 });
    }
  }
}

async function getArtifacts(repo, AUTH) {
  const run = (await (
    await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=1`, { headers: AUTH } )
  ).json())['workflow_runs']?.[0];

  if (!run) return {};

  const artifacts = (await (
    await fetch(run.artifacts_url, { headers: AUTH } )
  ).json())['artifacts'];

  return Object.fromEntries((artifacts || []).map(
    ({ name, archive_download_url }) => [name, archive_download_url]
  ));
}


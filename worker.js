
/*
 * AnyArtifact by Lemocuber
 * https://github.com/Lemocuber/AnyArtifact
 */

export default {
  async fetch(request, env, ctx) {
    const AUTH = { 'Authorization': `Bearer ${env.TOKEN}`, 'User-Agent': 'AnyArtifact/1.0.2 (https://github.com/Lemocuber/AnyArtifact)' };
    const HTML = { 'Content-Type': 'text/html; charset=utf-8' };

    try {
      const worker = new URL(request.url).origin;
      const url = new URL(request.url);
      const path = url.pathname.replace(/\/$/, '');
      const [_, re, po, item] = path.match(/^\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
      const query = url.search.replace(/^\?/, '');
      const { title, artifacts } = await getArtifacts(`${re}/${po}`, query, AUTH);

      if (item in artifacts) {
        return await grabDownload(artifacts[item], AUTH);
      }

      return new Response(
        `<html><body><strong>${title}</strong><br/>${Object.keys(artifacts).map(name => (
          `<a href="${worker}/${re}/${po}/${name}${query&&'/?'}${query}">${name}</a>`
        )).join('<br/>')}</body></html>`,
        { status: 200, headers: HTML }
      );
    }
    
    catch {
      return new Response("I'm a Teapot", { status: 418 });
    }
  }
}

async function getArtifacts(repo, query, AUTH) {
  const run = (await (
    await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=1&${query}`, { headers: AUTH } )
  ).json())['workflow_runs']?.[0];

  if (!run) return {};

  const artifacts = (await (
    await fetch(run.artifacts_url, { headers: AUTH } )
  ).json())['artifacts'];

  return { 
    title: run['display_title'],
    artifacts: Object.fromEntries((artifacts || []).map(
      ({ name, archive_download_url }) => [name, archive_download_url]
    ))
  };
}

async function grabDownload(url, AUTH) {
  const res = await fetch(url, { headers: AUTH });
  const headers = new Headers(res.headers);
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  return new Response(res.body, { status: res.status, headers });
}
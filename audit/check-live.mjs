import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const origin = 'https://devisahaicharandass.com';
const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const routes = [...app.matchAll(/<Route path="([^"]+)"/g)].map(m => m[1]).filter(p => p !== '*');
const agents = ['Mozilla/5.0', 'Googlebot', 'bingbot', 'GPTBot', 'ClaudeBot', 'PerplexityBot'];
async function request(path, agent) {
  const response = await fetch(origin + path, { headers: { 'User-Agent': agent }, signal: AbortSignal.timeout(20000) });
  const body = await response.text();
  return { checkedAt: new Date().toISOString(), path, userAgent: agent, status: response.status, url: response.url,
    headers: Object.fromEntries(response.headers), bytes: Buffer.byteLength(body),
    sha256: createHash('sha256').update(body).digest('hex'), bodyPreview: body.slice(0, 220), body };
}
const results = [];
const tasks = [...routes.map(path => [path, agents[0]]),
  ...['/robots.txt', '/sitemap.xml', '/wp-sitemap.xml', '/fixed-removable-prosthesis/'].map(path => [path, agents[0]]),
  ...agents.slice(1).flatMap(agent => ['/', '/about', '/products/pet', '/robots.txt'].map(path => [path, agent]))];
for (let i = 0; i < tasks.length; i += 4) {
  results.push(...await Promise.all(tasks.slice(i, i + 4).map(async ([path, agent]) => {
    try { return await request(path, agent); } catch (error) { return { path, userAgent: agent, error: error.message }; }
  })));
}
const home = results.find(r => r.path === '/' && r.body);
const bundlePath = home.body.match(/src="([^\"]+\.js)"/)?.[1];
if (bundlePath) {
  const bundle = await request(bundlePath, agents[0]);
  await writeFile(new URL('./live-bundle.txt', import.meta.url), bundle.body);
}
await writeFile(new URL('./http-observations.json', import.meta.url), JSON.stringify(results.map(({body, ...r}) => r), null, 2));
for (const result of results.filter(r => ['/robots.txt', '/sitemap.xml', '/wp-sitemap.xml'].includes(r.path) && r.userAgent === agents[0])) {
  await writeFile(new URL('./' + result.path.slice(1) + '.response.txt', import.meta.url), result.body || result.error);
}
console.log(results.map(r => `${r.status || 'ERROR'} ${r.userAgent} ${r.path} ${r.bytes || ''}`).join('\n'));

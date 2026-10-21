// Orquestrador: junta os módulos de conteúdo e escreve src/content-pages/*. Rode: npm run content
import fs from 'node:fs';
import path from 'node:path';
import { writePage, finish, pagesDir } from './lib.mjs';
import { OG } from './schema.mjs';
import { PAGES as BASE } from './pages-base.mjs';
import { home, servicos } from './home.mjs';
import { ia } from './agencyai.mjs';
import { SERVICE_PAGES } from './services-extra.mjs';
import { INSTITUTIONAL } from './institutional.mjs';
import { BLOG } from './blog.mjs';

const ALL = [home, servicos, ia, ...SERVICE_PAGES, ...INSTITUTIONAL, ...BLOG, ...BASE];
// páginas geradas antes e que não existem mais saem junto (o gerador é a fonte da verdade)
const keep = new Set(ALL.map((p) => (p.path === '/' ? '_home' : p.path.replace(/^\/|\/$/g, '').replace(/\//g, '__'))));
for (const d of fs.readdirSync(pagesDir)) if (!keep.has(d)) fs.rmSync(path.join(pagesDir, d), { recursive: true, force: true });
for (const p of ALL) { p.image = p.image || OG(p.og); writePage(p); }
finish();

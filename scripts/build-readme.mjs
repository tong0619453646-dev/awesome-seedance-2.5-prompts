// Builds README.md, README_zh-CN.md, README_zh-TW.md and README_ko.md (and, for large
// collections, one page per category under prompts/) from data/.
// Usage: node scripts/build-readme.mjs
//
// data/library.json  cards, featured ids and page copy, exported from the APIKO prompt library page
// data/repo.json     this repository: name, model, quick-start request, sibling repositories
// data/videos.json   optional: file name -> github.com/user-attachments URL (only those videos play inside a README)
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const { config, featured, page, cards } = read('data/library.json');
const repo = read('data/repo.json');
const videos = existsSync(new URL('data/videos.json', root)) ? read('data/videos.json') : {};
// Videos cut to their first minutes to fit GitHub's 10 MB attachment limit.
const trimmed = new Set(repo.trimmed ?? []);
const gifs = new Set(existsSync(new URL('assets/gif', root)) ? (repo.gifs ?? []) : []);

const SITE = 'https://apiko.app';
const MEDIA = `https://media.apiko.app/prompts/${config.slug}/`;
const REPO = repo.name;
const OWNER = 'tong0619453646-dev';
const ORDER = ['en', 'zh', 'zh-TW', 'ko'];
const EMOJI = {
  cinematic: '🎬', documentary: '📹', action: '🥊', animation: '🧸', dialogue: '💬', product: '👟', 'long-form': '⏱️', reference: '🖼️',
  'gif-animation': '🔁', 'characters-stickers': '🧩', 'image-editing': '✏️', 'posters-typography': '🔤', 'portrait-photography': '📷',
  'illustration-3d': '🎨', 'infographics-ui': '📊', 'product-food': '🍱', 'scenes-places': '🏙️', 'product-ecommerce': '🛍️',
  'illustration-art': '🎨', 'scenes-illustration': '🏞️', 'poster-branding': '🪧', 'product-ads': '📣', 'ui-web': '🖥️', infographics: '📊',
  'ad-creative': '📣', character: '🧩', ecommerce: '🛍️', portrait: '📷', poster: '🪧', ui: '🖥️', comparison: '🆚',
  'motion-graphics': '✨', 'product-launch': '🚀', explainer: '🧑‍🏫', 'storyboard-to-video': '🗂️', 'music-video': '🎵', 'short-film': '🎞️',
  '3d-blender': '🧊', 'video-editing': '✂️',
};

const LOCALES = {
  en: {
    file: 'README.md', suffix: '', prefix: '', docsPrefix: '', badge: ['🇺🇸 English', 'Default'],
    title: (h1) => `Awesome ${h1}`,
    playsHere: { video: 'Every result video plays right here on GitHub.', gif: 'The GIF results loop right here on GitHub.', image: '' },
    browse: 'Search and filter them on',
    note: "Each prompt is kept exactly as its author posted it, so most are in English; titles and descriptions are ours. Every case credits the author and links to the original post.",
    h: { intro: 'Introduction', quick: 'Quick start', write: (t) => t, menu: 'Menu', featured: 'Featured', faq: 'FAQ', related: 'Related', license: 'License and credits' },
    quickBrowser: (link) => `**In the browser:** every case has a **Run on APIKO** link. It opens the example on ${link}; press **Use** there to load the prompt into the ${config.modelLabel} playground.`,
    quickApi: { video: (key) => `**With the API:** create an ${key}, then create a task and poll it until the video is ready.`, image: (key) => `**With the API:** create an ${key}, then create an async task and poll it until the image is ready.`, text: (key) => `**With the API:** create an ${key} and send the prompt to the Messages API. Claude replies with code; run it on your machine to render the video.` },
    apiKey: 'APIKO API key',
    endpoints: 'Endpoints',
    ep: { create: 'create a task', poll: 'read the status and result', messages: 'send a prompt' },
    cases: (n) => `${n} cases`,
    run: 'Run on APIKO', source: 'Original post', by: 'by', output: 'Result', prompt: 'Prompt', method: 'How it was made (no prompt was shared)',
    needsRef: { video: 'Upload your own reference image or clip for this one.', image: 'Upload your own reference image for this one.', text: '' },
    sec: 's',
    openCategory: (name, n) => `All ${n} ${name} cases`,
    trimmed: 'First 4 minutes only; the full video is on',
    backToTop: 'Back to the README', pages: 'Pages', next: 'Next page',
    categoryPage: (n) => `${n} cases on this page. The prompts are not translated.`,
    sameAs: 'The same collection in other languages',
    otherRepos: 'More prompt collections',
    examples: 'Code examples for the APIKO API',
    license: (credit, notices) => `${credit} Titles, descriptions, translations and the build scripts are released under [CC BY 4.0](LICENSE).${notices ? ' Licenses of the source repositories: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).' : ''}`,
    star: 'If this list saves you time, a ⭐ helps others find it.',
  },
  zh: {
    file: 'README_zh-CN.md', suffix: '_zh-CN', prefix: '/zh', docsPrefix: '/zh', badge: ['🇨🇳 简体中文', '查看'],
    title: (h1) => `Awesome ${h1}`,
    playsHere: { video: '所有成片都能在 GitHub 页面上直接播放。', gif: 'GIF 成品在 GitHub 页面上直接循环播放。', image: '' },
    browse: '在线搜索和筛选：',
    note: '提示词保持作者发布时的原文，所以大多是英文；标题和简介是我们写的。每条都署名作者并链接原帖。',
    h: { intro: '简介', quick: '快速开始', write: (t) => t, menu: '目录', featured: '精选', faq: '常见问题', related: '相关链接', license: '许可与出处' },
    quickBrowser: (link) => `**网页上用：** 每条都有「在 APIKO 运行」链接，会在 ${link} 打开这条示例；点「使用」，提示词就会填进 ${config.modelLabel} 试用台。`,
    quickApi: { video: (key) => `**用 API：** 先创建 ${key}，再创建任务并轮询，直到视频生成完成。`, image: (key) => `**用 API：** 先创建 ${key}，再创建异步任务并轮询，直到图片生成完成。`, text: (key) => `**用 API：** 先创建 ${key}，把提示词发到 Messages API。Claude 返回代码，在你的电脑上运行它来渲染视频。` },
    apiKey: 'APIKO API Key',
    endpoints: '接口',
    ep: { create: '创建任务', poll: '查询状态和结果', messages: '发送提示词' },
    cases: (n) => `${n} 条`,
    run: '在 APIKO 运行', source: '原帖', by: '作者', output: '效果', prompt: '提示词', method: '做法（作者没有公开提示词）',
    needsRef: { video: '这条需要你自己上传参考图或参考视频。', image: '这条需要你自己上传参考图。', text: '' },
    sec: ' 秒',
    openCategory: (name, n) => `查看「${name}」全部 ${n} 条`,
    trimmed: '这里只放前 4 分钟，完整视频见',
    backToTop: '返回 README', pages: '分页', next: '下一页',
    categoryPage: (n) => `本页共 ${n} 条。提示词保持原文，未翻译。`,
    sameAs: '其他语言版本',
    otherRepos: '更多提示词合集',
    examples: 'APIKO API 代码示例',
    license: (credit, notices) => `${credit}标题、简介、译文和生成脚本采用 [CC BY 4.0](LICENSE) 许可。${notices ? '来源仓库的许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。' : ''}`,
    star: '如果这份合集帮你省了时间，点个 ⭐ 能让更多人看到。',
  },
  'zh-TW': {
    file: 'README_zh-TW.md', suffix: '_zh-TW', prefix: '/zh-tw', docsPrefix: '/zh-tw', badge: ['🇹🇼 繁體中文', '查看'],
    title: (h1) => `Awesome ${h1}`,
    playsHere: { video: '所有成品影片都能在 GitHub 頁面上直接播放。', gif: 'GIF 成品在 GitHub 頁面上直接循環播放。', image: '' },
    browse: '線上搜尋與篩選：',
    note: '提示詞保持作者發布時的原文，所以大多是英文；標題與簡介由我們撰寫。每則都署名作者並連結原帖。',
    h: { intro: '簡介', quick: '快速開始', write: (t) => t, menu: '目錄', featured: '精選', faq: '常見問題', related: '相關連結', license: '授權與出處' },
    quickBrowser: (link) => `**網頁上用：** 每則都有「在 APIKO 執行」連結，會在 ${link} 開啟這則範例；點「使用」，提示詞就會填進 ${config.modelLabel} 試用台。`,
    quickApi: { video: (key) => `**用 API：** 先建立 ${key}，再建立任務並輪詢，直到影片生成完成。`, image: (key) => `**用 API：** 先建立 ${key}，再建立非同步任務並輪詢，直到圖片生成完成。`, text: (key) => `**用 API：** 先建立 ${key}，把提示詞送到 Messages API。Claude 回傳程式碼，在你的電腦上執行它來算出影片。` },
    apiKey: 'APIKO API 金鑰',
    endpoints: '介面',
    ep: { create: '建立任務', poll: '查詢狀態與結果', messages: '送出提示詞' },
    cases: (n) => `${n} 則`,
    run: '在 APIKO 執行', source: '原帖', by: '作者', output: '成品', prompt: '提示詞', method: '做法（作者沒有公開提示詞）',
    needsRef: { video: '這則需要你自己上傳參考圖或參考影片。', image: '這則需要你自己上傳參考圖。', text: '' },
    sec: ' 秒',
    openCategory: (name, n) => `查看「${name}」全部 ${n} 則`,
    trimmed: '這裡只放前 4 分鐘，完整影片見',
    backToTop: '回到 README', pages: '分頁', next: '下一頁',
    categoryPage: (n) => `本頁共 ${n} 則。提示詞保持原文，未翻譯。`,
    sameAs: '其他語言版本',
    otherRepos: '更多提示詞合集',
    examples: 'APIKO API 程式碼範例',
    license: (credit, notices) => `${credit}標題、簡介、譯文與生成腳本採用 [CC BY 4.0](LICENSE) 授權。${notices ? '來源倉庫的授權條款見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。' : ''}`,
    star: '如果這份合集幫你省了時間，按個 ⭐ 能讓更多人看到。',
  },
  ko: {
    file: 'README_ko.md', suffix: '_ko', prefix: '/ko', docsPrefix: '', badge: ['🇰🇷 한국어', '보기'],
    title: (h1) => `Awesome ${h1}`,
    playsHere: { video: '결과 영상은 모두 GitHub에서 바로 재생됩니다.', gif: 'GIF 결과물은 GitHub에서 바로 반복 재생됩니다.', image: '' },
    browse: '검색과 필터는',
    note: '프롬프트는 작성자가 올린 원문 그대로라 대부분 영어입니다. 제목과 설명은 저희가 썼습니다. 모든 예시에 작성자와 원본 게시물 링크를 달았습니다.',
    h: { intro: '소개', quick: '빠른 시작', write: (t) => t, menu: '목차', featured: '추천', faq: '자주 묻는 질문', related: '관련 링크', license: '라이선스와 출처' },
    quickBrowser: (link) => `**브라우저에서:** 모든 예시에 **APIKO에서 실행** 링크가 있습니다. ${link}에서 해당 예시가 열리며, **사용**을 누르면 프롬프트가 ${config.modelLabel} 플레이그라운드에 채워집니다.`,
    quickApi: { video: (key) => `**API로:** ${key}를 만든 뒤 작업을 생성하고, 영상이 완성될 때까지 상태를 조회합니다.`, image: (key) => `**API로:** ${key}를 만든 뒤 비동기 작업을 생성하고, 이미지가 완성될 때까지 상태를 조회합니다.`, text: (key) => `**API로:** ${key}를 만든 뒤 프롬프트를 Messages API로 보냅니다. Claude가 코드를 돌려주면, 그 코드를 내 컴퓨터에서 실행해 영상을 만듭니다.` },
    apiKey: 'APIKO API 키',
    endpoints: '엔드포인트',
    ep: { create: '작업 생성', poll: '상태와 결과 조회', messages: '프롬프트 전송' },
    cases: (n) => `${n}개`,
    run: 'APIKO에서 실행', source: '원본 게시물', by: '작성자', output: '결과', prompt: '프롬프트', method: '만든 방법(작성자가 프롬프트를 공개하지 않음)',
    needsRef: { video: '이 예시는 참조 이미지나 영상을 직접 올려야 합니다.', image: '이 예시는 참조 이미지를 직접 올려야 합니다.', text: '' },
    sec: '초',
    openCategory: (name, n) => `${name} 전체 ${n}개 보기`,
    trimmed: '앞 4분만 담았습니다. 전체 영상:',
    backToTop: 'README로 돌아가기', pages: '페이지', next: '다음 페이지',
    categoryPage: (n) => `이 페이지에 ${n}개가 있습니다. 프롬프트는 번역하지 않은 원문입니다.`,
    sameAs: '다른 언어',
    otherRepos: '다른 프롬프트 모음',
    examples: 'APIKO API 코드 예시',
    license: (credit, notices) => `${credit} 제목, 설명, 번역, 빌드 스크립트는 [CC BY 4.0](LICENSE)으로 배포합니다.${notices ? ' 출처 저장소의 라이선스는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 있습니다.' : ''}`,
    star: '이 목록이 도움이 됐다면 ⭐ 를 눌러 다른 사람도 찾을 수 있게 해 주세요.',
  },
};

const fill = (text, n) => String(text).replaceAll('{n}', String(n));
const utm = (medium, content) => `utm_source=github&utm_medium=${medium}&utm_campaign=${REPO}${content ? `&utm_content=${encodeURIComponent(content)}` : ''}`;
const isDocs = (path) => path.startsWith('/docs');
// shields.io static badge: "-" and "_" must be doubled, spaces become "_".
const shield = (label, message, color) => `https://img.shields.io/badge/${[label, message].map((s) => encodeURIComponent(s.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_'))).join('-')}-${color}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Markdown link text: keep brackets from closing the link early.
const linkText = (s) => String(s).replace(/([\[\]])/g, '\\$1');

function fence(text) {
  const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map((m) => m[0].length));
  const f = '`'.repeat(longest + 1);
  return `${f}text\n${text}\n${f}`;
}

const byCategory = config.categories.map((c) => [c, cards.filter((card) => card.category === c)]).filter(([, list]) => list.length);
const numberOf = new Map();
byCategory.flatMap(([, list]) => list).forEach((card, i) => numberOf.set(card.id, i + 1));
const featuredCards = featured.map((id) => cards.find((c) => c.id === id)).filter(Boolean);
// FAQ items about the site's Use button, found by the English question (same order in every locale).
const useFaq = new Set(page.en.faq.items.flatMap((item, i) => (/What does (the )?Use\b|Use button/.test(item.question) ? [i] : [])));
// Category pages: prompts/<category>.md, then prompts/<category>-2.md and so on when a category is too big for one page.
const fileFor = (locale, category, part = 1) => (category ? `prompts/${category}${part > 1 ? `-${part}` : ''}${LOCALES[locale].suffix}.md` : LOCALES[locale].file);
let PARTS = new Map(); // category -> cards[][] (the same split in every locale)

function helpers(locale) {
  const L = LOCALES[locale];
  const P = page[locale];
  const n = cards.length;
  const site = (path, medium, content) => `${SITE}${isDocs(path) ? L.docsPrefix : L.prefix}${path}?${utm(medium, content)}`;
  const library = (medium, content, hash) => `${site(config.path, medium, content)}${hash ? `#${hash}` : ''}`;
  // Say results play on GitHub only once they really do (uploaded videos, committed GIFs).
  const mediaKind = config.media === 'video' ? (Object.keys(videos).length ? 'video' : 'image') : gifs.size ? 'gif' : 'image';

  function media(card, file, width, alt, link, up) {
    const name = file;
    // A bare attachment URL on its own line is the form GitHub turns into a player in any repository;
    // a <video src> tag was not rewritten to a playable URL for attachments uploaded on 2026-11-09.
    if (videos[name]) return `${videos[name]}${trimmed.has(name) ? `\n\n<sub>${L.trimmed} [apiko.app](${link})</sub>` : ''}`;
    if (gifs.has(card.id) && file === card.media.files[0]) return `<a href="${link}"><img src="${up}assets/gif/${card.id}.gif" width="${width}" alt="${esc(alt)}"></a>`;
    const src = file.endsWith('.mp4') ? card.media.poster : file;
    return `<a href="${link}"><img src="${MEDIA}${src}" width="${width}" alt="${esc(alt)}"></a>`;
  }

  function renderCase(card, push, up) {
    const t = card.text[locale];
    const link = library('case', card.id, card.id);
    push(`<a id="${card.id}"></a>`, `### ${numberOf.get(card.id)}. ${t.title}`, '');
    const meta = [];
    if (card.author) meta.push(`${L.by} [@${linkText(card.author.name)}](${card.author.url})`);
    if (card.seconds) meta.push(`${card.seconds}${L.sec}`);
    if (card.ratio) meta.push(card.ratio);
    meta.push(`**[▶ ${L.run}](${link})**`);
    meta.push(`[${L.source}](${card.sourceUrl})`);
    push(meta.join(' · '), '');
    if (t.summary) push(t.summary, '');
    const files = card.media.type === 'video' ? card.media.files.slice(0, 1) : card.media.files.slice(0, 4);
    const portrait = card.media.height > card.media.width;
    const width = files.length > 1 ? (files.length > 2 ? 190 : 260) : card.media.type === 'video' ? (portrait ? 320 : 560) : portrait ? 320 : 480;
    if (files.length === 1) push(media(card, files[0], width, `${t.title} – ${config.modelLabel}`, link, up), '');
    else push('<table>', `<tr>${files.map((f, i) => `<td align="center">${media(card, f, width, `${t.title} – ${config.modelLabel} ${i + 1}`, link, up)}</td>`).join('')}</tr>`, '</table>', '');
    if (card.needsReference && L.needsRef[config.playground]) push(`> 📎 ${L.needsRef[config.playground]}`, '');
    if (card.kind === 'method') push(`**${L.method}:**`, '', t.note, '');
    else push(`**${L.prompt}:**`, '', fence(card.prompt), '');
  }

  function header(push, up, part = 1) {
    push('<div align="center">', '');
    push(`<a href="${library('banner')}"><img src="${up}assets/banner.jpg" alt="${esc(L.title(P.h1))}" width="100%"></a>`, '');
    push(
      `[![License: CC BY 4.0](${shield('License', 'CC BY 4.0', 'lightgrey')})](${up}LICENSE)`,
      `[![Prompts](${shield('Prompts', `${n} cases`, '111111')})](${up}${L.file}#menu)`,
      `[![Try ${config.modelLabel} on APIKO](${shield(`Try ${config.modelLabel}`, 'on APIKO', '4F46E5')})](${site(P.ctaPrimary.href, 'badge', 'model_try')})`,
      `[![${config.modelLabel} API docs](${shield(config.modelLabel, 'API docs', '111111')})](${site(P.ctaSecondary.href, 'badge', 'docs')})`,
      ''
    );
    return (category) => {
      push(ORDER.map((l) => `[![${LOCALES[l].badge[0]}](${shield(LOCALES[l].badge[0], l === locale ? 'Current' : LOCALES[l].badge[1], l === locale ? '111111' : '4F46E5')})](${category ? fileFor(l, category, part).slice('prompts/'.length) : up + fileFor(l)})`).join('\n'), '');
      push('</div>', '');
    };
  }

  return { L, P, n, site, library, mediaKind, renderCase, header };
}

function build(locale, split) {
  const { L, P, n, library, site, mediaKind, renderCase, header } = helpers(locale);
  // ---------- README ----------
  const out = [];
  const push = (...lines) => out.push(...lines);
  header(push, '')(null);
  push(`# ${L.title(P.h1)}`, '');

  push(`<a id="introduction"></a>`, `## 🌟 ${L.h.intro}`, '');
  push(`**${fill(P.description, n)}**`, '', [fill(P.subtitle, n), L.playsHere[mediaKind]].filter(Boolean).join(' '), '');
  push(`${L.browse} [apiko.app${config.path}](${library('readme', 'intro')}).`, '');
  push('> [!NOTE]', `> ${L.note}`, '');

  push(`<a id="quick-start"></a>`, `## 🚀 ${L.h.quick}`, '');
  push(L.quickBrowser(`[apiko.app](${library('quickstart', 'browser')})`), '');
  push(L.quickApi[config.playground](`[${L.apiKey}](${SITE}${L.prefix}/dashboard/apikeys?${utm('quickstart', 'api_key')})`), '');
  push('```bash', repo.curl, '```', '');
  const ep = repo.endpoints.map(([method, path, what]) => `\`${method} https://api.apiko.app${path}\` (${L.ep[what]})`).join(' · ');
  push(`${L.endpoints}: ${ep}`, '');

  push(`<a id="how-to-write"></a>`, `## ✍️ ${L.h.write(P.guide.title)}`, '');
  push(fill(P.guide.intro, n), '');
  for (const item of P.guide.items) push(`- **${item.h}**${item.formula ? ` · \`${item.formula}\`` : ''} — ${item.t}`);
  push('', `**${P.tips.title}**`, '');
  for (const item of P.tips.items) push(`- **${item.h}** ${item.t}`);
  push('');

  push(`<a id="menu"></a>`, `## 📑 ${L.h.menu}`, '');
  if (split) {
    if (featuredCards.length) push(`- [⭐ ${L.h.featured}](#featured) (${featuredCards.length})`);
    for (const [c, list] of byCategory) push(`- [${EMOJI[c] ?? '•'} ${P.categories[c].name}](${fileFor(locale, c)}) (${list.length}) — ${P.categories[c].intro}`);
  } else {
    for (const [c, list] of byCategory) {
      push(`- [${EMOJI[c] ?? '•'} ${P.categories[c].name}](#${c}) (${list.length})`);
      for (const card of list) push(`  - [${linkText(card.text[locale].title)}](#${card.id})`);
    }
  }
  push(`- [❓ ${L.h.faq}](#faq)`, `- [🔗 ${L.h.related}](#related)`, '');

  if (split) {
    push(`<a id="featured"></a>`, `## ⭐ ${L.h.featured}`, '');
    for (const card of featuredCards) renderCase(card, push, '');
    for (const [c, list] of byCategory) push(`- **[${EMOJI[c] ?? '•'} ${L.openCategory(P.categories[c].name, list.length)}](${fileFor(locale, c)})**`);
    push('');
  } else {
    for (const [c, list] of byCategory) {
      push(`<a id="${c}"></a>`, `## ${EMOJI[c] ?? '•'} ${P.categories[c].name}`, '');
      push(`> ${P.categories[c].intro} · ${L.cases(list.length)}`, '');
      for (const card of list) renderCase(card, push, '');
    }
  }

  // FAQ: the page's FAQ minus the item about the site's Use button (covered in Quick start).
  push(`<a id="faq"></a>`, `## ❓ ${L.h.faq}`, '');
  P.faq.items.forEach((item, i) => {
    if (useFaq.has(i)) return;
    push('<details>', `<summary><b>${fill(item.question, n)}</b></summary>`, '', fill(item.answer, n), '', '</details>', '');
  });
  push('');

  push(`<a id="related"></a>`, `## 🔗 ${L.h.related}`, '');
  push(`- [${linkText(P.h1)} · apiko.app](${library('related')})`);
  for (const item of P.links.items) push(`- [${linkText(item.label)}](${site(item.href, 'related')})`);
  push(`- [${L.examples}](https://github.com/${OWNER}/apiko-ai-api-examples)`, '');
  push(`**${L.otherRepos}**`, '');
  for (const [name, label] of repo.siblings) push(`- [${label}](https://github.com/${OWNER}/${name}${locale === 'en' ? '' : `/blob/main/${LOCALES[locale].file}`})`);
  push('');

  push(`<a id="license"></a>`, `## 📄 ${L.h.license}`, '', L.license(P.credit, repo.notices), '', L.star, '');
  const files = { [L.file]: out.join('\n') };

  // ---------- one page per category (split into parts when large) ----------
  if (split) {
    for (const [c, list] of byCategory) {
      const parts = PARTS.get(c);
      parts.forEach((cardsOfPart, k) => {
        const part = k + 1;
        const o = [];
        const p = (...lines) => o.push(...lines);
        header(p, '../', part)(c);
        p(`# ${EMOJI[c] ?? '•'} ${P.categories[c].name}${parts.length > 1 ? ` (${part}/${parts.length})` : ''} · ${L.title(P.h1)}`, '');
        p(`[← ${L.backToTop}](../${L.file}) · ${L.categoryPage(list.length)}`, '');
        if (parts.length > 1) p(`${L.pages}: ${parts.map((_, j) => (j === k ? `**${j + 1}**` : `[${j + 1}](${fileFor(locale, c, j + 1).slice('prompts/'.length)})`)).join(' · ')}`, '');
        p(`> ${P.categories[c].intro}`, '');
        for (const card of cardsOfPart) p(`- [${linkText(card.text[locale].title)}](#${card.id})`);
        p('');
        for (const card of cardsOfPart) renderCase(card, p, '../');
        if (part < parts.length) p(`**[${L.next} →](${fileFor(locale, c, part + 1).slice('prompts/'.length)})**`, '');
        p(`[← ${L.backToTop}](../${L.file})`, '');
        files[fileFor(locale, c, part)] = o.join('\n');
      });
    }
  }
  return files;
}

// Inline every case unless the README would get too big for GitHub to render comfortably;
// then each category gets its own page, split into parts that stay under the same budget.
const LIMIT = 400_000;
const PART_BUDGET = 350_000;
const bytes = (s) => Buffer.byteLength(s);
const split = repo.split ?? ORDER.some((l) => bytes(build(l, false)[LOCALES[l].file]) > LIMIT);
if (split) {
  const sizeOf = new Map(cards.map((card) => [card.id, 0]));
  for (const l of ORDER) {
    const { renderCase } = helpers(l);
    for (const card of cards) {
      const lines = [];
      renderCase(card, (...x) => lines.push(...x), '../');
      sizeOf.set(card.id, Math.max(sizeOf.get(card.id), bytes(lines.join('\n'))));
    }
  }
  for (const [c, list] of byCategory) {
    const parts = [[]];
    let used = 0;
    for (const card of list) {
      if (used + sizeOf.get(card.id) > PART_BUDGET && parts.at(-1).length) { parts.push([]); used = 0; }
      parts.at(-1).push(card);
      used += sizeOf.get(card.id);
    }
    PARTS.set(c, parts);
  }
}
rmSync(new URL('prompts', root), { recursive: true, force: true });
if (split) mkdirSync(new URL('prompts', root), { recursive: true });
let largest = 0;
for (const locale of ORDER) {
  for (const [file, text] of Object.entries(build(locale, split))) {
    writeFileSync(new URL(file, root), text);
    largest = Math.max(largest, bytes(text));
  }
}
console.log(`${cards.length} cases, ${split ? `category pages (${[...PARTS.values()].reduce((a, p) => a + p.length, 0)} per locale)` : 'single README'}, largest file ${largest} bytes`);

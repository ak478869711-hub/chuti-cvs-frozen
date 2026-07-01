// 抓統一超商官方門市清單，過濾冷凍交貨便(service 66)，精簡輸出 frozen-stores.json
const res = await fetch('https://cdn.uniopen.com/static_resources/stores_v2/stores.json');
const all = await res.json();
const frozen = all.filter(s => Array.isArray(s.services) && s.services.includes('66'));
const trim = frozen.map(s => {
  const m = (s.address || '').match(/^(.{2,3}?[市縣])/);
  return { i: s.id, n: s.name, a: s.address, c: m ? m[1] : '', lat: s.loc?.[1], lng: s.loc?.[0] };
});
const fs = await import('node:fs');
fs.writeFileSync('frozen-stores.json', JSON.stringify(trim));
console.log('frozen stores:', trim.length);

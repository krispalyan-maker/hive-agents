const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
const DS_KEY = process.env.DEEPSEEK_API_KEY;
async function sbInsert(table, data) { 
 await fetch(SB_URL + '/rest/v1/' + table, { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify(data), 
 }); 
} 
async function ask(prompt) { 
 const r = await fetch('https://api.deepseek.com/chat/completions', {  method: 'POST', 
 headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + DS_KEY },  body: JSON.stringify({ 
 model: 'deepseek-chat', 
 messages: [{ role: 'system', content: 'Return findings as JSON array: [{title, summary, max_tokens: 1500, temperature: 0.3, 
 }), 
 }); 
 const d = await r.json(); 
 return d.choices[0].message.content; 
} 
async function run() { 
 console.log('[SCOUT] Research sweep starting...'); 
 const topics = ['AI music generation trends 2026', 'restaurant tech food ordering startups'
 for (const topic of topics) { 
 try { 
 const raw = await ask('Find the 3 most important recent developments on: "' + topic + ' let parsed; 
 try { parsed = JSON.parse(raw.replace(/```json|```/g, '').trim()); } catch { parsed = [
 for (const f of parsed) { 
 await sbInsert('analytics', { event_type: 'scout_finding', data: { topic, ...f, agen } 
 console.log('[SCOUT] ' + parsed.length + ' findings for: ' + topic);  } catch (e) { console.error('[SCOUT] Error:', e.message); } 
 await new Promise(r => setTimeout(r, 2000)); 
 } 
 await sbInsert('analytics', { event_type: 'agent_run', data: { agent: 'scout', topics_rese console.log('[SCOUT] Complete.'); 
} 
run().catch(console.error);

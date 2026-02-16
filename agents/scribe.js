const DS_KEY = process.env.DEEPSEEK_API_KEY; 
const RS_KEY = process.env.RESEND_API_KEY; 
const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
async function ask(prompt) { 
 const r = await fetch('https://api.deepseek.com/chat/completions', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + DS_KEY },  body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: promp }); 
 return (await r.json()).choices[0].message.content; 
} 
async function run() { 
 console.log('[SCRIBE] Generating campaign...'); 
 const subject = await ask('Generate ONE email subject line for a music release. Under 50 c const body = await ask('Write a short email (under 150 words) for a new AI music release f
 try { 
 await fetch('https://api.resend.com/emails', { 
 method: 'POST', 
 headers: { Authorization: 'Bearer ' + RS_KEY, 'Content-Type': 'application/json' },  body: JSON.stringify({ from: 'hive@yourdomain.com', to: 'kris.palyan@gmail.com', subjec }); 
 console.log('[SCRIBE] Email sent.'); 
 } catch (e) { console.error('[SCRIBE] Send failed:', e.message); } 
 await fetch(SB_URL + '/rest/v1/analytics', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify({ event_type: 'agent_run', data: { agent: 'scribe', status: 'comple }); 
} 
run().catch(console.error);

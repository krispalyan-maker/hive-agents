const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
const DS_KEY = process.env.DEEPSEEK_API_KEY; 
async function run() { 
 console.log('[ORACLE] Daily analysis...'); 
 const findings = await fetch(SB_URL + '/rest/v1/analytics?select=data&event_type=eq.scout_ headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }, 
 }).then(r => r.json()); 
 const r = await fetch('https://api.deepseek.com/chat/completions', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + DS_KEY },  body: JSON.stringify({ 
 model: 'deepseek-chat', 
 messages: [{ role: 'user', content: 'Analyze recent scout findings and provide: 1) Top max_tokens: 1000, temperature: 0.4, 
 }), 
 }).then(r => r.json());
 await fetch(SB_URL + '/rest/v1/analytics', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify({ event_type: 'oracle_prediction', data: { agent: 'oracle', analysi }); 
 console.log('[ORACLE] Predictions stored.'); 
} 
run().catch(console.error); 

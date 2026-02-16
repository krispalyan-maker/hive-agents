const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
const DS_KEY = process.env.DEEPSEEK_API_KEY; 
async function run() { 
 console.log('[EVOLVE] Weekly analysis...'); 
 const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString(); 
 const runs = await fetch(SB_URL + '/rest/v1/analytics?select=data&event_type=eq.agent_run& headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }, 
 }).then(r => r.json()); 
 const agents = {}; 
 if (Array.isArray(runs)) runs.forEach(r => { const a = r.data?.agent; if (a) agents[a] = (
 const r = await fetch('https://api.deepseek.com/chat/completions', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + DS_KEY },  body: JSON.stringify({ 
 model: 'deepseek-chat', 
 messages: [{ role: 'user', content: 'Analyze agent swarm performance. Runs per agent: ' max_tokens: 1000, temperature: 0.3, 
 }), 
 }).then(r => r.json()); 
 await fetch(SB_URL + '/rest/v1/analytics', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify({ event_type: 'evolve_report', data: { agent: 'evolve', total_runs:
 }); 
 console.log('[EVOLVE] Report stored. ' + (runs?.length || 0) + ' runs analyzed.'); } 
run().catch(console.error);

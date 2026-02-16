const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
const RS_KEY = process.env.RESEND_API_KEY; 
async function sbQuery(path) { 
 const r = await fetch(SB_URL + '/rest/v1/' + path, { headers: { apikey: SB_KEY, Authorizat return r.json(); 
} 
async function run() { 
 console.log('[GUARD] Security scan...'); 
 const alerts = []; 
 // Check signup velocity 
 const hourAgo = new Date(Date.now() - 3600000).toISOString(); 
 const recent = await sbQuery('users?select=id&created_at=gte.' + hourAgo);  if (Array.isArray(recent) && recent.length > 50) alerts.push(recent.length + ' signups in 
 // Check usage abuse 
 const today = new Date().toISOString().split('T')[0]; 
 const heavy = await sbQuery('usage?select=*&date=eq.' + today + '&messages_used=gte.1000');  if (Array.isArray(heavy) && heavy.length > 0) alerts.push(heavy.length + ' users over 1000
 if (alerts.length > 0) { 
 console.log('[GUARD] ' + alerts.length + ' ALERTS!'); 
 try { 
 await fetch('https://api.resend.com/emails', { 
 method: 'POST', 
 headers: { Authorization: 'Bearer ' + RS_KEY, 'Content-Type': 'application/json' },  body: JSON.stringify({ from: 'guard@hive.app', to: 'YOUR-EMAIL@gmail.com', subject: ' }); 
 } catch {} 
 } else { console.log('[GUARD] All clear.'); } 
 await fetch(SB_URL + '/rest/v1/analytics', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify({ event_type: 'agent_run', data: { agent: 'guard', alerts_found: al }); 
} 
run().catch(console.error);

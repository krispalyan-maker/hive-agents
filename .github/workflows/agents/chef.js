const SB_URL = process.env.SUPABASE_URL; 
const SB_KEY = process.env.SUPABASE_KEY; 
const RS_KEY = process.env.RESEND_API_KEY; 
async function run() { 
 console.log('[CHEF] Checking orders...'); 
 const pending = await fetch(SB_URL + '/rest/v1/orders?select=*&restaurant_notified=eq.fals
 headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }, 
 }).then(r => r.json()); 
 console.log('[CHEF] ' + (Array.isArray(pending) ? pending.length : 0) + ' pending orders'); 
 if (Array.isArray(pending)) { 
 for (const order of pending) { 
 try { 
 await fetch('https://api.resend.com/emails', { 
 method: 'POST', 
 headers: { Authorization: 'Bearer ' + RS_KEY, 'Content-Type': 'application/json' },  body: JSON.stringify({ 
 from: 'orders@hive.app', to: 'YOUR-EMAIL@gmail.com', 
 subject: 'NEW ORDER — Code: ' + order.pickup_code, 
 html: '<h2>New SyncFood Order</h2><p>Restaurant: ' + order.restaurant_name + '</ }), 
 }); 
 await fetch(SB_URL + '/rest/v1/orders?id=eq.' + order.id, { 
 method: 'PATCH', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bea body: JSON.stringify({ restaurant_notified: true }), 
 }); 
 } catch (e) { console.error('[CHEF] Error:', e.message); } 
 } 
 } 
 await fetch(SB_URL + '/rest/v1/analytics', { 
 method: 'POST', 
 headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer '  body: JSON.stringify({ event_type: 'agent_run', data: { agent: 'chef', orders_processed: }); 
} 
run().catch(console.error);

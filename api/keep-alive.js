export default async function handler(req, res) {
  const url = 'https://arsbodqhmmtmoqqhykep.supabase.co/rest/v1/cars?select=id&limit=1';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyc2JvZHFobW10bW9xcWh5a2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNTgxMTQsImV4cCI6MjA4NzczNDExNH0.mt_WpPshp5xdbIx23pMmcwq7MhktA0-vWPIstOy1_HM';

  try {
    await fetch(url, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    res.status(200).json({ ok: true, time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}

// Netlify Serverless Function: book-call.js
// Hardened booking dispatch for 22truefeed@gmail.com with Bot Protection & Sanitization

export const handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Payload size limit guard (protect against buffer/memory overflow attacks)
  if ((event.body || '').length > 10000) {
    return {
      statusCode: 413,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Payload Too Large' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Honeypot Trap: If bot filled the hidden honeypot field, drop silently
    if (data._honey && String(data._honey).trim() !== '') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Processed' })
      };
    }

    // Input Sanitizer Helper
    const clean = (val, max = 200) => {
      if (!val || typeof val !== 'string') return '';
      return val.slice(0, max).replace(/[<>]/g, '').trim();
    };

    const clientName = clean(data.Client_Name || data.name, 80) || 'Client';
    const clientEmail = clean(data.Client_Email || data.email, 100) || 'N/A';
    const brand = clean(data.Brand_or_Website || data.brand, 120) || 'Not provided / Still building';
    const day = clean(data.Selected_Day || data.day, 40) || 'N/A';
    const time = clean(data.Selected_Time || data.time, 40) || 'N/A';
    const spend = clean(data.Current_Ad_Marketing_Spend || data.marketing_spend, 80) || 'N/A';
    const notes = clean(data.Client_Notes || data.notes, 500) || 'None';

    const payload = {
      _subject: `🚀 New Discovery Call Booking: ${clientName} (${brand})`,
      _template: 'table',
      _captcha: 'false',
      Client_Name: clientName,
      Client_Email: clientEmail,
      Brand_or_Website: brand,
      Selected_Day: day,
      Selected_Time: time,
      Current_Ad_Marketing_Spend: spend,
      Client_Notes: notes,
      Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    // Forward to FormSubmit for 22truefeed@gmail.com
    const response = await fetch('https://formsubmit.co/ajax/22truefeed@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Booking notification dispatched to 22truefeed@gmail.com',
        detail: result
      })
    };
  } catch (err) {
    console.error('Serverless function error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Error', message: err.message })
    };
  }
};

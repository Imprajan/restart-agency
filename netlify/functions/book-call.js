// Netlify Serverless Function: book-call.js
// Handles booking requests and dispatches Gmail notifications to 22truefeed@gmail.com

export const handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    const payload = {
      _subject: `🚀 New Discovery Call Booking: ${data.Client_Name || data.name || 'Client'} (${data.Brand_or_Website || data.brand || 'No Website'})`,
      _template: 'table',
      _captcha: 'false',
      Client_Name: data.Client_Name || data.name || 'N/A',
      Client_Email: data.Client_Email || data.email || 'N/A',
      Brand_or_Website: data.Brand_or_Website || data.brand || 'Not provided / Still building',
      Selected_Day: data.Selected_Day || data.day || 'N/A',
      Selected_Time: data.Selected_Time || data.time || 'N/A',
      Current_Ad_Marketing_Spend: data.Current_Ad_Marketing_Spend || data.marketing_spend || 'N/A',
      Client_Notes: data.Client_Notes || data.notes || 'None',
      Submitted_At: data.Submitted_At || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
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

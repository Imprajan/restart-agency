import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

function localApiPlugin() {
  return {
    name: 'local-api-book-call',
    configureServer(server) {
      server.middlewares.use('/api/book-call', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            if (body.length > 10000) {
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Payload Too Large' }));
              return;
            }

            const data = JSON.parse(body || '{}');

            // Drop bot honeypots silently
            if (data._honey && String(data._honey).trim() !== '') {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Processed' }));
              return;
            }
            const payload = {
              _subject: `🚀 New Discovery Call Booking: ${data.Client_Name || data.name || 'Client'} | ${data.Client_Phone || data.phone || 'N/A'} (${data.Brand_or_Website || data.brand || 'No Website'})`,
              _template: 'table',
              _captcha: 'false',
              Client_Name: data.Client_Name || data.name || 'N/A',
              Client_Email: data.Client_Email || data.email || 'N/A',
              Client_Phone: data.Client_Phone || data.phone || 'N/A',
              Brand_or_Website: data.Brand_or_Website || data.brand || 'Not provided / Still building',
              Selected_Day: data.Selected_Day || data.day || 'N/A',
              Selected_Time: data.Selected_Time || data.time || 'N/A',
              Current_Ad_Marketing_Spend: data.Current_Ad_Marketing_Spend || data.marketing_spend || 'N/A',
              Client_Notes: data.Client_Notes || data.notes || 'None',
              Submitted_At: data.Submitted_At || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
            };

            // Forward to FormSubmit for 22truefeed@gmail.com
            await fetch('https://formsubmit.co/ajax/22truefeed@gmail.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            }).catch(() => null);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              message: 'Local server received booking & dispatched to 22truefeed@gmail.com'
            }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Error processing request', detail: e.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApiPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

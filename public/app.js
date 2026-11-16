document.addEventListener('DOMContentLoaded', () => {
  const metaEl = document.getElementById('responseMeta');
  const bodyEl = document.getElementById('responseBody');

  document.querySelectorAll('button[data-url]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url    = btn.dataset.url;
      const method = btn.dataset.method ?? 'GET';

      metaEl.textContent = 'Loading...';
      metaEl.className   = 'response-meta';
      bodyEl.textContent = '';

      try {
        const res         = await fetch(url, { method });
        const contentType = res.headers.get('content-type') ?? '';

        // Pick a colour class based on the status code
        let cls = 'ok';
        if (res.status === 201)              cls = 'created';
        else if (res.status >= 300 && res.status < 400) cls = 'redirect';
        else if (res.status >= 400)          cls = 'error';

        metaEl.textContent = `${method} ${url}  →  ${res.status} ${res.statusText}`;
        metaEl.className   = `response-meta ${cls}`;

        if (contentType.includes('application/json')) {
          const data = await res.json();
          // Pretty-print JSON with 2-space indent
          bodyEl.textContent = JSON.stringify(data, null, 2);
        } else {
          bodyEl.textContent = await res.text();
        }
      } catch (err) {
        metaEl.textContent = 'Network error – could not reach the server';
        metaEl.className   = 'response-meta error';
        bodyEl.textContent = err.message;
      }
    });
  });
});
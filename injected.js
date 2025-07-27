// Monkey-patch fetch in page context
(function () {
  const originalFetch = window.fetch;

  window.fetch = async function(input, init = {}) {
    try {
      const url = (typeof input === 'string') ? input : input.url;

      // Only intercept ChatGPT message POSTs
      if (url.includes("/backend-api/conversation") && init?.method === "POST") {
        const body = init.body;

        if (body) {
          const cloned = typeof body === 'string' ? body : await body.text();
          const data = JSON.parse(cloned);

          const msg = data?.messages?.[data.messages.length - 1]?.content?.parts?.[0];

          if (msg) {
            console.log("🕵️ Intercepted prompt:", msg);

            // Anonymize (you can replace this with window.ai later)
            const anonymized = await fakeAnonymize(msg);

            // Replace original message
            data.messages[data.messages.length - 1].content.parts[0] = anonymized;

            init.body = JSON.stringify(data);
            console.log("✍️ Replaced prompt with:", anonymized);
          }
        }
      }
    } catch (err) {
      console.warn("🧨 Fetch patch error:", err);
    }

    return originalFetch(input, init);
  };

  // Dummy anonymization (replace this with real logic later)
  async function fakeAnonymize(text) {
    return text
      .replace(/([A-Z][a-z]+\s[A-Z][a-z]+)/g, "{{NAME}}")
      .replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, "{{EMAIL}}");
  }
})();

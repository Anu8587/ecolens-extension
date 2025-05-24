chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getEcoScore') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getProductDetails' }, async (product) => {
        if (chrome.runtime.lastError || !product) {
          console.log('Failed to get product details:', chrome.runtime.lastError?.message);
          sendResponse({ error: 'Unable to fetch product details' });
          return;
        }

        try {
          console.log('Fetching eco-score for:', product);
          const response = await fetch('http://localhost:5001/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: product.title })
          });

          if (!response.ok) {
            throw new Error('Backend analysis failed');
          }

          const data = await response.json();
          console.log('Eco-Score:', data);
          sendResponse({ score: data.score });
        } catch (error) {
          console.log('Fetch error:', error.message);
          sendResponse({ error: error.message });
        }
      });
    });
    return true; // Async response
  }
});
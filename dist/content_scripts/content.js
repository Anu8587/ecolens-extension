function getProductDetails() {
  console.log('content.js running on:', window.location.hostname);
  let title = '';
  if (window.location.hostname.includes('amazon.com') || window.location.hostname.includes('amazon.in')) {
    title = document.querySelector('h1#productTitle')?.textContent.trim();
  } else if (window.location.hostname.includes('flipkart.com')) {
    title = document.querySelector('h1.VU-ZEz')?.textContent.trim();
  } else if (window.location.hostname.includes('myntra.com')) {
    title = document.querySelector('h1.pdp-title')?.textContent.trim();
  }
  if (!title) {
    title = document.querySelector('meta[property="og:title"]')?.content;
  }
  if (!title) {
    title = document.title;
  }
  title = title
    ?.replace(/\| Flipkart$/, '')
    ?.replace(/\| Myntra$/, '')
    ?.replace(/\- Amazon$/, '')
    ?.trim() || 'Unknown Product';
  const url = window.location.href;
  console.log('Scraped Product:', { title, url });
  return { title, url };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProductDetails') {
    console.log('Received getProductDetails message');
    sendResponse(getProductDetails());
  }
});
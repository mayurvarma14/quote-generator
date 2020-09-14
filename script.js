const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const refreshBtn = document.getElementById('refresh');

let quotesList = [];

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
// Get new quote
function newQuote() {
  showLoader();
  const quote = quotesList[Math.floor(Math.random() * quotesList.length)];
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  hideLoader();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Get quotes
async function getQuotes() {
  showLoader();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    quotesList = await response.json();
    newQuote();
  } catch (error) {
    hideLoader();
    refreshBtn.hidden = false;
    quoteContainer.hidden = true;
    console.log('Log: getQuote -> error', error);
  }
}
getQuotes();

function refreshPage() {
  location.reload();
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
refreshBtn.addEventListener('click', refreshPage);

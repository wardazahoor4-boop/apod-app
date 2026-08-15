const API_KEY = 'zC1bMjDNbyrvj5uUrIoV9c56wtCNZifdR2eMdfnv';
const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY;


const titleEl = document.getElementById('title');
const explanationEl = document.getElementById('explanation');
const datePicker = document.getElementById('date-picker');
const randomBtn = document.getElementById('random-btn');
const toggleClockBtn = document.getElementById('toggle-clock-btn');
const clockEl = document.getElementById('clock');


async function fetchAPOD(dateStr = '') {
  try {
    let url = API_URL;
    if (dateStr) {
      url += '&date=' + dateStr;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.error || data.msg) {
      titleEl.textContent = "API Limit Exceeded";
      explanationEl.textContent = "NASA DEMO_KEY reached its limit. Get a free key at api.nasa.gov.";
      return;
    }

    titleEl.textContent = data.title || "No Title Available";
    explanationEl.textContent = data.explanation || "No explanation available.";

    if (data.media_type === 'image') {
      document.body.style.backgroundImage = "url('" + (data.hdurl || data.url) + "')";
    } else {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')";
    }
  } catch (err) {
    titleEl.textContent = "Error Loading Data";
    explanationEl.textContent = "Could not fetch data. Check your internet connection or console for details.";
    console.error(err);
  }
}


function getRandomDate() {
  const start = new Date(1995, 5, 16);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
}

function updateClock() {
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();


if (datePicker) {
  datePicker.addEventListener('change', (e) => fetchAPOD(e.target.value));
}

if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    const randomDate = getRandomDate();
    datePicker.value = randomDate;
    fetchAPOD(randomDate);
  });
}

if (toggleClockBtn && clockEl) {
  toggleClockBtn.addEventListener('click', () => {
    clockEl.style.display = (clockEl.style.display === 'none') ? 'block' : 'none';
  });
}


fetchAPOD();
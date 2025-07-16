// RSVP Modal Open/Close function openRSVP() { document.getElementById('rsvpModal').style.display = 'flex'; }

function closeRSVP() { document.getElementById('rsvpModal').style.display = 'none'; }

// Countdown Timer const countdownElement = document.getElementById('countdown-timer'); const weddingDate = new Date('2025-10-10T18:00:00');

function updateCountdown() { const now = new Date(); const diff = weddingDate - now;

if (diff <= 0) { countdownElement.innerHTML = "💍 It's our wedding day!"; return; }

const days = Math.floor(diff / (1000 * 60 * 60 * 24)); const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); const minutes = Math.floor((diff / (1000 * 60)) % 60); const seconds = Math.floor((diff / 1000) % 60);

countdownElement.innerHTML = ${days} days ${hours} hrs ${minutes} min ${seconds} sec; }

setInterval(updateCountdown, 1000); updateCountdown();


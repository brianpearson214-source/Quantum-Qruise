// Update this when the real September date is locked in, it drives the countdown timer.
var EVENT_START = new Date('2026-09-03T17:30:00-05:00');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  var container = document.getElementById('countdown');
  var note = document.getElementById('countdown-note');
  if (!container) return;

  var diff = EVENT_START.getTime() - Date.now();

  if (diff <= 0) {
    container.hidden = true;
    if (note) note.hidden = false;
    return;
  }

  var totalMinutes = Math.floor(diff / 60000);
  var days = Math.floor(totalMinutes / 1440);
  var hours = Math.floor((totalMinutes % 1440) / 60);
  var minutes = totalMinutes % 60;

  container.querySelector('[data-cd="days"]').textContent = pad2(days);
  container.querySelector('[data-cd="hours"]').textContent = pad2(hours);
  container.querySelector('[data-cd="minutes"]').textContent = pad2(minutes);
}

updateCountdown();
setInterval(updateCountdown, 15000);

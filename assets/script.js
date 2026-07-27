// Single source of truth for the event date/time.
// Update this when the real September date is locked in, it drives
// the countdown timer and the "Add to Calendar" links.
var EVENT_START = new Date('2026-09-03T17:30:00-05:00');
var EVENT_END = new Date('2026-09-03T19:30:00-05:00');
var EVENT_TITLE = 'Quantum Qruise';
var EVENT_DETAILS = "Join Chicago's quantum community for an evening of drinks, apps, music, and nautical fun at Navy Pier.";
var EVENT_LOCATION = 'Navy Pier, Chicago, IL';

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

  var totalSeconds = Math.floor(diff / 1000);
  var days = Math.floor(totalSeconds / 86400);
  var hours = Math.floor((totalSeconds % 86400) / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  container.querySelector('[data-cd="days"]').textContent = pad2(days);
  container.querySelector('[data-cd="hours"]').textContent = pad2(hours);
  container.querySelector('[data-cd="minutes"]').textContent = pad2(minutes);
  container.querySelector('[data-cd="seconds"]').textContent = pad2(seconds);
}

function toGoogleCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function buildGoogleCalendarUrl() {
  var params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: toGoogleCalendarDate(EVENT_START) + '/' + toGoogleCalendarDate(EVENT_END),
    details: EVENT_DETAILS,
    location: EVENT_LOCATION
  });
  return 'https://calendar.google.com/calendar/render?' + params.toString();
}

function buildOutlookUrl() {
  var params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: EVENT_TITLE,
    startdt: EVENT_START.toISOString(),
    enddt: EVENT_END.toISOString(),
    body: EVENT_DETAILS,
    location: EVENT_LOCATION
  });
  return 'https://outlook.office.com/calendar/0/deeplink/compose?' + params.toString();
}

function wireCalendarLinks() {
  var gcalUrl = buildGoogleCalendarUrl();
  var outlookUrl = buildOutlookUrl();
  document.querySelectorAll('.gcal-link').forEach(function (a) { a.href = gcalUrl; });
  document.querySelectorAll('.outlook-link').forEach(function (a) { a.href = outlookUrl; });
}

wireCalendarLinks();
updateCountdown();
setInterval(updateCountdown, 1000);

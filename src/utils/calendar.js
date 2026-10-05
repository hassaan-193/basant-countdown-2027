/**
 * Calendar export helper for Basant 2027
 */

export function addToGoogleCalendar() {
  const title = encodeURIComponent("Basant 2027 - Lahore Kite Flying Festival");
  const details = encodeURIComponent(
    "Celebration of Jashn-e-Basant in Lahore, Pakistan. Rooftop kite flying, spring traditions, and Lahori cultural festivities."
  );
  const location = encodeURIComponent("Ghaziabad, Lahore, Pakistan");
  
  // March 12, 2027 00:00 PKT (UTC+5) is March 11, 2027 19:00:00 UTC
  // March 14, 2027 23:59 PKT (UTC+5) is March 14, 2027 18:59:00 UTC
  // Format: YYYYMMDDTHHmmssZ
  const startUTC = "20270311T190000Z";
  const endUTC = "20270314T185900Z"; // March 12 to 14, 2027 festival window

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${details}&location=${location}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function downloadIcsFile() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Basant Festival Lahore//Basant 2027 Countdown//EN",
    "BEGIN:VEVENT",
    "UID:basant-2027-" + Date.now() + "@lahorebasant.org",
    "DTSTAMP:20261005T080000Z",
    "DTSTART:20270311T190000Z",
    "DTEND:20270314T185900Z",
    "SUMMARY:Basant 2027 - Lahore Kite Flying Festival",
    "DESCRIPTION:Annual Jashn-e-Basant festival celebrating the arrival of spring in Lahore, Pakistan (March 12 to 14, 2027).",
    "LOCATION:Ghaziabad, Lahore, Punjab, Pakistan",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Basant-2027-Lahore.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

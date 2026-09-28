/**
 * Basant 2027 Event Configuration
 * 
 * Centralized configuration for date tuning, event metadata,
 * asset paths, videos (new preparations + original memories),
 * and timezone handling (Asia/Karachi, PKT UTC+5).
 */

export const EVENT_CONFIG = {
  // Target date for Basant 2027 (matching original project: March 11, 2027 11:59 PM PKT)
  targetDateISO: "2027-03-11T23:59:00+05:00",
  startDateISO: "2026-08-20T00:00:00+05:00",

  title: "Basant 2027",
  subtitle: "The Historic Festival of Spring & Kite Flying",
  venue: "Ghaziabad, Lahore",
  location: "Ghaziabad, Lahore, Punjab, Pakistan",
  timezoneName: "Asia/Karachi (PKT UTC+5)",
  
  displayDate: "Thursday, March 11, 2027",
  displayTime: "11:59 PM PKT",

  // Videos collection: including new 2027 preparation video + preserved memory videos
  videos: [
    {
      id: "prep-2027",
      tabLabel: "2027 Preparations",
      badge: "Exclusive &bull; New Video",
      title: "Basant 2027 Preparations",
      subtitle: "Artisans & Workshops Crafting Kites for the Upcoming Festival",
      src: "/videos/basant-2027-preparations.mp4",
      poster: "/images/basant-preparations-poster.jpg",
      description:
        "Master kite makers in Lahore's Walled City shaping traditional bamboo frames (teela), dyeing lightweight tissue paper, and calibrating patangs for Basant 2027.",
    },
    {
      id: "memory-1",
      tabLabel: "Lahore Memories I",
      badge: "Archival Classic",
      title: "Lahore Sky Battles (Memory 1)",
      subtitle: "Historic Rooftop Kite Duels & 'Bo Kata!' Celebrations",
      src: "/videos/basant_memory_1.mp4",
      poster: "/images/basant-preparations-poster.jpg",
      description:
        "Classic footage capturing the high-tension kite combat over the rooftops of Lahore, cheers echoing across the old city skyline.",
    },
    {
      id: "memory-2",
      tabLabel: "Lahore Memories II",
      badge: "Archival Classic",
      title: "Jashn-e-Basant Vibes (Memory 2)",
      subtitle: "Electric Rooftop Gatherings, Music & Night Skies",
      src: "/videos/basant_memory_2.mp4",
      poster: "/images/basant-preparations-poster.jpg",
      description:
        "Rooftops illuminated under spring night searchlights, vibrant gatherings celebrating Punjabi hospitality and kite flying.",
    },
  ],
};

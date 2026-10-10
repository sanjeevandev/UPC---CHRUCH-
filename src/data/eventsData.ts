export interface ChurchEvent {
  id: string;
  title: string;
  category: 'Special Gathering' | 'Youth Night' | 'Fasting & Prayer' | 'Celebration' | 'Worship Concert' | 'Sunday Service';
  date: string; // e.g. "Sunday, Nov 22, 2026"
  time: string; // e.g. "9:00 AM – 1:00 PM"
  location: string; // e.g. "UPC Main Sanctuary, Bodi"
  description: string;
  speakerOrLead?: string; // e.g. "Pastor Rajan Joel"
  badgeColor?: string;
  featured?: boolean;
}

export const DEFAULT_CHURCH_EVENTS: ChurchEvent[] = [
  {
    id: "evt-1",
    title: "Harvest Thanksgiving & Celebration Feast",
    category: "Celebration",
    date: "Sunday, Nov 22, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "UPC Main Sanctuary, Bodi",
    description: "Join our entire church family with grateful hearts as we offer praise, testimony, and thanksgiving to the Lord for His faithfulness and abundance throughout the year.",
    speakerOrLead: "Pastor Rajan Joel",
    badgeColor: "#dd5234",
    featured: true,
  },
  {
    id: "evt-2",
    title: "All-Night Revival & Breakthrough Intercession",
    category: "Fasting & Prayer",
    date: "Second Friday of Every Month",
    time: "10:00 PM – 4:00 AM",
    location: "UPC Sanctuary, Bodi",
    description: "An anointed night of prayer, weeping before the altar, and crying out for spiritual breakthroughs, physical healing, and family salvation.",
    speakerOrLead: "Pastoral Intercession Team",
    badgeColor: "#2563eb",
    featured: true,
  },
  {
    id: "evt-3",
    title: "Ignite Youth Worship Rally & Word",
    category: "Youth Night",
    date: "Last Sunday Evening of Every Month",
    time: "6:00 PM – 8:30 PM",
    location: "UPC Youth Fellowship Hall",
    description: "An electrifying evening of energetic praise, authentic fellowship, inspiring testimonies, and powerful Word for young people and students.",
    speakerOrLead: "Bro. Goodwin & Youth Worship Team",
    badgeColor: "#7c3aed",
    featured: true,
  },
  {
    id: "evt-4",
    title: "United Chain Fasting & Anointing Prayer",
    category: "Fasting & Prayer",
    date: "First Saturday of Every Month",
    time: "10:00 AM – 2:00 PM",
    location: "UPC Main Sanctuary, Bodi",
    description: "Unified corporate fasting prayer for church revival, the town of Bodi, our state, and spiritual empowerment for every home.",
    speakerOrLead: "Elders & Sisters Fellowship",
    badgeColor: "#059669",
    featured: false,
  }
];

const STORAGE_KEY = 'upc_church_events_v1';
const PIN_STORAGE_KEY = 'upc_admin_pin_v1';
export const DEFAULT_ADMIN_PIN = 'upcbodi2026';

// Get current events (persisted or defaults)
export function getSavedEvents(): ChurchEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CHURCH_EVENTS));
      return DEFAULT_CHURCH_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CHURCH_EVENTS;
  } catch (err) {
    console.error("Error loading events from storage:", err);
    return DEFAULT_CHURCH_EVENTS;
  }
}

// Save events and notify listeners
export function saveEvents(events: ChurchEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('upc_events_changed'));
  } catch (err) {
    console.error("Error saving events:", err);
  }
}

// Reset to initial default events
export function resetEventsToDefault(): ChurchEvent[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CHURCH_EVENTS));
    window.dispatchEvent(new Event('upc_events_changed'));
    return DEFAULT_CHURCH_EVENTS;
  } catch (err) {
    console.error("Error resetting events:", err);
    return DEFAULT_CHURCH_EVENTS;
  }
}

// Admin PIN Helpers
export function getAdminPIN(): string {
  try {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

export function saveAdminPIN(newPin: string): boolean {
  try {
    if (!newPin || newPin.trim().length < 4) return false;
    localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
    return true;
  } catch {
    return false;
  }
}

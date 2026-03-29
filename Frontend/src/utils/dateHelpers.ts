// Reusable date formatting and calculation helpers used across screens.

// Returns a formatted date string e.g. "March 29, 2026"
export const formatFullDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Returns a short date string e.g. "29 Mar"
export const formatShortDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
};

// Returns a time string e.g. "10:24 AM"
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Returns an ISO date string e.g. "2026-03-29"
export const toISODate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Returns today's ISO date string.
export const today = (): string => toISODate(new Date());

// Returns the number of days between two dates (positive if b is after a).
export const daysBetween = (a: Date | string, b: Date | string): number => {
  const dateA = typeof a === 'string' ? new Date(a) : a;
  const dateB = typeof b === 'string' ? new Date(b) : b;
  const ms = dateB.getTime() - dateA.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

// Returns true if the given date string is today.
export const isToday = (date: string): boolean => date === today();

// Formats seconds as MM:SS e.g. 90 → "01:30"
export const formatCountdown = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

// Returns a relative label e.g. "Today", "Yesterday", or "Mar 27"
export const relativeDate = (date: string): string => {
  const diff = daysBetween(date, today());
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return formatShortDate(date);
};

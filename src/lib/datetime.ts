/**
 * SSR/CSR hydration mismatch 방지를 위해 locale 의존 포맷(toLocaleString 등)을 피합니다.
 * 항상 동일한 문자열을 만들도록 고정 포맷을 사용합니다.
 */
export type DateInput = string | number | Date | null | undefined;

function toDate(input: DateInput): Date | null {
  if (input == null) return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** YYYY.MM.DD */
export function formatDate(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}.${m}.${day}`;
}

/** MM.DD HH:mm */
export function formatMDHM(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "-";
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  return `${m}.${day} ${hh}:${mm}`;
}

/** YYYY.MM.DD HH:mm */
export function formatDateTime(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  return `${y}.${m}.${day} ${hh}:${mm}`;
}

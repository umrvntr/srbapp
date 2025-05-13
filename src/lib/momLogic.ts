export function getMomState(): "hungry" | "neutral" | "happy" {
  if (typeof window === 'undefined') return "neutral";
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  const diff = lastVisit ? now - parseInt(lastVisit) : Infinity;

  if (diff > 1000 * 60 * 60 * 48) return "hungry";
  if (diff > 1000 * 60 * 60 * 12) return "neutral";
  return "happy";
}

export function updateMomVisit() {
  if (typeof window === 'undefined') return;
  localStorage.setItem("lastVisit", Date.now().toString());
} 
const SESSION_KEY = "inculva-session-id";

// In-memory fallback for environments where sessionStorage is unavailable
// (e.g. sandboxed iframes without allow-same-origin).
let _memorySessionId: string | null = null;

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    if (!_memorySessionId) {
      _memorySessionId = crypto.randomUUID();
    }
    return _memorySessionId;
  }
}

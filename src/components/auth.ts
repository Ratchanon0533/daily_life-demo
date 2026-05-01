// Shared authentication helpers
//
// Storage strategy:
//   - "remember me" checked  -> tokens go to localStorage (persist across browser restarts)
//   - "remember me" unchecked -> tokens go to sessionStorage (cleared when tab closes)
//
// JWT decoding is done client-side without verification (just to read `exp`).
// Server still re-verifies every token, so this is safe for UX-only checks.

const TOKEN_KEY = "token";
const USER_KEY = "user";
const REMEMBER_KEY = "rememberMe";

/** Decode JWT payload without verifying signature (for reading exp/iat client-side). */
export function decodeJwt(token: string): { exp?: number; iat?: number;[k: string]: any } | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = atob(payload);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

/** True if the token has an `exp` claim that has already passed. */
export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    const payload = decodeJwt(token);
    if (!payload || !payload.exp) return true;
    // exp is in seconds since epoch
    return payload.exp * 1000 <= Date.now();
}

/** Save credentials to local- or sessionStorage depending on remember-me. */
export function saveAuth(token: string, user: any, rememberMe: boolean) {
    // Always clear the other store first to avoid "ghost" credentials
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem(TOKEN_KEY, token);
    store.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(REMEMBER_KEY, rememberMe ? "1" : "0");
}

/** Read token from whichever storage holds it (session takes precedence for current tab). */
export function getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
}

/** Read user object from whichever storage holds it. */
export function getUser(): any | null {
    const raw = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/** Wipe all auth state. */
export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(REMEMBER_KEY);
}

/** Force-logout: clear and redirect to login page. */
export function forceLogout(reason?: string) {
    clearAuth();
    if (reason) {
        // Stash the reason so the login page can display it after redirect
        sessionStorage.setItem("logoutReason", reason);
    }
    // Use full page navigation so all React state is reset
    window.location.href = "/";
}

/** Number of milliseconds until the current token expires, or 0 if expired/missing. */
export function msUntilExpiry(): number {
    const token = getToken();
    if (!token) return 0;
    const payload = decodeJwt(token);
    if (!payload || !payload.exp) return 0;
    return Math.max(0, payload.exp * 1000 - Date.now());
}

/**
 * Set up a global expiry watcher.
 * Call this once at app startup (or in a top-level component).
 * It will:
 *   - check immediately
 *   - re-check every minute
 *   - schedule a force-logout right when the current token expires
 */
export function startAuthWatcher() {
    const checkAndScheduleLogout = () => {
        const token = getToken();
        if (!token) return; // not logged in, nothing to watch

        if (isTokenExpired(token)) {
            forceLogout("Session expired. Please log in again.");
            return;
        }

        const ms = msUntilExpiry();
        if (ms > 0 && ms < 60_000) {
            // Token expires within the next minute — schedule a precise logout
            setTimeout(() => {
                if (isTokenExpired(getToken())) {
                    forceLogout("Session expired. Please log in again.");
                }
            }, ms + 100);
        }
    };

    checkAndScheduleLogout();
    const interval = setInterval(checkAndScheduleLogout, 60_000);
    return () => clearInterval(interval);
}

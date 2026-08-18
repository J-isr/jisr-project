import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "jisr:code-mode";
const EVENT = "jisr:code-mode-change";

function apply(enabled: boolean) {
  document.documentElement.toggleAttribute("data-code-mode", enabled);
}

/** Session-persisted developer / code-inspired presentation mode. */
export function useCodeMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY) === "on";
    setEnabled(stored);
    apply(stored);

    const sync = () => setEnabled(window.sessionStorage.getItem(STORAGE_KEY) === "on");
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const toggle = useCallback(() => {
    const next = window.sessionStorage.getItem(STORAGE_KEY) !== "on";
    window.sessionStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    apply(next);
    setEnabled(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { enabled, toggle };
}

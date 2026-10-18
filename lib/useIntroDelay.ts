import { useState } from "react";

/** First visit waits for the preloader curtain to lift; later visits start almost immediately. */
export function useIntroDelay() {
  const [delay] = useState(() => {
    if (typeof window === "undefined") return 1.3;
    try {
      return sessionStorage.getItem("pl-seen") ? 0.15 : 1.3;
    } catch {
      return 0.15;
    }
  });
  return delay;
}

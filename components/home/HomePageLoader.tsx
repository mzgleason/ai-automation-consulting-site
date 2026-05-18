"use client";

import { useEffect, useState } from "react";
import styles from "./HomePageLoader.module.css";

const ANIMATION_MS = 3000;
const HOLD_MS = 1000;
const EXIT_MS = 2000;

export function HomePageLoader({ children }: { children: React.ReactNode }) {
  const [shouldShowLoader, setShouldShowLoader] = useState<boolean | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const loaderSeen = window.sessionStorage.getItem("homeLoaderSeen") === "true";
    const referrer = document.referrer;
    let isInternalReferrer = false;
    if (referrer) {
      try {
        isInternalReferrer = new URL(referrer).origin === window.location.origin;
      } catch {
        isInternalReferrer = false;
      }
    }

    const showLoader = !isInternalReferrer && !loaderSeen;
    setShouldShowLoader(showLoader);

    if (!showLoader) {
      setIsHidden(true);
      document.body.dataset.homeLoaderComplete = "true";
      window.dispatchEvent(new Event("home-loader-complete"));
      return;
    }

    document.body.dataset.homeLoaderComplete = "false";

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, ANIMATION_MS + HOLD_MS);

    const hideTimer = window.setTimeout(() => {
      setIsHidden(true);
      window.sessionStorage.setItem("homeLoaderSeen", "true");
      document.body.dataset.homeLoaderComplete = "true";
      window.dispatchEvent(new Event("home-loader-complete"));
    }, ANIMATION_MS + HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {shouldShowLoader && !isHidden ? (
        <div
          className={`${styles.overlay} ${isExiting ? styles.overlayExit : ""}`.trim()}
          role="status"
          aria-live="polite"
          aria-label="Loading homepage"
        >
          <div className={styles.mark} aria-hidden="true">
            <span className={`${styles.letter} ${styles.m}`}>M</span>
            <span className={`${styles.letter} ${styles.z}`}>Z</span>
            <span className={`${styles.letter} ${styles.g}`}>G</span>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}

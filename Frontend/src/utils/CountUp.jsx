import React, { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 1.5,
  animation = "easeOut",
  color = "inherit",
  prefix = "",
  suffix = "",
  className = "",
  onComplete,
  start = true, // 👈 NEW: animation only runs when this is true
}) {
  const [display, setDisplay] = useState(0);
  const prevValueRef = useRef(0);
  const startTsRef = useRef(undefined);
  const rafRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const easings = useRef({
    linear: (t) => t,
    easeOut: (t) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  }).current;

  useEffect(() => {
    if (!start) return; // 👈 wait until start is true
    const endVal = Number(value) || 0;
    const startVal = prevValueRef.current;

    if (prefersReducedMotion) {
      cancelAnimationFrame(rafRef.current);
      setDisplay(endVal);
      prevValueRef.current = endVal;
      onComplete?.();
      return;
    }

    if (startVal === endVal) return;

    const totalMs = Math.max(0, Number(duration) * 1000);
    const ease =
      typeof animation === "function"
        ? animation
        : easings[animation] || easings.easeOut;

    cancelAnimationFrame(rafRef.current);
    startTsRef.current = undefined;

    const step = (ts) => {
      if (startTsRef.current === undefined) startTsRef.current = ts;
      const elapsed = ts - startTsRef.current;
      const t = totalMs === 0 ? 1 : Math.min(1, elapsed / totalMs);
      const eased = ease(Math.min(1, Math.max(0, t)));
      const current = startVal + (endVal - startVal) * eased;
      setDisplay(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        prevValueRef.current = endVal;
        onComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration, animation, prefersReducedMotion, start]); // 👈 added start

  const decimals = countDecimals(value);
  const formatted = formatNumber(display, decimals);

  return (
    <span style={{ color }} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// Helpers
function countDecimals(n) {
  if (!isFinite(n)) return 0;
  const s = String(n);
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

function formatNumber(n, maxFractionDigits = 0) {
  try {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: maxFractionDigits,
      minimumFractionDigits: Math.min(maxFractionDigits, 2),
    }).format(n);
  } catch {
    return Number(n).toFixed(Math.min(maxFractionDigits, 2));
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(!!mql.matches);
    handler();
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

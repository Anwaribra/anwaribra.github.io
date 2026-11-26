"use client";
import { useId } from "react";
import styles from "./dock.module.css";

export type DockItem = { id: string; label: string; icon: React.ReactNode };
export function MaterialDock({
  items,
  value,
  onChange,
  label = "Preview navigation",
  showLabel = true,
}: {
  items: DockItem[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showLabel?: boolean;
}) {
  const labelId = useId();
  return (
    <div className={styles.wrap}>
      <div
        className={styles.dock}
        role="group"
        aria-label={label}
        aria-describedby={labelId}
      >
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-label={item.label}
            aria-pressed={value === item.id}
            onClick={() => onChange(item.id)}
            className={styles.item}
          >
            <span aria-hidden="true" className={styles.icon}>
              {item.icon}
            </span>
            <span className={styles.tooltip}>{item.label}</span>
          </button>
        ))}
      </div>
      {showLabel && <p id={labelId} className={styles.label} aria-live="polite">
        {items.find((item) => item.id === value)?.label ??
          "Choose a destination"}
      </p>}
    </div>
  );
}

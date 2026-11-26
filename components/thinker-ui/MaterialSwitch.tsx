"use client";
import { useId } from "react";
import styles from "./switch.module.css";

export function MaterialSwitch({
  checked,
  onChange,
  label = "Material mode",
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}) {
  const descriptionId = useId();
  return (
    <span className={styles.control}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.switch}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
      {description && (
        <span id={descriptionId} className={styles.description}>
          {description}
        </span>
      )}
    </span>
  );
}

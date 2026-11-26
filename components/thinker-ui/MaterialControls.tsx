"use client";
import { useId, useRef } from "react";
import styles from "./controls.module.css";

export function MaterialButton({
  children,
  onClick,
  disabled = false,
  busy = false,
  variant = "ivory",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  busy?: boolean;
  variant?: "ivory" | "graphite";
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${variant === "graphite" ? styles.graphite : ""}`}
      onClick={onClick}
      disabled={disabled || busy}
      aria-busy={busy}
    >
      {busy && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
export function MaterialInput({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  description,
  maxLength = 120,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  description?: string;
  maxLength?: number;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWell}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error || description ? `${id}-help` : undefined}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label={`Clear ${label.toLowerCase()}`}
          >
            ×
          </button>
        )}
      </div>
      {(error || description) && (
        <p id={`${id}-help`} className={error ? styles.error : styles.help}>
          {error || description}
        </p>
      )}
    </div>
  );
}
export function MaterialTabs({
  items,
  value,
  onChange,
  label = "Views",
}: {
  items: { id: string; label: string; content: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  // Async collections can remove the controlled selection. Keep one usable view
  // without changing the parent's value or firing a callback during render.
  const selected = items.some((item) => item.id === value)
    ? value
    : items[0]?.id;
  if (!items.length) return null;
  return (
    <div className={styles.tabsWrap}>
      <div role="tablist" aria-label={label} className={styles.tabs}>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            id={`${id}-tab-${item.id}`}
            role="tab"
            aria-selected={selected === item.id}
            aria-controls={`${id}-panel-${item.id}`}
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => {
              let next = index;
              if (e.key === "ArrowRight") next = (index + 1) % items.length;
              else if (e.key === "ArrowLeft")
                next = (index - 1 + items.length) % items.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = items.length - 1;
              else return;
              e.preventDefault();
              onChange(items[next].id);
              refs.current[next]?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          hidden={item.id !== selected}
          id={`${id}-panel-${item.id}`}
          aria-labelledby={`${id}-tab-${item.id}`}
          tabIndex={0}
          className={styles.panel}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
export function MaterialToast({
  title,
  description,
  onDismiss,
}: {
  title: string;
  description?: string;
  onDismiss: () => void;
}) {
  return (
    <div className={styles.toast}>
      <div role="status" className={styles.toastText}>
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
}

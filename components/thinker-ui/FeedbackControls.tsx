"use client";
import { useId, useState } from "react";
import s from "./feedback.module.css";
export function SoftAccordion({
  items,
  defaultOpen = true,
}: {
  items: { id: string; title: string; content: React.ReactNode }[];
  defaultOpen?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState<string | null>(defaultOpen ? items[0]?.id || null : null);
  return (
    <div className={s.accordion}>
      {items.map((item) => (
        <section key={item.id}>
          <h3>
            <button
              type="button"
              aria-expanded={open === item.id}
              aria-controls={`${id}-${item.id}`}
              onClick={() => setOpen(open === item.id ? null : item.id)}
            >
              {item.title}
              <span aria-hidden="true">{open === item.id ? "−" : "+"}</span>
            </button>
          </h3>
          <div
            id={`${id}-${item.id}`}
            hidden={open !== item.id}
            className={s.answer}
          >
            {item.content}
          </div>
        </section>
      ))}
    </div>
  );
}
export function ProgressRing({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className={s.ringWrap}>
      <div
        className={s.ring}
        role="progressbar"
        aria-label={label}
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ "--progress": `${v}%` } as React.CSSProperties}
      >
        <span>
          {v}
          <small>%</small>
        </span>
      </div>
      <p>{label}</p>
    </div>
  );
}
export function StorageMeter({
  used,
  total,
  unit = "GB",
  label,
}: {
  used: number;
  total: number;
  unit?: string;
  label: string;
}) {
  const ratio =
    total > 0 ? Math.max(0, Math.min(100, (used / total) * 100)) : 0;
  return (
    <div className={s.meter}>
      <div>
        <span>{label}</span>
        <strong>
          {used}{" "}
          <small>
            / {total} {unit}
          </small>
        </strong>
      </div>
      <meter min={0} max={total || 1} value={used} aria-label={label} />
      <p>{Math.round(ratio)}% used</p>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
  onAction,
}: {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className={s.empty}>
      <div className={s.emptyShape} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" onClick={onAction}>
        {action}
        <span aria-hidden="true"> ↗</span>
      </button>
    </div>
  );
}
export function LoadingSkeleton({
  label = "Loading preview",
}: {
  label?: string;
}) {
  return (
    <div className={s.skeleton} role="status">
      <div className={s.skeletonTile} />
      <div>
        <span />
        <span />
        <span />
      </div>
      <p>{label}</p>
    </div>
  );
}
export function InlineNotice({
  title,
  description,
  tone = "neutral",
  onDismiss,
}: {
  title: string;
  description: string;
  tone?: "neutral" | "success" | "warning";
  onDismiss?: () => void;
}) {
  return (
    <div className={`${s.notice} ${s[tone]}`}>
      <span className={s.noticeIcon} aria-hidden="true">
        {tone === "success" ? "✓" : tone === "warning" ? "!" : "i"}
      </span>
      <div role="status">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      {onDismiss && (
        <button type="button" aria-label="Dismiss notice" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  );
}
export function CopySnippet({
  text,
  label = "Copy command",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  return (
    <div className={s.snippetWrap}>
      <div className={s.snippet}>
        <code tabIndex={0}>{text}</code>
        <button
          type="button"
          aria-label={label}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setStatus("Copied.");
            } catch {
              setStatus("Copy failed. Select the text.");
            }
          }}
        >
          Copy
        </button>
      </div>
      <p role="status">{status || "Copy my email"}</p>
    </div>
  );
}
export function BreadcrumbTrail({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function PageControl({
  value,
  onChange,
  total,
}: {
  value: number;
  onChange: (page: number) => void;
  total: number;
}) {
  return (
    <nav className={s.pagination} aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        ←
      </button>
      <span aria-live="polite">
        {value} <small>of {total}</small>
      </span>
      <button
        type="button"
        aria-label="Next page"
        disabled={value >= total}
        onClick={() => onChange(value + 1)}
      >
        →
      </button>
    </nav>
  );
}

"use client";
import { useId } from "react";
import styles from "./agentic.module.css";

export type AgenticTone = "active" | "review" | "pending" | "blocked" | "new";

export function AgenticBadge({
  tone = "active",
  label,
}: {
  tone?: AgenticTone;
  label: string;
}) {
  return (
    <span className={`${styles.badge} ${styles[`badge-${tone}`]}`}>{label}</span>
  );
}

export function AgenticSetting({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const descriptionId = useId();
  return (
    <div className={styles.setting}>
      <span className={styles.settingText}>
        <span className={styles.settingLabel}>{label}</span>
        {description && (
          <span id={descriptionId} className={styles.settingDescription}>
            {description}
          </span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.track}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.knob} />
      </button>
    </div>
  );
}

export function AgenticButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  busy = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.action} ${variant === "secondary" ? styles.actionSecondary : styles.actionPrimary}`}
      onClick={onClick}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
    >
      {busy ? "Working…" : children}
    </button>
  );
}

export function AgenticSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "%",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  const id = useId();
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <div className={styles.slider}>
      <span className={styles.sliderHead}>
        <label htmlFor={id} className={styles.sliderLabel}>
          {label}
        </label>
        <output className={styles.sliderValue} htmlFor={id}>
          {value}
          {unit}
        </output>
      </span>
      <input
        id={id}
        type="range"
        className={styles.range}
        min={min}
        max={max}
        value={value}
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function AgenticTable({
  rows,
  caption = "Work, at a glance.",
}: {
  rows: {
    name: string;
    status: AgenticTone;
    statusLabel: string;
    progress: number;
    due: string;
    people: string[];
  }[];
  caption?: string;
}) {
  return (
    <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={caption}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Done</th>
            <th scope="col">Due</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" className={styles.cellName}>
                {row.name}
              </th>
              <td>
                <AgenticBadge tone={row.status} label={row.statusLabel} />
              </td>
              <td>
                <span className={styles.progress}>
                  <span className={styles.progressTrack}>
                    <span
                      className={styles.progressFill}
                      style={{ width: `${Math.min(100, Math.max(0, row.progress))}%` }}
                    />
                  </span>
                  <span className={styles.progressValue}>{row.progress}%</span>
                </span>
              </td>
              <td className={styles.cellMuted}>{row.due}</td>
              <td>
                <AvatarStack names={row.people} max={3} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideSteps({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  return (
    <section className={styles.guide} aria-label={title}>
      <h3 className={styles.guideTitle}>{title}</h3>
      <ol className={styles.guideList}>
        {steps.map((step, index) => (
          <li key={index} className={styles.guideStep}>
            <span className={styles.guideNumber} aria-hidden="true">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const AVATAR_TONES = ["gray", "orange", "pink", "blue", "green", "purple"] as const;

export function AvatarStack({
  names,
  max = 4,
}: {
  names: string[];
  max?: number;
}) {
  const shown = names.slice(0, Math.max(1, max));
  const rest = names.length - shown.length;
  return (
    <span className={styles.avatars} aria-label={names.join(", ")}>
      {shown.map((name, index) => {
        const initials = name
          .split(/\s+/)
          .map((part) => part[0] ?? "")
          .join("")
          .slice(0, 2)
          .toUpperCase();
        const tone = AVATAR_TONES[index % AVATAR_TONES.length];
        return (
          <span
            key={name}
            className={`${styles.avatar} ${styles[`avatar-${tone}`]}`}
            title={name}
            aria-hidden="true"
          >
            {initials}
          </span>
        );
      })}
      {rest > 0 && (
        <span className={`${styles.avatar} ${styles.avatarMore}`} aria-hidden="true">
          +{rest}
        </span>
      )}
    </span>
  );
}

export function StatDelta({
  label,
  value,
  delta,
  trend = "up",
}: {
  label: string;
  value: string;
  delta: string;
  trend?: "up" | "down";
}) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statRow}>
        <span className={styles.statValue}>{value}</span>
        <span
          className={`${styles.statDelta} ${trend === "up" ? styles.statUp : styles.statDown}`}
        >
          {trend === "up" ? "↑" : "↓"} {delta}
        </span>
      </span>
    </div>
  );
}

export function SegmentControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <span className={styles.segments} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.segment}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </span>
  );
}

const SEGMENT_COLORS = ["#2563eb", "#8b5cf6", "#f59e0b", "#facc15", "#22c55e", "#94a3b8"];

export function UsageMeter({
  label,
  total,
  segments,
}: {
  label: string;
  total: string;
  segments: { label: string; value: number }[];
}) {
  const used = segments.reduce((sum, segment) => sum + segment.value, 0);
  return (
    <div className={styles.usage}>
      <span className={styles.usageHead}>
        <span className={styles.usageLabel}>{label}</span>
        <span className={styles.usageTotal}>
          <strong>{used.toLocaleString()}</strong> of {total}
        </span>
      </span>
      <span
        className={styles.usageBar}
        role="img"
        aria-label={segments.map((segment) => `${segment.label} ${segment.value}`).join(", ")}
      >
        {segments.map((segment, index) => (
          <span
            key={segment.label}
            className={styles.usageSegment}
            style={{
              width: used > 0 ? `${(segment.value / used) * 100}%` : 0,
              background: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
            }}
          />
        ))}
      </span>
      <span className={styles.usageLegend}>
        {segments.map((segment, index) => (
          <span key={segment.label} className={styles.usageKey}>
            <span
              className={styles.usageDot}
              style={{ background: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
              aria-hidden="true"
            />
            {segment.label}
          </span>
        ))}
      </span>
    </div>
  );
}

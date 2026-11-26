"use client";
import { type CSSProperties, type ElementType, useState } from "react";
import s from "./text-motion.module.css";
/** A single short entrance, never a loop. The full text remains in the accessibility tree. */
export function SettlingText({
  text,
  as: Tag = "p",
  effect = "rise",
  pace = 45,
}: {
  text: string;
  as?: "p" | "h2" | "h3";
  effect?: "rise" | "soft";
  pace?: number;
}) {
  const words = text.split(/(\s+)/);
  let index = 0;
  const Element: ElementType = Tag;
  return (
    <Element className={s.text} data-effect={effect}>
      <span className={s.srOnly}>{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) =>
          /^\s+$/.test(word) ? (
            word
          ) : (
            <span
              className={s.word}
              key={i}
              style={
                {
                  "--word-delay": `${Math.min(400, index++ * Math.max(0, Math.min(80, pace)))}ms`,
                } as CSSProperties
              }
            >
              {word}
            </span>
          ),
        )}
      </span>
    </Element>
  );
}
export function TextMotionDemo() {
  const [effect, setEffect] = useState<"rise" | "soft">("rise");
  const [pace, setPace] = useState(45);
  const [take, setTake] = useState(0);
  const [text, setText] = useState("An idea starts with a little room.");
  return (
    <div className={s.demo}>
      <div className={s.settings}>
        <label>
          Movement
          <select
            aria-label="Movement"
            value={effect}
            onChange={(e) => {
              setEffect(e.target.value as "rise" | "soft");
              setTake((t) => t + 1);
            }}
          >
            <option value="rise">Rise into place</option>
            <option value="soft">Come into focus</option>
          </select>
        </label>
        <label>
          Word spacing in time <output>{pace} ms</output>
          <input
            type="range"
            aria-label="Word delay"
            min={0}
            max={80}
            step={5}
            value={pace}
            onChange={(e) => setPace(Number(e.target.value))}
          />
        </label>
      </div>
      <label className={s.textField}>
        Your words <span>{text.length} / 180</span>
        <textarea
          value={text}
          maxLength={180}
          onChange={(event) => setText(event.target.value)}
          rows={2}
          placeholder="Give a thought some room."
        />
      </label>
      <div className={s.stage}>
        {text.trim() ? (
          <SettlingText
            key={`${take}-${pace}`}
            text={text}
            effect={effect}
            pace={pace}
          />
        ) : (
          <p className={s.empty}>Add a few words to preview their entrance.</p>
        )}
      </div>
      <button
        type="button"
        className={s.replay}
        disabled={!text.trim()}
        onClick={() => setTake((t) => t + 1)}
      >
        Replay entrance <span aria-hidden="true">↺</span>
      </button>
      <p className={s.note}>
        A short entrance, not an endless performance.
        <br />
        Reduced motion shows the words at rest.
      </p>
    </div>
  );
}

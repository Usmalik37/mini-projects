import { useState } from 'react'

const handwritten = `'Caveat', cursive`;
const serif = `'Lora', serif`;
const sans = `'Inter', sans-serif`;

const themes = {
  light: {
    name: "Light Mode",
    bg: "#f5f0e8",
    paper: "#faf7f1",
    text: "#2a2118",
    muted: "#7a6e62",
    faint: "#c8bfb0",
    accent: "#3a6073",
    accentWarm: "#c2602a",
    accentGold: "#b8860b",
    ink: "#1a1410",
    rule: "rgba(60,50,40,0.12)",
    stickyBg: "#f9e8a0",
    cardBg: "#fde8d8",
    sliderTrack: "#eee8da"
  },
  dark: {
    name: "Linear Dark",
    bg: "#07080e",
    paper: "#0f111a",
    text: "#b0b4c0",
    muted: "#62677a",
    faint: "#222533",
    accent: "#5c7cfa",
    accentWarm: "#ff6b6b",
    accentGold: "#fcc419",
    ink: "#f1f3f5",
    rule: "rgba(255,255,255,0.05)",
    stickyBg: "#121420",
    cardBg: "#1a1d2e",
    sliderTrack: "#1c1f30"
  },
  organic: {
    name: "Organic Dark",
    bg: "#141614",
    paper: "#1b1e1b",
    text: "#c2c9c3",
    muted: "#6b756d",
    faint: "#2c332e",
    accent: "#74b886",
    accentWarm: "#d96b43",
    accentGold: "#e0a13c",
    ink: "#ecf0ec",
    rule: "rgba(255,255,255,0.04)",
    stickyBg: "#232824",
    cardBg: "#2b251d",
    sliderTrack: "#252b27"
  }
};

function Underline({ color, width = 120 }) {
  return (
    <svg viewBox={`0 0 ${width} 8`} width={width} height={8} style={{ display: "block", marginTop: -2 }}>
      <path
        d={`M2,5 Q${width * 0.25},2 ${width * 0.5},5 Q${width * 0.75},8 ${width - 2},4`}
        stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round"
        style={{ opacity: 0.7 }}
      />
    </svg>
  );
}

function RuledPaper({ theme, children, style }) {
  return (
    <div style={{
      background: theme.paper,
      backgroundImage: `repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 27px,
        ${theme.rule} 28px
      )`,
      borderRadius: 20,
      padding: "36px 40px",
      position: "relative",
      boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      transition: "background 0.3s, background-image 0.3s",
      ...style
    }}>
      <div style={{
        position: "absolute", left: 68, top: 0, bottom: 0,
        width: 1, background: theme.accentWarm, opacity: 0.2
      }} />
      {children}
    </div>
  );
}

function Annotation({ text, theme, top = 0 }) {
  return (
    <div style={{
      position: "absolute", left: 0, top,
      width: 60, textAlign: "right",
      fontFamily: handwritten, fontSize: 13,
      color: theme.accentWarm, opacity: 0.8,
      lineHeight: 1.3, paddingRight: 8,
      transform: "rotate(-2deg)"
    }}>{text}</div>
  );
}

function StickyNote({ theme, children, rotate = -1.5 }) {
  return (
    <div style={{
      background: theme.stickyBg,
      border: `1px solid ${theme.faint}`,
      borderRadius: "2px 14px 14px 2px",
      padding: "14px 18px",
      fontFamily: handwritten,
      fontSize: 17,
      lineHeight: 1.6,
      color: theme.text,
      transform: `rotate(${rotate}deg)`,
      boxShadow: "2px 4px 12px rgba(0,0,0,0.12)",
      margin: "24px 0",
      maxWidth: 340,
      transition: "background 0.3s, border-color 0.3s"
    }}>{children}</div>
  );
}

function ChapterLabel({ n, theme }) {
  return (
    <div style={{
      fontFamily: handwritten, fontSize: 14,
      color: theme.muted, letterSpacing: 1,
      marginBottom: 6, display: "flex", alignItems: "center", gap: 8
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <circle cx="9" cy="9" r="8" stroke={theme.faint} strokeWidth="1.5" fill="none" />
        <text x="9" y="13" textAnchor="middle" fontSize="10" fill={theme.muted} fontFamily="serif">{n}</text>
      </svg>
      Part {n}
    </div>
  );
}

function Heading({ children, theme, size = 32 }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: size,
      fontWeight: 700,
      color: theme.ink,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
      margin: "0 0 20px",
    }}>{children}</h2>
  );
}

function Prose({ children, theme, style }) {
  return (
    <p style={{
      fontFamily: serif,
      fontSize: 17,
      lineHeight: 1.9,
      color: theme.text,
      margin: "0 0 16px",
      ...style
    }}>{children}</p>
  );
}

function ScratchReveal({ question, answer, theme }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={{ margin: "22px 0" }}>
      <div style={{ fontFamily: handwritten, fontSize: 16, color: theme.muted, marginBottom: 8 }}>
        ✏️ Scribble your thoughts down first
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={{
          fontFamily: serif, fontSize: 16, lineHeight: 1.8,
          padding: "14px 20px", background: theme.bg,
          border: `1.5px dashed ${theme.faint}`, borderRadius: 12,
          color: revealed ? theme.text : "transparent",
          minWidth: 260, transition: "color 0.4s"
        }}>{answer}</div>
        {!revealed && (
          <div
            onClick={() => setRevealed(true)}
            style={{
              position: "absolute", inset: 0,
              background: `repeating-linear-gradient(135deg, ${theme.faint} 0px, ${theme.faint} 2px, transparent 2px, transparent 10px)`,
              borderRadius: 12, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: handwritten, fontSize: 16, color: theme.muted
            }}>
            Tap to scratch off the ink
          </div>
        )}
      </div>
      <div style={{ fontFamily: serif, fontSize: 15, color: theme.muted, marginTop: 10 }}>{question}</div>
    </div>
  );
}

function SortCards({ items, theme, expectedOrder, successMessage }) {
  const [order, setOrder] = useState(() => [...items].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);

  const swap = (i) => {
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }
    const next = [...order];
    [next[selected], next[i]] = [next[i], next[selected]];
    setOrder(next);
    setSelected(null);
    if (next.every((v, idx) => v === expectedOrder[idx])) { setCorrect(true); }
  };

  return (
    <div>
      <div style={{ fontFamily: handwritten, fontSize: 15, color: theme.muted, marginBottom: 12 }}>
        Tap two blocks to swap them. Put this sequence in the proper order.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
        {order.map((item, i) => (
          <div key={item} onClick={() => swap(i)} style={{
            padding: "12px 18px",
            border: `1.5px solid ${selected === i ? theme.accentWarm : theme.faint}`,
            borderRadius: 10,
            fontFamily: serif, fontSize: 15,
            background: selected === i ? theme.cardBg : theme.paper,
            cursor: "pointer",
            boxShadow: selected === i ? `0 0 0 3px ${theme.accentWarm}33` : "none",
            transition: "all 0.2s",
            color: theme.text,
          }}>{item}</div>
        ))}
      </div>
      {correct && (
        <div style={{
          fontFamily: handwritten, fontSize: 18, color: theme.accent,
          marginTop: 14, transform: "rotate(-0.5deg)"
        }}>{successMessage}</div>
      )}
    </div>
  );
}

function HighlightText({ segments, theme }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.9, color: theme.text }}>
      {segments.map((seg, i) =>
        seg.highlight ? (
          <span key={i} style={{ position: "relative" }}>
            <span
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background: active === i ? theme.accentGold + "44" : theme.accentGold + "18",
                borderBottom: `2px solid ${theme.accentGold}`,
                cursor: "pointer",
                borderRadius: 3,
                padding: "1px 2px",
                transition: "background 0.2s"
              }}>
              {seg.text}
            </span>
            {active === i && seg.note && (
              <span style={{
                position: "absolute", bottom: "calc(100% + 6px)", left: 0,
                background: theme.paper,
                border: `1px solid ${theme.accentGold}`,
                borderRadius: 10, padding: "8px 14px",
                fontFamily: handwritten, fontSize: 15,
                color: theme.text, zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}>{seg.note}</span>
            )}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </div>
  );
}

function SleepSlider({ label, min, max, value, theme, onChange, unit = "", description }) {
  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ fontFamily: handwritten, fontSize: 17, color: theme.ink, fontWeight: 700, marginBottom: 4 }}>
        {label}: {value}{unit}
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: theme.accent, marginBottom: 8 }} />
      <div style={{ 
        fontFamily: handwritten, 
        fontSize: 15, 
        color: theme.accent, 
        background: theme.bg, 
        padding: "8px 12px", 
        borderRadius: 8,
        borderLeft: `3px solid ${theme.accent}`
      }}>
        {description}
      </div>
    </div>
  );
}

function CycleVisualizer({ hours, theme }) {
  const cycles = Math.floor(hours / 1.5);
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ fontFamily: handwritten, fontSize: 14, color: theme.muted, marginBottom: 8 }}>
        Visual breakdown of your 90-minute sleep architectural waves:
      </div>
      <svg viewBox="0 0 400 60" width="100%" height="60" style={{ background: theme.bg, borderRadius: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const isCompleted = i < cycles;
          const xStart = i * 65 + 10;
          return (
            <g key={i} style={{ opacity: isCompleted ? 1 : 0.2, transition: "opacity 0.3s" }}>
              <path d={`M ${xStart} 30 Q ${xStart + 15} 5 ${xStart + 30} 30 T ${xStart + 60} 30`} 
                fill="none" stroke={theme.accent} strokeWidth="2.5" />
              <circle cx={xStart + 30} cy={17} r="3" fill={theme.accentGold} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function App() {
  const [currentThemeKey, setCurrentThemeKey] = useState('light');
  const theme = themes[currentThemeKey];

  const [sleepHours, setSleepHours] = useState(7);
  const [screenTime, setScreenTime] = useState(0);

  // Clear definitions matching the slider positions directly
  let sleepDescription = "About 4 full cycles. Your brain processes basic memories, but emotional editing is shortchanged.";
  if (sleepHours <= 5) sleepDescription = "Dangerous deficit. You miss out entirely on late-morning REM sleep. Alertness drops by 30%.";
  if (sleepHours >= 8) sleepDescription = "5 complete cycles. Optimal deep repair and maximum emotional regulation achieved.";

  let screenDescription = "Perfect. Natural melatonin production starts climbing right on time as the sun goes down.";
  if (screenTime > 0 && screenTime <= 60) screenDescription = "Minor delay. The blue light tricks your brain into shifting your internal biological clock back by roughly 30 minutes.";
  if (screenTime > 60) screenDescription = "Severe disruption. Melatonin production is actively suppressed. It will take significantly longer to drop into deep Stage 3 sleep.";

  const recoveryScore = Math.max(10, Math.min(100, (sleepHours * 12) - (screenTime * 0.3)));

  return (
    <div style={{
      background: theme.bg,
      minHeight: "100vh",
      padding: "32px 16px 64px",
      fontFamily: serif,
      color: theme.text,
      transition: "background 0.3s, color 0.3s"
    }}>
      
      {/* THEME SWITCHER */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
        {Object.keys(themes).map((key) => (
          <button
            key={key}
            onClick={() => setCurrentThemeKey(key)}
            style={{
              padding: "8px 16px",
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 8,
              border: `1.5px solid ${currentThemeKey === key ? theme.accent : theme.faint}`,
              background: currentThemeKey === key ? theme.paper : "transparent",
              color: currentThemeKey === key ? theme.ink : theme.muted,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {themes[key].name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* COVER */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: handwritten, fontSize: 15, letterSpacing: 2, color: theme.muted, marginBottom: 12 }}>
            A Personal Lab Notebook
          </div>
          <h1 style={{
            fontFamily: serif, fontSize: 52, lineHeight: 1.1,
            letterSpacing: "-0.03em", color: theme.ink, margin: "0 0 12px"
          }}>
            The Architecture of<br />
            <span style={{ fontStyle: "italic" }}>Human Sleep</span>
          </h1>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Underline color={theme.accentWarm} width={240} />
          </div>
          <Prose theme={theme} style={{ maxWidth: 500, margin: "0 auto", fontSize: 16, color: theme.muted }}>
            An interactive journal tracking what happens when your brain goes offline, and how small nighttime choices change your morning state.
          </Prose>
        </div>

        {/* PART 1 */}
        <RuledPaper theme={theme} style={{ marginBottom: 40 }}>
          <div style={{ paddingLeft: 28 }}>
            <Annotation text="part 1" theme={theme} top={36} />
            <ChapterLabel n={1} theme={theme} />
            <Heading theme={theme}>The 90-Minute Wave</Heading>

            <HighlightText theme={theme} segments={[
              { text: "Your brain does not just rest when you close your eyes. It moves through repeating patterns. " },
              { text: "True physical recovery happens during deep NREM sleep", highlight: true, note: "Stage 3 sleep where tissue restores" },
              { text: ", which dominates the first half of the night. If you cut your sleep short, you primarily rob yourself of " },
              { text: "REM cycles", highlight: true, note: "Rapid Eye Movement — critical for processing emotion" },
              { text: ", leaving you emotionally volatile the following day." },
            ]} />

            <StickyNote theme={theme} rotate={1}>
              🛌 Sleep quality is built on cycles, not just hours. Waking up at the end of a 90-minute wave leaves you feeling completely refreshed, while waking up in the middle of deep sleep leaves you groggy.
            </StickyNote>

            <SleepSlider
              label="Total Sleep Duration"
              min={4} max={9} value={sleepHours} unit=" hours" theme={theme}
              onChange={setSleepHours}
              description={sleepDescription}
            />

            <CycleVisualizer hours={sleepHours} theme={theme} />

            <ScratchReveal
              theme={theme}
              question="Why do you remember your dreams vividly only right before waking up?"
              answer="REM sleep cycles lengthen significantly during the final hours of a night's sleep. Your early morning hours are almost entirely comprised of dream-heavy REM states."
            />
          </div>
        </RuledPaper>

        {/* PART 2 */}
        <RuledPaper theme={theme} style={{ marginBottom: 40 }}>
          <div style={{ paddingLeft: 28 }}>
            <Annotation text="part 2" theme={theme} top={36} />
            <ChapterLabel n={2} theme={theme} />
            <Heading theme={theme}>The Melatonin Switch</Heading>

            <Prose theme={theme}>
              As daylight vanishes, specialized receptors in your eyes signal your brain to release melatonin, dropping your internal core body temperature and prepping your muscles to rest.
            </Prose>

            <SleepSlider
              label="Screen Exposure in Bed"
              min={0} max={120} value={screenTime} unit=" minutes" theme={theme}
              onChange={setScreenTime}
              description={screenDescription}
            />

            <div style={{ margin: "28px 0" }}>
              <Prose theme={theme}>
                <strong>Biological Priority:</strong> Use the blocks below to organize your natural evening wind-down rhythm into the order your metabolism naturally expects.
              </Prose>
              <SortCards
                theme={theme}
                items={[
                  "Core temperature drops to match room climate",
                  "Melatonin release reaches peak concentration",
                  "Heart rate stabilizes to basal metabolic rate",
                  "Brain enters initial light synchronization wave"
                ]}
                expectedOrder={[
                  "Core temperature drops to match room climate",
                  "Melatonin release reaches peak concentration",
                  "Heart rate stabilizes to basal metabolic rate",
                  "Brain enters initial light synchronization wave"
                ]}
                successMessage="✓ Correct sequence. This natural temperature drop triggers the metabolic shift required for continuous, uninterrupted sleep."
              />
            </div>
          </div>
        </RuledPaper>

        {/* PART 3 */}
        <RuledPaper theme={theme}>
          <div style={{ paddingLeft: 28 }}>
            <Annotation text="metrics" theme={theme} top={36} />
            <ChapterLabel n={3} theme={theme} />
            <Heading theme={theme} size={28}>Calculated Morning Readiness</Heading>

            <Prose theme={theme}>
              This score aggregates your total cycle count and your evening blue-light exposure to estimate your functional capacity for the day ahead.
            </Prose>

            <div style={{
              border: `1.5px dashed ${theme.faint}`,
              borderRadius: 18, padding: "28px 32px", margin: "20px 0"
            }}>
              <div style={{ fontFamily: handwritten, fontSize: 64, lineHeight: 1, color: theme.ink, letterSpacing: "-0.04em", marginBottom: 4 }}>
                {Math.round(recoveryScore)}%
              </div>
              <div style={{ 
                fontFamily: handwritten, 
                fontSize: 19, 
                color: recoveryScore > 75 ? theme.accent : recoveryScore > 50 ? theme.accentGold : theme.accentWarm, 
                marginBottom: 14 
              }}>
                {recoveryScore > 75 ? "Optimal Architecture" : recoveryScore > 50 ? "Compromised Efficiency" : "Impaired Alertness Corridor"}
              </div>
              <div style={{ height: 12, borderRadius: 999, border: `1.5px solid ${theme.faint}`, background: theme.sliderTrack, overflow: "hidden" }}>
                <div style={{ width: `${recoveryScore}%`, height: "100%", background: recoveryScore > 75 ? theme.accent : recoveryScore > 50 ? theme.accentGold : theme.accentWarm, borderRadius: 999, transition: "width 0.5s ease" }} />
              </div>
            </div>

            <div style={{ fontFamily: handwritten, fontSize: 17, color: theme.muted, lineHeight: 1.8, marginTop: 8 }}>
              {recoveryScore > 75
                ? "→ Your data indicates fully completed repair cycles. Your prefrontal cortex is cleared for intense creative work."
                : recoveryScore > 50
                ? "→ You will survive the day fine, but you will hit a notable cognitive wall roughly 7 hours after waking."
                : "→ Severe cycle fragmentation. Relying on heavy caffeine today will likely worsen tonight's sleep onset."}
            </div>
          </div>
        </RuledPaper>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: 48, fontFamily: handwritten, fontSize: 15, color: theme.muted, opacity: 0.6 }}>
          <div>Sleep is the price we pay for waking memory. Protect it.</div>
        </div>
      </div>
    </div>
  );
}
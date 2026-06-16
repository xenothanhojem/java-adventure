import React, { useMemo, useState } from 'react';
import { ChevronLeft, TrendingUp, BookOpen, Skull } from 'lucide-react';
import { getSubjectModule } from '../subjects/index.js';

/*
 * Progress dashboard. Aggregates skillStats into per-unit mastery summaries,
 * surfaces weak areas, and shows recent activity over time.
 */

function masteryRank(state) {
  return ['notStarted', 'introduced', 'practising', 'secure', 'mastered'].indexOf(state);
}

function summariseUnit(unitId, skillStats, SKILLS, deriveMastery) {
  const unitSkills = Object.entries(SKILLS).filter(([, s]) => s.unit === unitId);
  if (unitSkills.length === 0) {
    return { unitId, total: 0, mastered: 0, secure: 0, practising: 0, introduced: 0, notStarted: 0, percent: 0, byState: {} };
  }
  let totalRank = 0;
  const byState = { mastered: 0, secure: 0, practising: 0, introduced: 0, notStarted: 0 };
  for (const [id] of unitSkills) {
    const m = deriveMastery(skillStats[id]);
    byState[m] += 1;
    totalRank += masteryRank(m);
  }
  // Max possible rank = unitSkills.length * 4 (mastered = rank 4)
  const percent = Math.round((totalRank / (unitSkills.length * 4)) * 100);
  return {
    unitId,
    total: unitSkills.length,
    mastered: byState.mastered,
    secure: byState.secure,
    practising: byState.practising,
    introduced: byState.introduced,
    notStarted: byState.notStarted,
    percent,
    byState,
  };
}

function summariseGroup(group, skillStats, deriveMastery) {
  const states = group.skills.map((id) => deriveMastery(skillStats[id]));
  const ranks = states.map(masteryRank);
  const avgRank = ranks.length ? ranks.reduce((a, b) => a + b, 0) / ranks.length : 0;
  const percent = Math.round((avgRank / 4) * 100);
  return { ...group, percent, states };
}

function Sparkline({ history, width = 90, height = 22 }) {
  const pts = (history || []).slice(-10);
  if (pts.length === 0) {
    return (
      <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)', width, height, display: 'flex', alignItems: 'center' }}>
        no data
      </div>
    );
  }
  const w = width;
  const h = height;
  const step = pts.length > 1 ? w / (pts.length - 1) : w;
  const dots = pts.map((p, i) => ({ x: i * step, y: p.c ? 2 : h - 2, c: p.c }));
  return (
    <svg width={w} height={h} className="block">
      <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="var(--line-2)" strokeWidth="1" strokeDasharray="2 3" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.5" fill={d.c ? 'var(--emerald)' : 'var(--coral)'} />
      ))}
    </svg>
  );
}

function MasteryBadge({ state, masteryColor, masteryLabel }) {
  const color = masteryColor[state];
  const label = masteryLabel[state];
  return (
    <span
      className="ja-mono text-xs px-2 py-0.5 rounded-md"
      style={{
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}

function UnitCard({ summary, expanded, onToggle, skillStats, units, skills, deriveMastery, masteryColor, masteryLabel }) {
  const unit = units[summary.unitId];
  if (!unit) return null;
  return (
    <div className="ja-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-center justify-between hover:opacity-95"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center ja-mono text-sm"
            style={{ background: 'var(--panel-2)', border: '1px solid var(--line)', color: 'var(--cyan)' }}
          >
            {unit.id}
          </div>
          <div>
            <div className="ja-display text-lg" style={{ fontWeight: 700 }}>{unit.name}</div>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
              {summary.mastered} mastered · {summary.secure} secure · {summary.practising} practising · {summary.introduced} introduced · {summary.notStarted} not started
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="ja-display text-2xl" style={{ fontWeight: 800, color: 'var(--cyan)' }}>{summary.percent}%</div>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>mastery</div>
          </div>
        </div>
      </button>
      <div className="px-5">
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
          <div
            className="h-full"
            style={{
              width: `${summary.percent}%`,
              background: 'linear-gradient(90deg, var(--cyan), var(--emerald))',
            }}
          />
        </div>
      </div>
      {expanded && (
        <div className="p-5 pt-4 border-t mt-4" style={{ borderColor: 'var(--line)' }}>
          <div className="grid gap-2">
            {Object.entries(skills)
              .filter(([, s]) => s.unit === summary.unitId)
              .map(([id, s]) => {
                const stat = skillStats[id];
                const mState = deriveMastery(stat);
                const total = (stat?.correct || 0) + (stat?.wrong || 0);
                const acc = total > 0 ? Math.round(((stat?.correct || 0) / total) * 100) : 0;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
                    style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{id}</span>
                        <span className="text-sm truncate" style={{ color: 'var(--ink)' }}>{s.name}</span>
                      </div>
                      <div className="ja-mono text-xs mt-0.5" style={{ color: 'var(--ink-mute)' }}>
                        {total > 0 ? `${stat.correct}/${total} correct (${acc}%)` : 'not attempted yet'}
                      </div>
                    </div>
                    <Sparkline history={stat?.history} />
                    <MasteryBadge state={mState} masteryColor={masteryColor} masteryLabel={masteryLabel} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

function WeakAreas({ skillStats, skills }) {
  const weak = useMemo(() => {
    const entries = [];
    for (const [id, s] of Object.entries(skills)) {
      const stat = skillStats[id];
      if (!stat) continue;
      const total = (stat.correct || 0) + (stat.wrong || 0);
      if (total < 3) continue;
      const acc = (stat.correct || 0) / total;
      const last5 = (stat.history || []).slice(-5);
      const last5Acc = last5.length > 0 ? last5.filter((h) => h.c).length / last5.length : 1;
      if (acc < 0.7 || (last5.length >= 5 && last5Acc < 0.6)) {
        entries.push({ id, name: s.name, unit: s.unit, acc: Math.round(acc * 100), last5Acc: Math.round(last5Acc * 100) });
      }
    }
    entries.sort((a, b) => a.acc - b.acc);
    return entries.slice(0, 8);
  }, [skillStats]);

  if (weak.length === 0) {
    return (
      <div className="ja-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} style={{ color: 'var(--emerald)' }} />
          <div className="ja-display text-lg" style={{ fontWeight: 700 }}>Weak areas</div>
        </div>
        <div className="text-sm" style={{ color: 'var(--ink-dim)' }}>
          Nothing flagged. Keep mixing in new challenge types to keep your mastery sharp.
        </div>
      </div>
    );
  }

  return (
    <div className="ja-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={16} style={{ color: 'var(--coral)' }} />
        <div className="ja-display text-lg" style={{ fontWeight: 700 }}>Weak areas</div>
      </div>
      <div className="grid gap-2">
        {weak.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{w.id}</span>
                <span className="text-sm truncate" style={{ color: 'var(--ink)' }}>{w.name}</span>
              </div>
            </div>
            <div className="ja-mono text-xs" style={{ color: 'var(--coral)' }}>
              {w.last5Acc}% last 5 · {w.acc}% overall
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrossUnitGroups({ skillStats, skillGroups, deriveMastery }) {
  const groups = useMemo(
    () => Object.entries(skillGroups || {}).map(([key, g]) => ({ key, ...summariseGroup(g, skillStats, deriveMastery) })),
    [skillStats],
  );
  return (
    <div className="ja-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} style={{ color: 'var(--magenta)' }} />
        <div className="ja-display text-lg" style={{ fontWeight: 700 }}>Cross-unit groups</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {groups.map((g) => (
          <div
            key={g.key}
            className="px-4 py-3 rounded-lg"
            style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>Group {g.key}</div>
              <div className="ja-mono text-sm" style={{ color: 'var(--cyan)' }}>{g.percent}%</div>
            </div>
            <div className="text-sm" style={{ color: 'var(--ink)' }}>{g.name}</div>
            <div className="ja-mono text-xs mt-1" style={{ color: 'var(--ink-mute)' }}>{g.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityChart({ sessionHistory }) {
  const items = (sessionHistory || []).slice(-30);
  if (items.length === 0) {
    return (
      <div className="ja-card p-5">
        <div className="ja-display text-lg mb-2" style={{ fontWeight: 700 }}>Recent activity</div>
        <div className="text-sm" style={{ color: 'var(--ink-dim)' }}>No sessions yet. Complete a level to start tracking your trend.</div>
      </div>
    );
  }
  const maxBar = Math.max(...items.map((s) => s.total || 1));
  return (
    <div className="ja-card p-5">
      <div className="ja-display text-lg mb-3" style={{ fontWeight: 700 }}>Recent activity</div>
      <div className="flex items-end gap-1.5" style={{ height: '64px' }}>
        {items.map((s, i) => {
          const accuracy = s.total > 0 ? s.correctCount / s.total : 0;
          const heightPct = (s.total / maxBar) * 100;
          const color = accuracy >= 0.8 ? 'var(--emerald)' : accuracy >= 0.5 ? 'var(--amber)' : 'var(--coral)';
          return (
            <div
              key={i}
              title={`${new Date(s.t).toLocaleString()} - ${s.correctCount}/${s.total}`}
              style={{
                width: '10px',
                height: `${heightPct}%`,
                background: color,
                opacity: 0.85,
                borderRadius: '2px',
              }}
            />
          );
        })}
      </div>
      <div className="ja-mono text-xs mt-2 flex items-center justify-between" style={{ color: 'var(--ink-mute)' }}>
        <span>oldest</span>
        <span>{items.length} sessions</span>
        <span>most recent</span>
      </div>
    </div>
  );
}

function DoOrDieSummary({ doOrDieHistory }) {
  if (!doOrDieHistory || doOrDieHistory.length === 0) {
    return (
      <div className="ja-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Skull size={16} style={{ color: 'var(--coral)' }} />
          <div className="ja-display text-lg" style={{ fontWeight: 700 }}>Do or Die runs</div>
        </div>
        <div className="text-sm" style={{ color: 'var(--ink-dim)' }}>
          No timed runs yet. Pick a unit on the home screen and try a Do or Die scenario.
        </div>
      </div>
    );
  }
  // Best per scenario
  const bestByScenario = {};
  for (const r of doOrDieHistory) {
    const cur = bestByScenario[r.scenarioId];
    if (!cur || r.score > cur.score) bestByScenario[r.scenarioId] = r;
  }
  const items = Object.values(bestByScenario).sort((a, b) => b.score - a.score).slice(0, 6);
  return (
    <div className="ja-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Skull size={16} style={{ color: 'var(--coral)' }} />
        <div className="ja-display text-lg" style={{ fontWeight: 700 }}>Do or Die best runs</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {items.map((r) => (
          <div
            key={r.scenarioId}
            className="px-3 py-2 rounded-lg flex items-center justify-between"
            style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}
          >
            <div>
              <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{r.unitId} · {r.scenarioId}</div>
              <div className="text-sm" style={{ color: 'var(--ink)' }}>Grade {r.grade} · {Math.round(r.score)} pts</div>
            </div>
            <div className="ja-display text-2xl" style={{ fontWeight: 800, color: 'var(--amber)' }}>{r.grade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressReport({ subject = 'java', state, onBack }) {
  const registry = getSubjectModule(subject);
  const { UNITS, SKILLS, deriveMastery, MASTERY_LABEL, MASTERY_COLOR, SKILL_GROUPS } = registry;
  const skillStats = state.skillStats || {};
  const [expandedUnit, setExpandedUnit] = useState(null);

  const unitSummaries = useMemo(
    () => Object.values(UNITS)
      .sort((a, b) => a.number - b.number)
      .map((u) => summariseUnit(u.id, skillStats, SKILLS, deriveMastery)),
    [skillStats],
  );

  const overall = useMemo(() => {
    const total = unitSummaries.reduce((acc, s) => acc + s.total, 0);
    if (total === 0) return 0;
    const weighted = unitSummaries.reduce((acc, s) => acc + (s.percent * s.total), 0);
    return Math.round(weighted / total);
  }, [unitSummaries]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}
        >
          <ChevronLeft size={16} /> back
        </button>
        <div className="text-right">
          <div className="ja-display text-3xl" style={{ fontWeight: 800, color: 'var(--cyan)' }}>{overall}%</div>
          <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>overall mastery</div>
        </div>
      </div>

      <div>
        <div className="ja-display text-3xl mb-1" style={{ fontWeight: 800 }}>Your progress</div>
        <div className="ja-mono text-sm" style={{ color: 'var(--ink-mute)' }}>
          // mastery state per skill, weak areas, and recent sessions
        </div>
      </div>

      <ActivityChart sessionHistory={state.sessionHistory} />

      <WeakAreas skillStats={skillStats} skills={SKILLS} />

      <div>
        <div className="ja-mono text-xs mb-2" style={{ color: 'var(--ink-mute)' }}>// units</div>
        <div className="grid gap-3">
          {unitSummaries.map((s) => (
            <UnitCard
              key={s.unitId}
              summary={s}
              expanded={expandedUnit === s.unitId}
              onToggle={() => setExpandedUnit(expandedUnit === s.unitId ? null : s.unitId)}
              skillStats={skillStats}
              units={UNITS}
              skills={SKILLS}
              deriveMastery={deriveMastery}
              masteryColor={MASTERY_COLOR}
              masteryLabel={MASTERY_LABEL}
            />
          ))}
        </div>
      </div>

      {SKILL_GROUPS && <CrossUnitGroups skillStats={skillStats} skillGroups={SKILL_GROUPS} deriveMastery={deriveMastery} />}

      <DoOrDieSummary doOrDieHistory={state.doOrDieHistory} />
    </div>
  );
}

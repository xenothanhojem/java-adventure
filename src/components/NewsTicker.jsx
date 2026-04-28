import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

/*
 * Scrolling news ticker. Feeds in messages over time based on a schedule
 * (fractions of total run time). The most recently revealed message is
 * highlighted; older messages scroll past with reduced opacity.
 */

export default function NewsTicker({ messages, schedule, elapsedFraction }) {
  const [revealed, setRevealed] = useState(0);
  const lastRevealedRef = useRef(0);

  useEffect(() => {
    if (!schedule || schedule.length === 0) return;
    let next = 0;
    for (let i = 0; i < schedule.length; i += 1) {
      if (elapsedFraction >= schedule[i]) next = i + 1;
    }
    if (next !== lastRevealedRef.current) {
      lastRevealedRef.current = next;
      setRevealed(next);
    }
  }, [elapsedFraction, schedule]);

  const visibleMessages = messages.slice(0, revealed);
  const latest = visibleMessages[visibleMessages.length - 1];

  return (
    <div
      className="ja-card overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, rgba(255,122,122,0.12) 0%, rgba(214,138,255,0.08) 100%)',
        borderColor: 'rgba(255,122,122,0.3)',
      }}
    >
      <div className="flex items-stretch">
        <div
          className="flex items-center gap-2 px-3 py-2 ja-mono text-xs uppercase"
          style={{
            background: 'var(--coral)',
            color: '#0a0c12',
            fontWeight: 700,
            letterSpacing: '0.06em',
          }}
        >
          <Radio size={14} className="ja-pulse-coral" />
          live
        </div>
        <div className="flex-1 overflow-hidden relative">
          {latest ? (
            <div
              key={revealed}
              className="ja-mono text-sm whitespace-nowrap py-2 px-4 ja-ticker-slide"
              style={{ color: 'var(--ink)' }}
            >
              {latest}
            </div>
          ) : (
            <div className="ja-mono text-sm py-2 px-4" style={{ color: 'var(--ink-mute)' }}>
              awaiting transmission...
            </div>
          )}
        </div>
      </div>
      {visibleMessages.length > 1 && (
        <div
          className="px-4 py-2 border-t ja-mono text-xs space-y-1"
          style={{ borderColor: 'rgba(255,122,122,0.2)', color: 'var(--ink-mute)' }}
        >
          {visibleMessages.slice(0, -1).slice(-3).map((m, i) => (
            <div key={`${m}-${i}`} className="truncate" style={{ opacity: 0.6 }}>
              · {m}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

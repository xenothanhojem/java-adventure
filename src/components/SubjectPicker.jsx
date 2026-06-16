import React from 'react';
import { Code2, Briefcase, ArrowRight } from 'lucide-react';
import { SUBJECTS } from '../subjects/index.js';

export default function SubjectPicker({ onSelect }) {
  return (
    <div>
      <div className="mb-8 mt-2 text-center sm:text-left">
        <div className="ja-mono text-xs mb-2" style={{ color: 'var(--ink-mute)' }}>// choose_your_adventure</div>
        <h1 className="ja-display text-4xl sm:text-5xl mb-2" style={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          Pick a subject.<br />
          <span style={{ color: 'var(--ink-dim)' }}>Then make it make sense.</span>
        </h1>
        <p className="text-base mt-3 max-w-xl mx-auto sm:mx-0" style={{ color: 'var(--ink-dim)' }}>
          Grade 10 learning adventures. Theory, missions, levels, and practice tests.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.values(SUBJECTS).map((subject) => {
          const Icon = subject.id === 'java' ? Code2 : Briefcase;
          return (
            <button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              className={`ja-tile ja-card text-left p-6 ${subject.bgClass} ja-scanline relative overflow-hidden`}
              style={{ minHeight: 220 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${subject.glowClass}`}
                  style={{ background: 'rgba(0,0,0,0.3)', color: `var(--${subject.accentColor})` }}
                >
                  <Icon size={26} strokeWidth={2} />
                </div>
                <ArrowRight size={20} style={{ color: 'var(--ink-mute)' }} />
              </div>
              <div className="ja-display text-2xl mb-1" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                {subject.title}
              </div>
              <div className="ja-mono text-xs mb-3" style={{ color: `var(--${subject.accentColor})`, opacity: 0.85 }}>
                {subject.subtitle}
              </div>
              <p className="text-sm" style={{ color: 'var(--ink-dim)', lineHeight: 1.55 }}>
                {subject.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

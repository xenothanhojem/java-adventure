import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, ExternalLink, Copy, Check } from 'lucide-react';
import { TUTORS } from '../lib/teachPrompt.js';

/*
 * "Teach me" button: opens a menu that hands a prepared tutoring prompt to an
 * external AI chat in a new tab, or copies it to the clipboard.
 *
 * Props:
 *   getPrompt - () => string, built lazily when the menu is used
 *   label     - button text (default "Teach me")
 *   compact   - icon-only button for use inside list rows
 *   color     - CSS colour variable name for the button accent
 */
export default function TeachMe({ getPrompt, label = 'Teach me', compact = false, color = 'cyan' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function openTutor(tutor) {
    window.open(tutor.url(getPrompt()), '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(getPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt('Copy this prompt:', getPrompt());
    }
  }

  const accent = `var(--${color})`;

  return (
    <div ref={rootRef} className="relative inline-block flex-shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`ja-mono text-xs rounded-lg flex items-center gap-1.5 hover:opacity-90 ${compact ? 'px-2 py-1.5' : 'px-3 py-2'}`}
        style={{
          border: `1px solid color-mix(in srgb, ${accent} 45%, transparent)`,
          background: `color-mix(in srgb, ${accent} 10%, transparent)`,
          color: accent,
          fontWeight: 600,
        }}
        title="Get an AI tutor to teach you this"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <GraduationCap size={14} />
        {!compact && <span>{label}</span>}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 z-30 w-52 rounded-xl p-1.5"
          style={{ background: 'var(--panel)', border: '1px solid var(--line-2)', boxShadow: '0 12px 32px -12px rgba(0,0,0,0.45)' }}
        >
          {TUTORS.map((t) => (
            <button
              key={t.id}
              role="menuitem"
              onClick={() => openTutor(t)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-left hover:opacity-90"
              style={{ color: 'var(--ink)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--panel-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {t.label}
              <ExternalLink size={13} style={{ color: 'var(--ink-mute)' }} />
            </button>
          ))}
          <div className="my-1" style={{ borderTop: '1px solid var(--line)' }} />
          <button
            role="menuitem"
            onClick={copyPrompt}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-left"
            style={{ color: 'var(--ink-dim)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--panel-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {copied ? 'Copied' : 'Copy prompt'}
            {copied ? <Check size={13} style={{ color: 'var(--emerald)' }} /> : <Copy size={13} style={{ color: 'var(--ink-mute)' }} />}
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Code2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

/*
 * Single-screen onboarding gate. Captures name / school / grade / email,
 * upserts via /api/users, and hands the resulting user back to App.
 *
 * Designed to feel like a mission deployment terminal rather than a form.
 */

const GRADES = ['8', '9', '10', '11', '12', 'Other'];

function emailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function OnboardingModal({ onComplete }) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('10');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = name.trim().length >= 2
    && school.trim().length >= 2
    && grade.trim().length > 0
    && emailValid(email.trim())
    && !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          school: school.trim(),
          grade: grade.trim(),
          email: email.trim().toLowerCase(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed (${res.status})`);
      }
      const data = await res.json();
      onComplete(data.user);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10, 12, 18, 0.85)', backdropFilter: 'blur(8px)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="ja-card w-full max-w-md p-6 sm:p-8 ja-glow-cyan"
        style={{ background: 'linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#5cf2ff,#a8c5ff)', color: '#0a0c12' }}
          >
            <Code2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="ja-mono text-xs uppercase" style={{ color: 'var(--cyan)', letterSpacing: '0.1em' }}>
              identify yourself
            </div>
            <div className="ja-display text-2xl" style={{ fontWeight: 800, lineHeight: 1.1 }}>
              Welcome to Java Adventure
            </div>
          </div>
        </div>

        <div className="ja-mono text-sm mb-6" style={{ color: 'var(--ink-mute)' }}>
          // your progress is saved to your account so you can pick up anywhere
        </div>

        <div className="space-y-3">
          <Field label="name" value={name} onChange={setName} autoFocus placeholder="Angelo" />
          <Field label="school" value={school} onChange={setSchool} placeholder="St David's Marist Inanda" />
          <SelectField label="grade" value={grade} onChange={setGrade} options={GRADES} />
          <Field
            label="email"
            value={email}
            onChange={setEmail}
            placeholder="angelo@example.com"
            type="email"
          />
        </div>

        {error && (
          <div
            className="ja-card mt-4 p-3 flex items-start gap-2"
            style={{ background: 'rgba(255,122,122,0.08)', borderColor: 'rgba(255,122,122,0.4)' }}
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--coral)' }} />
            <div className="text-sm" style={{ color: 'var(--ink-dim)' }}>{error}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full mt-5 ja-display text-base px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
            color: '#0a0c12',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}
        >
          {submitting ? <Loader2 size={16} className="ja-spin" /> : <ArrowRight size={16} />}
          {submitting ? 'connecting...' : 'enter the arena'}
        </button>

        <div className="ja-mono text-xs mt-4 text-center" style={{ color: 'var(--ink-mute)' }}>
          // we use your email to find your saved progress next time
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', autoFocus }) {
  return (
    <label className="block">
      <div className="ja-mono text-xs mb-1" style={{ color: 'var(--ink-mute)' }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full ja-mono text-sm px-3 py-2.5 rounded-lg outline-none"
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--line-2)',
          color: 'var(--ink)',
        }}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="ja-mono text-xs mb-1" style={{ color: 'var(--ink-mute)' }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full ja-mono text-sm px-3 py-2.5 rounded-lg outline-none"
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--line-2)',
          color: 'var(--ink)',
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

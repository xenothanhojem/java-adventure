import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentOnInput, foldGutter, foldKeymap } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { oneDark } from '@codemirror/theme-one-dark';

/*
 * CodeMirror 6 wrapper that provides a Java IDE-like editing experience for
 * student code submissions. Mirrors the surrounding app palette by leaning on
 * the OneDark theme (which fits the dark glow aesthetic) and stripping the
 * default rounded chrome via the override theme below.
 */

const overrideTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: 'var(--bg-2)',
      color: 'var(--ink)',
      fontSize: '13px',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      borderRadius: '12px',
      border: '1px solid var(--line)',
      overflow: 'hidden',
    },
    '.cm-scroller': {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      lineHeight: '1.6',
    },
    '.cm-content': {
      padding: '14px 0',
      caretColor: 'var(--cyan)',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--bg)',
      color: 'var(--ink-mute)',
      border: 'none',
      borderRight: '1px solid var(--line)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: 'var(--cyan)',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(92, 242, 255, 0.04)',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: 'var(--cyan)',
    },
    '.cm-selectionBackground, ::selection': {
      backgroundColor: 'rgba(92, 242, 255, 0.18) !important',
    },
    '.cm-tooltip': {
      backgroundColor: 'var(--panel)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
    },
  },
  { dark: true },
);

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  minHeight = '220px',
  placeholder,
}) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  /*
   * Hold the latest onChange in a ref so we don't have to rebuild the editor
   * every time the parent's callback identity changes.
   */
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && onChangeRef.current) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      foldGutter(),
      history(),
      bracketMatching(),
      closeBrackets(),
      indentOnInput(),
      autocompletion(),
      java(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      oneDark,
      overrideTheme,
      EditorView.lineWrapping,
      EditorState.readOnly.of(!!readOnly),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        indentWithTab,
      ]),
      updateListener,
    ];

    const view = new EditorView({
      state: EditorState.create({ doc: value || '', extensions }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    /*
     * We intentionally only build the editor once per mount. External value
     * sync (rare in this app's flow) is handled by the effect below.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * If the parent ever programmatically resets `value` (e.g. clear template),
   * push that into the editor without recreating it.
   */
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value || '' },
    });
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight }}
      data-placeholder={placeholder || ''}
      className="ja-code-editor"
    />
  );
}

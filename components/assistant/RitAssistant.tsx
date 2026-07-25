"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, Languages, RotateCcw, Send, X } from "lucide-react";
import type { AssistantMessage as Message } from "@/types/content";
import AssistantMessage from "./AssistantMessage";

const starter = {
  en: [
    "What does RIT work on?",
    "Show agricultural engineering projects.",
    "What applications has RIT developed?",
    "How can I contact RIT?",
  ],
  bn: [
    "RIT কী ধরনের প্রযুক্তি নিয়ে কাজ করে?",
    "কৃষিযন্ত্র প্রকল্পগুলো দেখান।",
    "RIT-এর অ্যাপগুলো কী কী?",
    "RIT-এর সঙ্গে কীভাবে যোগাযোগ করব?",
  ],
};

const welcome = {
  en: "Hello. I’m RIT Smart, a local deterministic guide to published RIT information. I can help you find projects, applications, services, research and contact options.",
  bn: "স্বাগতম। আমি RIT Smart—প্রকাশিত RIT তথ্যের স্থানীয় ও নিয়মভিত্তিক সহকারী। প্রকল্প, অ্যাপ, সেবা, গবেষণা ও যোগাযোগের তথ্য খুঁজে দিতে পারি।",
};

export default function RitAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setMinimized(false);
    setTimeout(() => toggleRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || minimized || !panelRef.current) return;
      const controls = [...panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea:not([disabled])',
      )];
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    addEventListener("keydown", onKey);
    if (innerWidth < 640) document.body.classList.add("assistant-open");
    setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.classList.remove("assistant-open");
    };
  }, [open, minimized, close]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function ask(rawInput: string) {
    const input = rawInput.trim();
    if (!input || loading) return;
    const next = [...messages, { role: "user", content: input } as Message];
    setMessages(next);
    setLoading(true);
    if (inputRef.current) inputRef.current.value = "";
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: input, lang }),
      });
      const data = await response.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content: data.answer || data.error || data.errorBn || welcome[lang],
          relatedUrl: data.relatedUrl,
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "bn"
              ? "স্থানীয় সহকারী এখন উত্তর দিতে পারছে না। আবার চেষ্টা করুন।"
              : "The local assistant cannot respond right now. Please retry.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(inputRef.current?.value || "");
  }

  function reset() {
    setMessages([]);
    inputRef.current?.focus();
  }

  return (
    <div className="assistant">
      <button
        ref={toggleRef}
        className="assistantToggle"
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
        aria-expanded={open}
        aria-controls="rit-assistant-panel"
        aria-label="Open RIT Smart Assistant"
      >
        <span className="assistant-avatar"><Bot size={21} /></span>
        <span><b>RIT Smart</b><small>Local assistant</small></span>
      </button>
      {open ? (
        <section
          ref={panelRef}
          id="rit-assistant-panel"
          className={`assistantPanel ${minimized ? "is-minimized" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
        >
          <header>
            <div>
              <span className="assistant-avatar"><Bot size={19} /></span>
              <div>
                <b id="assistant-title">RIT Smart Assistant</b>
                <small>Local · deterministic · private</small>
              </div>
            </div>
            <div>
              <button onClick={() => setLang(lang === "en" ? "bn" : "en")} aria-label="Change assistant language">
                <Languages size={17} /><span>{lang === "en" ? "বাংলা" : "EN"}</span>
              </button>
              <button onClick={reset} aria-label="Reset conversation"><RotateCcw size={17} /></button>
              <button onClick={() => setMinimized((value) => !value)} aria-label={minimized ? "Expand assistant" : "Minimize assistant"}>
                <ChevronDown className={minimized ? "rotate" : ""} size={18} />
              </button>
              <button onClick={close} aria-label="Close assistant"><X size={19} /></button>
            </div>
          </header>
          {!minimized ? (
            <>
              <div ref={messagesRef} className="assistantMessages" aria-live="polite" aria-relevant="additions">
                {!messages.length ? (
                  <>
                    <div className="assistant-welcome">
                      <span className="assistant-avatar large"><Bot size={27} /></span>
                      <p>{welcome[lang]}</p>
                    </div>
                    <div className="assistantSuggestions">
                      {starter[lang].map((question) => (
                        <button key={question} onClick={() => void ask(question)}>{question}</button>
                      ))}
                    </div>
                  </>
                ) : null}
                {messages.map((message, index) => (
                  <AssistantMessage key={`${message.role}-${index}`} message={message} onSuggest={(question) => void ask(question)} />
                ))}
                {loading ? (
                  <div className="assistant-thinking" role="status">
                    <i /><i /><i />
                    <span>{lang === "bn" ? "প্রকাশিত তথ্য খুঁজছি" : "Searching published information"}</span>
                  </div>
                ) : null}
              </div>
              <form onSubmit={submit}>
                <label className="srOnly" htmlFor="assistant-input">{lang === "bn" ? "প্রশ্ন" : "Question"}</label>
                <textarea
                  ref={inputRef}
                  id="assistant-input"
                  name="message"
                  maxLength={500}
                  rows={2}
                  required
                  placeholder={lang === "bn" ? "RIT সম্পর্কে প্রশ্ন করুন" : "Ask about RIT"}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                />
                <button disabled={loading} aria-label="Send question"><Send size={18} /><span>{lang === "bn" ? "পাঠান" : "Send"}</span></button>
                <small>Enter to send · Shift+Enter for a new line</small>
              </form>
            </>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

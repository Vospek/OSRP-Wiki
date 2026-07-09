// src/pages/index.tsx
import React, { useEffect, useRef, useState } from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

/* ─── Injected global keyframes ──────────────────────────────────────────── */

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@100;200;300;400;600;700;900&display=swap');

  :root {
    --ti-black:   #050507;
    --ti-deep:    #08090c;
    --ti-surface: #0d0e12;
    --ti-border:  #1c1d24;
    --ti-border2: #252630;
    --ti-muted:   #2a2b38;
    --ti-dim:     #444558;
    --ti-mid:     #666880;
    --ti-text:    #9a9cb8;
    --ti-bright:  #c8cae8;
    --ti-white:   #e8eaf8;
    --ti-red:     #c23b3b;
    --ti-red2:    #8b1a1a;
    --ti-amber:   #c4852a;
    --ti-amber2:  #7a4f10;
    --ti-cyan:    #2a7a8c;
    --ti-glow:    rgba(194, 59, 59, 0.15);
  }

  @keyframes ti-scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes ti-flicker {
    0%, 95%, 100% { opacity: 1; }
    96%            { opacity: 0.85; }
    97%            { opacity: 1; }
    98%            { opacity: 0.9; }
  }
  @keyframes ti-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ti-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes ti-glitch {
    0%  { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
    20% { clip-path: inset(10% 0 80% 0); transform: translate(4px, 0); }
    40% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
    60% { clip-path: inset(30% 0 60% 0); transform: translate(3px, 0); }
    80% { clip-path: inset(5%  0 90% 0); transform: translate(-3px, 0); }
    100%{ clip-path: inset(40% 0 50% 0); transform: translate(0, 0); }
  }
  @keyframes ti-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes ti-border-pulse {
    0%   { border-color: var(--ti-border); }
    50%  { border-color: var(--ti-red); }
    100% { border-color: var(--ti-border); }
  }
  @keyframes ti-noise {
    0%   { background-position: 0 0; }
    10%  { background-position: -5% -10%; }
    20%  { background-position: -15% 5%; }
    30%  { background-position: 7% -25%; }
    40%  { background-position: 20% 25%; }
    50%  { background-position: -25% 10%; }
    60%  { background-position: 15% 5%; }
    70%  { background-position: 0 15%; }
    80%  { background-position: 25% 35%; }
    90%  { background-position: -10% 10%; }
    100% { background-position: 0 0; }
  }
  @keyframes ti-reveal {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0% 0 0); }
  }
  @keyframes ti-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ti-hue-shift {
    0%   { filter: hue-rotate(0deg); }
    50%  { filter: hue-rotate(20deg); }
    100% { filter: hue-rotate(0deg); }
  }

  /* ── Page shell ── */
  .ti-page {
    background: var(--ti-black);
    min-height: 100vh;
    font-family: 'Rajdhani', sans-serif;
    color: var(--ti-text);
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .ti-hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    max-height: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: ti-flicker 8s ease-in-out infinite;
  }
  .ti-hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(194,59,59,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(42,122,140,0.04) 0%, transparent 50%),
      linear-gradient(180deg, #050507 0%, #08090c 50%, #050507 100%);
  }
  .ti-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(28,29,36,0.6) 1px, transparent 1px),
      linear-gradient(90deg, rgba(28,29,36,0.6) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%);
  }
  .ti-hero-noise {
    position: absolute; inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    animation: ti-noise 0.5s steps(1) infinite;
  }
  .ti-scanline {
    position: absolute; inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .ti-scanline::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(180deg, transparent, rgba(194,59,59,0.12), transparent);
    animation: ti-scanline 6s linear infinite;
  }
  .ti-hero-corner {
    position: absolute;
    width: 40px; height: 40px;
    border-color: var(--ti-border2);
    border-style: solid;
    border-width: 0;
  }
  .ti-hero-corner--tl { top: 2rem; left: 2rem; border-top-width: 1px; border-left-width: 1px; }
  .ti-hero-corner--tr { top: 2rem; right: 2rem; border-top-width: 1px; border-right-width: 1px; }
  .ti-hero-corner--bl { bottom: 2rem; left: 2rem; border-bottom-width: 1px; border-left-width: 1px; }
  .ti-hero-corner--br { bottom: 2rem; right: 2rem; border-bottom-width: 1px; border-right-width: 1px; }
  .ti-hero-content {
    position: relative;
    text-align: center;
    z-index: 2;
    padding: 0 1.5rem;
  }
  .ti-hero-eye {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.35em;
    color: var(--ti-red);
    text-transform: uppercase;
    margin: 0 0 1.5rem;
    opacity: 0;
    animation: ti-fade-in 0.6s ease forwards 0.3s;
  }
  .ti-hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(4rem, 12vw, 10rem);
    line-height: 0.9;
    letter-spacing: -0.01em;
    color: var(--ti-white);
    text-transform: uppercase;
    margin: 0;
    opacity: 0;
    animation: ti-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s;
    position: relative;
  }
  .ti-hero-title-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 200;
    font-size: clamp(1.2rem, 3vw, 2.2rem);
    letter-spacing: 0.4em;
    color: var(--ti-mid);
    text-transform: uppercase;
    margin: 0.75rem 0 0;
    opacity: 0;
    animation: ti-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.75s;
  }
  .ti-hero-divider {
    width: 120px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--ti-red), transparent);
    margin: 2rem auto;
    opacity: 0;
    animation: ti-fade-in 0.6s ease forwards 1s;
  }
  .ti-hero-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: var(--ti-dim);
    text-transform: uppercase;
    margin: 0 0 2.5rem;
    opacity: 0;
    animation: ti-fade-in 0.6s ease forwards 1.1s;
  }
  .ti-hero-desc span {
    display: inline-block;
    animation: ti-blink 1.2s step-end infinite;
  }
  .ti-hero-cta {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    animation: ti-fade-up 0.6s ease forwards 1.3s;
  }
  .ti-btn {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none !important;
    padding: 0.7rem 2rem;
    border: 1px solid;
    transition: all 250ms ease;
    position: relative;
    overflow: hidden;
  }
  .ti-btn::before {
    content: '';
    position: absolute; inset: 0;
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }
  .ti-btn:hover::before { transform: translateX(0); }
  .ti-btn--primary {
    color: var(--ti-white);
    border-color: var(--ti-red);
    background: rgba(194,59,59,0.08);
  }
  .ti-btn--primary::before { background: rgba(194,59,59,0.15); }
  .ti-btn--primary:hover { color: #fff; box-shadow: 0 0 20px rgba(194,59,59,0.2); }
  .ti-btn--ghost {
    color: var(--ti-mid);
    border-color: var(--ti-border2);
    background: transparent;
  }
  .ti-btn--ghost::before { background: rgba(255,255,255,0.03); }
  .ti-btn--ghost:hover { color: var(--ti-bright); border-color: var(--ti-dim); }

  .ti-hero-scroll {
    position: absolute;
    bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: ti-fade-in 1s ease forwards 2s;
  }
  .ti-hero-scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(180deg, var(--ti-border2), transparent);
  }
  .ti-hero-scroll-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    color: var(--ti-muted);
    text-transform: uppercase;
  }

  /* ── Status bar ── */
  .ti-statusbar {
    border-top: 1px solid var(--ti-border);
    border-bottom: 1px solid var(--ti-border);
    background: var(--ti-deep);
    padding: 0.5rem 0;
    overflow: hidden;
  }
  .ti-statusbar-inner {
    display: flex;
    gap: 2rem;
    padding: 0 2rem;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
  }
  .ti-status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    color: var(--ti-dim);
    text-transform: uppercase;
    white-space: nowrap;
  }
  .ti-status-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ti-status-dot--green { background: #3a7a3a; box-shadow: 0 0 4px #3a7a3a; }
  .ti-status-dot--red   { background: var(--ti-red); box-shadow: 0 0 4px var(--ti-red); }
  .ti-status-dot--amber { background: var(--ti-amber); box-shadow: 0 0 4px var(--ti-amber); }
  .ti-status-sep { color: var(--ti-muted); margin: 0; }

  /* ── Section layout ── */
  .ti-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }
  .ti-section-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .ti-section-eye {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    color: var(--ti-red);
    text-transform: uppercase;
    white-space: nowrap;
  }
  .ti-section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    letter-spacing: 0.05em;
    color: var(--ti-bright);
    text-transform: uppercase;
    margin: 0;
  }
  .ti-section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--ti-border2), transparent);
  }

  /* ── Featured cards ── */
  .ti-featured {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: var(--ti-border);
    border: 1px solid var(--ti-border);
  }
  @media (max-width: 900px) {
    .ti-featured { grid-template-columns: 1fr; }
  }
  .ti-feat-card {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: var(--ti-deep);
    text-decoration: none !important;
    display: block;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    .ti-feat-card { aspect-ratio: 16/9; }
  }
  .ti-feat-bg {
    position: absolute; inset: 0;
    transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ti-feat-card:hover .ti-feat-bg { transform: scale(1.06); }
  .ti-feat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(0deg, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.5) 50%, rgba(5,5,7,0.2) 100%);
    transition: background 400ms ease;
  }
  .ti-feat-card:hover .ti-feat-overlay {
    background: linear-gradient(0deg, rgba(5,5,7,0.98) 0%, rgba(5,5,7,0.6) 50%, rgba(5,5,7,0.3) 100%);
  }
  .ti-feat-content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 2rem;
    transform: translateY(0);
    transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ti-feat-cat {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }
  .ti-feat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 2.2rem;
    letter-spacing: 0.02em;
    color: var(--ti-white);
    text-transform: uppercase;
    margin: 0 0 0.75rem;
    line-height: 1;
  }
  .ti-feat-desc {
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.85rem;
    color: var(--ti-mid);
    margin: 0 0 1.25rem;
    line-height: 1.5;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 300ms ease 100ms, transform 300ms ease 100ms;
  }
  .ti-feat-card:hover .ti-feat-desc {
    opacity: 1; transform: translateY(0);
  }
  .ti-feat-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 250ms ease 50ms;
  }
  .ti-feat-card:hover .ti-feat-link { opacity: 1; }
  .ti-feat-link-arrow {
    display: inline-block;
    transition: transform 200ms ease;
  }
  .ti-feat-card:hover .ti-feat-link-arrow { transform: translateX(4px); }
  .ti-feat-top-badge {
    position: absolute;
    top: 1.5rem; left: 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    border: 1px solid;
    opacity: 0.7;
  }

  /* ── Archive grid ── */
  .ti-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--ti-border);
    border: 1px solid var(--ti-border);
  }
  @media (max-width: 700px) {
    .ti-grid { grid-template-columns: 1fr 1fr; }
  }
  .ti-grid-card {
    position: relative;
    background: var(--ti-deep);
    padding: 2rem;
    text-decoration: none !important;
    display: block;
    overflow: hidden;
    transition: background 200ms ease;
    min-height: 160px;
  }
  .ti-grid-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0;
    transition: opacity 250ms ease;
  }
  .ti-grid-card:hover { background: var(--ti-surface); }
  .ti-grid-card:hover::before { opacity: 1; }
  .ti-grid-card-glow {
    position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    opacity: 0;
    filter: blur(40px);
    transition: opacity 400ms ease;
    pointer-events: none;
  }
  .ti-grid-card:hover .ti-grid-card-glow { opacity: 1; }
  .ti-grid-num {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--ti-muted);
    margin: 0 0 1rem;
  }
  .ti-grid-cat {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin: 0 0 0.4rem;
  }
  .ti-grid-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: 0.04em;
    color: var(--ti-bright);
    text-transform: uppercase;
    margin: 0 0 0.5rem;
    line-height: 1;
    transition: color 200ms ease;
  }
  .ti-grid-card:hover .ti-grid-title { color: var(--ti-white); }
  .ti-grid-arrow {
    position: absolute;
    bottom: 1.5rem; right: 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    color: var(--ti-muted);
    transition: color 200ms ease, transform 200ms ease;
  }
  .ti-grid-card:hover .ti-grid-arrow { color: var(--ti-text); transform: translate(2px, -2px); }

  /* ── Lore ticker ── */
  .ti-lore-ticker {
    border-top: 1px solid var(--ti-border);
    border-bottom: 1px solid var(--ti-border);
    background: linear-gradient(90deg, var(--ti-deep), var(--ti-surface), var(--ti-deep));
    padding: 1px 0;
  }
  .ti-lore-ticker-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .ti-lore-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--ti-border);
  }
  @media (max-width: 900px) {
    .ti-lore-list { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 500px) {
    .ti-lore-list { grid-template-columns: 1fr; }
  }
  .ti-lore-item {
    background: var(--ti-deep);
    padding: 1.5rem;
    text-decoration: none !important;
    display: block;
    transition: background 200ms ease;
    position: relative;
    overflow: hidden;
  }
  .ti-lore-item:hover { background: var(--ti-surface); }
  .ti-lore-item-eye {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.25em;
    color: var(--ti-dim);
    text-transform: uppercase;
    margin: 0 0 0.4rem;
  }
  .ti-lore-item-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 0.04em;
    color: var(--ti-text);
    text-transform: uppercase;
    margin: 0;
    transition: color 200ms ease;
    line-height: 1.2;
  }
  .ti-lore-item:hover .ti-lore-item-title { color: var(--ti-bright); }

  /* ── Two-column with sidebar ── */
  .ti-content-row {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 5rem;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1px;
    background: var(--ti-border);
    align-items: start;
  }
  @media (max-width: 1000px) {
    .ti-content-row { grid-template-columns: 1fr; }
  }
  .ti-sidebar {
    background: var(--ti-deep);
    border-left: 1px solid var(--ti-border);
    position: sticky;
    top: 0;
  }
  .ti-sidebar-section {
    border-bottom: 1px solid var(--ti-border);
    padding: 1.5rem;
  }
  .ti-sidebar-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    color: var(--ti-red);
    text-transform: uppercase;
    margin: 0 0 0.3rem;
  }
  .ti-sidebar-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.05em;
    color: var(--ti-bright);
    text-transform: uppercase;
    margin: 0 0 1rem;
  }
  .ti-sidebar-body {
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--ti-mid);
    margin: 0 0 1rem;
  }
  .ti-sidebar-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.4rem 0;
    border-top: 1px solid var(--ti-border);
  }
  .ti-sidebar-row-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    color: var(--ti-dim);
    text-transform: uppercase;
    margin: 0;
  }
  .ti-sidebar-row-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--ti-text);
    margin: 0;
  }
  .ti-sidebar-status {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: #3a7a3a;
    text-transform: uppercase;
    margin: 1rem 0 0;
  }
  .ti-sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0;
    border-top: 1px solid var(--ti-border);
    text-decoration: none !important;
    transition: color 200ms ease;
  }
  .ti-sidebar-link-arrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--ti-muted);
    transition: color 200ms ease, transform 200ms ease;
  }
  .ti-sidebar-link:hover .ti-sidebar-link-arrow { color: var(--ti-text); transform: translateX(2px); }
  .ti-sidebar-link-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: var(--ti-dim);
    text-transform: uppercase;
    transition: color 200ms ease;
  }
  .ti-sidebar-link:hover .ti-sidebar-link-text { color: var(--ti-text); }

  /* ── Warning banner ── */
  .ti-warn {
    border: 1px solid var(--ti-red2);
    background: rgba(139,26,26,0.06);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .ti-warn-icon {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--ti-red);
    white-space: nowrap;
    margin-top: 2px;
  }
  .ti-warn-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    line-height: 1.7;
    color: var(--ti-dim);
    text-transform: uppercase;
    margin: 0;
  }

  /* ── Footer bar ── */
  .ti-footer {
    border-top: 1px solid var(--ti-border);
    background: var(--ti-black);
    padding: 2rem;
  }
  .ti-footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .ti-footer-top {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .ti-footer-wordmark {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.1em;
    color: var(--ti-muted);
    text-transform: uppercase;
    margin: 0;
  }
  .ti-footer-sep { color: var(--ti-border2); }
  .ti-footer-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--ti-muted);
    text-transform: uppercase;
    margin: 0;
  }
  .ti-footer-quote {
    font-family: 'Rajdhani', sans-serif;
    font-style: italic;
    font-size: 0.8rem;
    color: var(--ti-border2);
    margin: 0;
  }
`

/* ─── Data ────────────────────────────────────────────────────────────────── */

const FEATURED = [
  {
    id: 'F01',
    cat: 'ARCHIVE',
    label: 'Lore',
    desc: 'Classified historical accounts, incident records, and institutional chronicles of The Administration.',
    href: '/docs/lore',
    color: 'var(--ti-red)',
    bg: 'radial-gradient(ellipse at 30% 70%, rgba(194,59,59,0.15), transparent 60%), linear-gradient(160deg, #0d0408 0%, #080507 100%)',
    badgeColor: 'var(--ti-red)',
    badgeBg: 'rgba(194,59,59,0.1)',
  },
  {
    id: 'F02',
    cat: 'DIRECTIVE',
    label: 'Protocols',
    desc: 'Operational procedures, response codes, warhead deployment doctrine, and facility emergency directives.',
    href: '/docs/facility-protocols',
    color: 'var(--ti-amber)',
    bg: 'radial-gradient(ellipse at 70% 30%, rgba(196,133,42,0.12), transparent 60%), linear-gradient(160deg, #0d0a05 0%, #08070a 100%)',
    badgeColor: 'var(--ti-amber)',
    badgeBg: 'rgba(196,133,42,0.08)',
  },
  {
    id: 'F03',
    cat: 'DOSSIER',
    label: 'Teams',
    desc: 'Personnel divisions, clearance hierarchies, chain of oversight, and community faction classifications.',
    href: '/docs/teams',
    color: 'var(--ti-cyan)',
    bg: 'radial-gradient(ellipse at 50% 80%, rgba(42,122,140,0.12), transparent 60%), linear-gradient(160deg, #050a0d 0%, #070808 100%)',
    badgeColor: 'var(--ti-cyan)',
    badgeBg: 'rgba(42,122,140,0.08)',
  },
]

const NAV_ITEMS = [
  { num: '01', cat: 'ARCHIVE',  label: 'Lore',             href: '/docs/lore',               color: 'var(--ti-red)',   glow: 'rgba(194,59,59,0.12)' },
  { num: '02', cat: 'ACCESS',   label: 'Clearance Levels', href: '/docs/clearance-levels',    color: 'var(--ti-amber)', glow: 'rgba(196,133,42,0.1)' },
  { num: '03', cat: 'HOSTILE',  label: 'Factions',         href: '/docs/faction',             color: 'var(--ti-red)',   glow: 'rgba(194,59,59,0.1)'  },
  { num: '04', cat: 'RULES',    label: 'Directives',       href: '/docs/rules',               color: 'var(--ti-amber)', glow: 'rgba(196,133,42,0.1)' },
  { num: '05', cat: 'PROTOCOL', label: 'Facility Proto.',  href: '/docs/facility-protocols',  color: 'var(--ti-cyan)',  glow: 'rgba(42,122,140,0.1)' },
  { num: '06', cat: 'OVERSIGHT',label: 'Staff',            href: '/docs/staff',               color: 'var(--ti-cyan)',  glow: 'rgba(42,122,140,0.1)' },
]

const LORE_ENTRIES = [
  { eye: 'MAINLINE · CLASSIFIED', title: 'Origin', href: '/docs/lore/origin' },
  { eye: 'MAINLINE · CLASSIFIED', title: 'First Cataclysm', href: '/docs/lore/first-cataclysm' },
  { eye: 'MAINLINE · CLASSIFIED', title: 'The Hostile Dawn', href: '/docs/lore/the-hostile-dawn' },
  { eye: 'INSTITUTIONAL',         title: 'The Administration', href: '/docs/lore/the-administration' },
]

const QUICK_LINKS = [
  { label: 'Facility Protocols',  href: '/docs/facility-protocols' },
  { label: 'Warhead Initiative',  href: '/docs/lore/the-warhead-initiative' },
  { label: 'Chain of Oversight',  href: '/docs/staff' },
  { label: 'Community Factions',  href: '/docs/faction' },
  { label: 'Lore Archive',        href: '/docs/lore' },
]

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function FeatCard({ item }: { item: typeof FEATURED[0] }) {
  return (
    <Link to={item.href} className="ti-feat-card">
      <div className="ti-feat-bg" style={{ background: item.bg }} />
      <div className="ti-feat-overlay" />
      <div
        className="ti-feat-top-badge"
        style={{ color: item.badgeColor, borderColor: item.badgeColor, background: item.badgeBg }}
      >
        REF {item.id}
      </div>
      <div className="ti-feat-content">
        <p className="ti-feat-cat" style={{ color: item.color }}>{item.cat}</p>
        <p className="ti-feat-label">{item.label}</p>
        <p className="ti-feat-desc">{item.desc}</p>
        <div className="ti-feat-link" style={{ color: item.color }}>
          ACCESS ARCHIVE
          <span className="ti-feat-link-arrow">→</span>
        </div>
      </div>
    </Link>
  )
}

function GridCard({ item }: { item: typeof NAV_ITEMS[0] }) {
  return (
    <Link to={item.href} className="ti-grid-card" style={{ color: item.color }}>
      <div className="ti-grid-card-glow" style={{ background: item.glow }} />
      <p className="ti-grid-num">{item.num} / 06</p>
      <p className="ti-grid-cat" style={{ color: item.color }}>{item.cat}</p>
      <p className="ti-grid-title">{item.label}</p>
      <span className="ti-grid-arrow">↗</span>
    </Link>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title="Official Knowledge Archive"
      description="The official knowledge archive for On-Site: Roleplay — lore, protocols, clearance levels, and operational directives."
    >
      <div className="ti-page">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="ti-hero">
          <div className="ti-hero-bg" />
          <div className="ti-hero-grid" />
          <div className="ti-hero-noise" />
          <div className="ti-scanline" />
          <div className="ti-hero-corner ti-hero-corner--tl" />
          <div className="ti-hero-corner ti-hero-corner--tr" />
          <div className="ti-hero-corner ti-hero-corner--bl" />
          <div className="ti-hero-corner ti-hero-corner--br" />

          <div className="ti-hero-content">
            <p className="ti-hero-eye">
              THE ADMINISTRATION · ARCHIVAL DIVISION · PUBLIC ACCESS TERMINAL
            </p>
            <h1 className="ti-hero-title">ON-SITE<br />ROLEPLAY</h1>
            <p className="ti-hero-title-sub">WIKI · KNOWLEDGE ARCHIVE</p>
            <div className="ti-hero-divider" />
            <p className="ti-hero-desc">
              CLEARANCE UNRESTRICTED · ARCHIVE OPEN · ACCESSING DATABASE
              <span>_</span>
            </p>
            <div className="ti-hero-cta">
              <Link to="/docs/lore" className="ti-btn ti-btn--primary">
                ENTER ARCHIVE
              </Link>
              <Link to="/docs/facility-protocols" className="ti-btn ti-btn--ghost">
                VIEW PROTOCOLS
              </Link>
            </div>
          </div>

          <div className="ti-hero-scroll">
            <span className="ti-hero-scroll-label">SCROLL</span>
            <div className="ti-hero-scroll-line" />
          </div>
        </section>

        {/* ── Status bar ───────────────────────────────────────────── */}
        <div className="ti-statusbar">
          <div className="ti-statusbar-inner">
            <div className="ti-status-item">
              <div className="ti-status-dot ti-status-dot--green" />
              FACILITY STATUS: NOMINAL
            </div>
            <span className="ti-status-sep">·</span>
            <div className="ti-status-item">
              <div className="ti-status-dot ti-status-dot--amber" />
              ALERT LEVEL: ELEVATED
            </div>
            <span className="ti-status-sep">·</span>
            <div className="ti-status-item">
              <div className="ti-status-dot ti-status-dot--green" />
              ARCHIVE: ACCESSIBLE
            </div>
            <span className="ti-status-sep">·</span>
            <div className="ti-status-item" style={{ marginLeft: 'auto' }}>
              ON-SITE: ROLEPLAY · OFFICIAL KNOWLEDGE BASE
            </div>
          </div>
        </div>

        {/* ── Featured ─────────────────────────────────────────────── */}
        <div className="ti-section" style={{ paddingBottom: '0' }}>
          <div className="ti-section-header">
            <span className="ti-section-eye">PRIMARY INDEX</span>
            <h2 className="ti-section-title">Core Archives</h2>
            <div className="ti-section-line" />
          </div>
          <div className="ti-featured">
            {FEATURED.map(item => <FeatCard key={item.id} item={item} />)}
          </div>
        </div>

        {/* ── Lore quick access ────────────────────────────────────── */}
        <div className="ti-section" style={{ paddingBottom: '0', paddingTop: '1px' }}>
          <div className="ti-lore-list">
            {LORE_ENTRIES.map(e => (
              <Link key={e.href} to={e.href} className="ti-lore-item">
                <p className="ti-lore-item-eye">{e.eye}</p>
                <p className="ti-lore-item-title">{e.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Archive grid + sidebar ───────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '5rem 2rem 0' }}>
          <div className="ti-section-header" style={{ marginBottom: '1.5rem' }}>
            <span className="ti-section-eye">CLASSIFIED ARCHIVE</span>
            <h2 className="ti-section-title">All Sections</h2>
            <div className="ti-section-line" />
          </div>
        </div>

        <div className="ti-content-row">
          {/* Nav grid */}
          <div style={{ background: 'var(--ti-deep)', padding: '2rem' }}>
            <div className="ti-warn">
              <span className="ti-warn-icon">⚠ NOTICE</span>
              <p className="ti-warn-text">
                This archive is maintained by the On-Site: Roleplay development team.
                All lore, protocols, and directives are original fiction produced for the game.
                Do not treat any content as real-world guidance.
              </p>
            </div>
            <div className="ti-grid">
              {NAV_ITEMS.map(item => <GridCard key={item.href} item={item} />)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="ti-sidebar">
            <div className="ti-sidebar-section">
              <p className="ti-sidebar-label">ABOUT THIS GAME</p>
              <p className="ti-sidebar-title">On-Site: Roleplay</p>
              <p className="ti-sidebar-body">
                The official knowledge archive for{' '}
                <a href="#" style={{ color: 'var(--ti-text)' }}>On-Site: Roleplay</a>
                , maintained by the official development team.
              </p>
              <div className="ti-sidebar-row">
                <p className="ti-sidebar-row-label">DEVELOPER</p>
                <p className="ti-sidebar-row-val">chuyuewei</p>
              </div>
              <div className="ti-sidebar-row">
                <p className="ti-sidebar-row-label">ENGINE</p>
                <p className="ti-sidebar-row-val">INDEPENDENT</p>
              </div>
              <div className="ti-sidebar-row">
                <p className="ti-sidebar-row-label">STUDIO</p>
                <p className="ti-sidebar-row-val">VOSPEK</p>
              </div>
              <p className="ti-sidebar-status">● ARCHIVE STATUS: OPEN</p>
            </div>

            <div className="ti-sidebar-section">
              <p className="ti-sidebar-label">QUICK ACCESS</p>
              <p className="ti-sidebar-title">Frequently Referenced</p>
              {QUICK_LINKS.map(l => (
                <Link key={l.href} to={l.href} className="ti-sidebar-link">
                  <span className="ti-sidebar-link-arrow">→</span>
                  <span className="ti-sidebar-link-text">{l.label}</span>
                </Link>
              ))}
            </div>

            <div className="ti-sidebar-section" style={{ padding: 0 }}>
              <iframe
                src="https://discord.com/widget?id=1312447590700417057&theme=dark"
                width="100%"
                height="360"
                allowTransparency
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                style={{ display: 'block' }}
                title="Discord"
              />
            </div>
          </aside>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer className="ti-footer">
          <div className="ti-footer-inner">
            <div className="ti-footer-top">
              <p className="ti-footer-wordmark">On-Site: Roleplay</p>
              <span className="ti-footer-sep">·</span>
              <p className="ti-footer-sub">Public Knowledge Archive</p>
              <span className="ti-footer-sep">·</span>
              <p className="ti-footer-sub">All Clearance Levels</p>
              <p className="ti-footer-sub" style={{ marginLeft: 'auto' }}>
                © {new Date().getFullYear()} Vospek · On-Site: Roleplay Development Team
              </p>
            </div>
            <p className="ti-footer-quote">
              "The facility does not benefit from ignorance. Read the archive. Know your post."
            </p>
          </div>
        </footer>

      </div>
    </Layout>
  )
}
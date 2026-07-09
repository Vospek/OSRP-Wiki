// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── 背景层级 ──────────────────────────────
        site: {
          base:     '#080808',  // 最底层背景
          primary:  '#0d0d0d',  // 主背景
          card:     '#111111',  // 卡片背景
          elevated: '#161616',  // 浮起元素
          hover:    '#1a1a1a',  // hover 状态
        },
        // ── 边框层级 ──────────────────────────────
        border: {
          subtle:  '#1a1a1a',
          default: '#2a2a2a',
          strong:  '#444444',
          accent:  '#555555',
        },
        // ── 文字层级 ──────────────────────────────
        ink: {
          primary:   '#e0e0e0',
          secondary: '#aaaaaa',
          muted:     '#888888',
          dim:       '#666666',
          faint:     '#555555',
          ghost:     '#333333',
          void:      '#222222',
        },
        // ── 主题强调色 ────────────────────────────
        accent: {
          gray:   '#888888',
          silver: '#bbbbbb',
        },
        // ── 状态色 ────────────────────────────────
        status: {
          green:  '#2e8b57',
          yellow: '#cccc44',
          orange: '#cc8800',
          red:    '#cc2222',
          purple: '#6b3fa0',
          blue:   '#4169e1',
        },
        // ── 派系色 ────────────────────────────────
        faction: {
          // Lore / Administration
          lore:       '#cc2222',
          'lore-dim': '#440000',
          // Staff / Oversight
          staff:      '#4169e1',
          'staff-dim':'#0a0f1a',
          // HR / Admin rank
          hr:         '#daa520',
          'hr-dim':   '#1a1000',
          // Communion
          communion:  '#6b3fa0',
          'communion-dim': '#0d0515',
          // Sigma
          sigma:      '#4a708b',
          'sigma-dim':'#0a1520',
          // BTS
          bts:        '#b8860b',
          'bts-dim':  '#12100a',
          // Biohazard / VRD
          bio:        '#2e8b57',
          'bio-dim':  '#0a1a0a',
          // Warhead
          warhead:    '#ff4444',
          'warhead-dim': '#1a0000',
          // Community
          community:  '#4169e1',
        },
        // ── PL 权限色 ────────────────────────────
        pl: {
          1: '#ffd700',
          2: '#32cd32',
          3: '#4169e1',
          4: '#8b0000',
          5: '#e0e0e0',
          x: '#333333',
        },
      },

      fontFamily: {
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          'Consolas',
          'ui-monospace',
          'monospace',
        ],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs:   ['0.75rem',  { lineHeight: '1.125rem' }],
      },

      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
        widest4: '0.5em',
      },

      backgroundImage: {
        'gradient-site':    'linear-gradient(180deg, #111111 0%, #0d0d0d 100%)',
        'gradient-hero':    'linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #0d0d0d 100%)',
        'gradient-hero-red':'linear-gradient(135deg, #1a0000 0%, #111111 50%, #0d0d0d 100%)',
        'gradient-hero-gold':'linear-gradient(135deg, #1a1000 0%, #111111 50%, #0d0d0d 100%)',
        'gradient-hero-blue':'linear-gradient(135deg, #0a0f1a 0%, #111111 50%, #0d0d0d 100%)',
        'gradient-divider': 'linear-gradient(90deg, transparent, #666666, transparent)',
        'gradient-divider-red': 'linear-gradient(90deg, transparent, #cc2222, transparent)',
        'gradient-divider-gold': 'linear-gradient(90deg, transparent, #daa520, transparent)',
        'gradient-divider-blue': 'linear-gradient(90deg, transparent, #4169e1, transparent)',
        'gradient-fade-r':  'linear-gradient(90deg, #444444, transparent)',
      },

      boxShadow: {
        'glow-gray':   '0 0 40px rgba(200, 200, 200, 0.08)',
        'glow-red':    '0 0 40px rgba(204, 34, 34, 0.15)',
        'glow-gold':   '0 0 40px rgba(218, 165, 32, 0.15)',
        'glow-blue':   '0 0 40px rgba(65, 105, 225, 0.15)',
        'glow-white':  '0 0 20px rgba(255, 255, 255, 0.15)',
      },

      borderWidth: {
        3: '3px',
        6: '6px',
      },

      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}
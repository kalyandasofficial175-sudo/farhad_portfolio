'use client'

export default function Hero({ data }) {
  const accent = data?.accentColor || '#c8a84b'
  const theme  = data?.themeColor  || '#1a3a6b'

  const nameParts = (data?.name || 'Politician Name').split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ')

  return (
    <section id="about" className="hero-mesh" style={{
      minHeight: '100vh',
      background: `linear-gradient(150deg, #030b18 0%, #061020 40%, ${theme}22 65%, #030b18 100%)`,
      display: 'flex', alignItems: 'center',
      padding: '110px 5% 80px',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── Background watermark name ── */}
      <div style={{
        position: 'absolute',
        right: '-2%', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Playfair Display, serif',
        fontWeight: 900,
        fontSize: 'clamp(100px, 18vw, 260px)',
        color: 'transparent',
        WebkitTextStroke: `1px ${accent}0d`,
        lineHeight: 0.9,
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
        letterSpacing: -6,
        whiteSpace: 'nowrap',
      }}>
        {firstName}
      </div>

      {/* ── SVG geometric decorations ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice"
      >
        {/* Concentric circles top-right */}
        {[340, 280, 220, 160].map((r, i) => (
          <circle key={i} cx="1200" cy="180" r={r}
            fill="none" stroke={accent}
            strokeWidth="0.5" opacity={0.06 - i * 0.01} />
        ))}
        {/* Bottom-left arc */}
        <circle cx="0" cy="900" r="250" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.08" />
        {/* Dot grid */}
        {Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: 12 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={60 + c * 110} cy={80 + r * 120}
              r="1.2" fill={accent} opacity="0.07" />
          ))
        )}
        {/* Diagonal accent lines */}
        <line x1="0" y1="900" x2="450" y2="0" stroke={accent} strokeWidth="0.4" opacity="0.05" />
        <line x1="120" y1="900" x2="570" y2="0" stroke={accent} strokeWidth="0.3" opacity="0.03" />
      </svg>

      {/* ── Left accent bar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, zIndex: 2,
        background: `linear-gradient(180deg, transparent 0%, ${accent} 30%, ${accent}99 70%, transparent 100%)`,
      }} />

      {/* ── Main content ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: '6%', flexWrap: 'wrap',
        zIndex: 1, width: '100%',
        maxWidth: 1260, margin: '0 auto',
      }}>

        {/* ─────── TEXT SIDE ─────── */}
        <div style={{ flex: '1 1 340px', minWidth: 280 }}>

          {/* Party / State badge */}
          <div className="animate-fadeUp" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: `${accent}10`,
            border: `1px solid ${accent}35`,
            padding: '7px 18px',
            marginBottom: 28,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 8px ${accent}`,
            }} />
            <span style={{
              color: accent, fontSize: 10, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase',
            }}>
              {data?.partyShort || 'OFFICIAL'}&nbsp;·&nbsp;{data?.state || 'India'}
            </span>
          </div>

          {/* Name */}
          <h1 className="animate-fadeUp delay-100 font-display" style={{
            fontSize: 'clamp(42px, 6.5vw, 88px)',
            lineHeight: 0.9, marginBottom: 22,
            letterSpacing: -2,
          }}>
            <span style={{ display: 'block', color: '#ffffff', fontWeight: 400 }}>
              {firstName}
            </span>
            <span className="gradient-text" style={{ display: 'block', fontWeight: 900 }}>
              {lastName}
            </span>
          </h1>

          {/* Title row */}
          <div className="animate-fadeUp delay-200" style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22,
          }}>
            <div style={{ width: 36, height: 2, background: accent, flexShrink: 0 }} />
            <span style={{
              color: '#8aaac8', fontSize: 15,
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            }}>
              {data?.title || 'Political Leader'}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent}33, transparent)` }} />
          </div>

          {/* Constituency */}
          <div className="animate-fadeUp delay-200" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, color: '#4a6a8a',
            letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28,
          }}>
            <span style={{ color: accent }}>◈</span>
            {data?.constituency || 'Constituency'}
          </div>

          {/* Tagline quote */}
          <div className="animate-fadeUp delay-300" style={{
            position: 'relative', marginBottom: 24, paddingLeft: 20,
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 3,
              background: `linear-gradient(180deg, ${accent}, ${accent}44)`,
            }} />
            <p style={{
              fontSize: 17, lineHeight: 1.7,
              color: '#dce8f4',
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              maxWidth: 500,
            }}>
              "{data?.tagline || 'Serving the People with Dedication & Integrity'}"
            </p>
          </div>

          {/* Bio */}
          <p className="animate-fadeUp delay-400" style={{
            fontSize: 14, lineHeight: 1.95, color: '#6080a0',
            maxWidth: 500, marginBottom: 42,
          }}>
            {data?.bio}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fadeUp delay-500" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact" className="btn-primary" style={{
              padding: '14px 36px',
              background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
              color: '#030b18',
              textDecoration: 'none', fontWeight: 800,
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 6px 28px ${accent}44`,
              transition: 'all 0.3s ease',
            }}>
              Contact Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#achievements" style={{
              padding: '13px 34px',
              border: `1.5px solid ${accent}40`,
              color: '#9ab4cc',
              textDecoration: 'none', fontWeight: 700,
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `${accent}06`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${accent}88`
              e.currentTarget.style.color = accent
              e.currentTarget.style.background = `${accent}12`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${accent}40`
              e.currentTarget.style.color = '#9ab4cc'
              e.currentTarget.style.background = `${accent}06`
            }}>
              Our Work
            </a>
          </div>
        </div>

        {/* ─────── PHOTO SIDE ─────── */}
        <div className="animate-fadeLeft delay-200" style={{ flexShrink: 0, position: 'relative' }}>

          {/* Outer ambient glow */}
          <div style={{
            position: 'absolute', inset: -40,
            background: `radial-gradient(circle at center, ${accent}14 0%, transparent 65%)`,
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Photo container */}
          <div style={{ position: 'relative', width: 310, height: 400, zIndex: 1 }}>

            {/* Shadow frame offset */}
            <div style={{
              position: 'absolute', top: 14, left: 14, right: -14, bottom: -14,
              background: `linear-gradient(135deg, ${theme}55, ${accent}18)`,
              border: `1px solid ${accent}18`,
            }} />

            {/* Corner L brackets */}
            {[
              { top: -8, left: -8, borderTop: true, borderLeft: true },
              { top: -8, right: -8, borderTop: true, borderRight: true },
              { bottom: -8, left: -8, borderBottom: true, borderLeft: true },
              { bottom: -8, right: -8, borderBottom: true, borderRight: true },
            ].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: 28, height: 28,
                ...pos,
                borderTop: pos.borderTop ? `2px solid ${accent}` : 'none',
                borderLeft: pos.borderLeft ? `2px solid ${accent}` : 'none',
                borderBottom: pos.borderBottom ? `2px solid ${accent}` : 'none',
                borderRight: pos.borderRight ? `2px solid ${accent}` : 'none',
                zIndex: 3,
              }} />
            ))}

            {/* Main image */}
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              overflow: 'hidden',
              background: `linear-gradient(170deg, ${theme}66, #030b18)`,
              border: `1px solid ${accent}25`,
              zIndex: 1,
            }}>
              {data?.photo ? (
                <img
                  src={data.photo} alt={data?.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 12,
                  background: `linear-gradient(170deg, ${theme}44, #030b18)`,
                }}>
                  <svg viewBox="0 0 100 100" width="90" height="90">
                    <defs>
                      <radialGradient id="pg" cx="50%" cy="50%">
                        <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="34" r="21" fill="url(#pg)" />
                    <ellipse cx="50" cy="88" rx="36" ry="22" fill="url(#pg)" opacity="0.6" />
                  </svg>
                  <div style={{ color: `${accent}55`, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
                    Add Photo
                  </div>
                </div>
              )}

              {/* Bottom name tag */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: `linear-gradient(transparent, rgba(3,11,24,0.9))`,
                padding: '40px 16px 14px',
              }}>
                <div style={{
                  display: 'inline-block',
                  background: accent, color: '#030b18',
                  fontSize: 9, fontWeight: 800,
                  letterSpacing: 2.5, textTransform: 'uppercase',
                  padding: '4px 10px',
                }}>
                  {data?.partyShort || 'OFFICIAL'}
                </div>
              </div>
            </div>
          </div>

          {/* ── Floating stat chip – top right ── */}
          {data?.stats?.[0] && (
            <div className="animate-float stat-chip-tr" style={{
              background: 'rgba(13,30,56,0.95)',
              border: `1px solid ${accent}33`,
              padding: '12px 18px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
              minWidth: 110,
            }}>
              <div className="font-display" style={{ color: accent, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>
                {data.stats[0].value}
              </div>
              <div style={{ color: '#4a6a8a', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>
                {data.stats[0].label}
              </div>
            </div>
          )}

          {/* ── Floating stat chip – bottom left ── */}
          {data?.stats?.[2] && (
            <div className="animate-float stat-chip-bl" style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              padding: '12px 18px',
              boxShadow: `0 12px 40px ${accent}44`,
              minWidth: 110,
              animationDelay: '1.2s',
            }}>
              <div className="font-display" style={{ color: '#030b18', fontSize: 26, fontWeight: 900, lineHeight: 1 }}>
                {data.stats[2].value}
              </div>
              <div style={{ color: 'rgba(3,11,24,0.65)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>
                {data.stats[2].label}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        zIndex: 2,
      }}>
        <div style={{ fontSize: 9, color: '#2a4a6a', letterSpacing: 4, textTransform: 'uppercase' }}>
          Scroll
        </div>
        <div className="scroll-dot" style={{
          width: 28, height: 28,
          border: `1px solid ${accent}33`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.7">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

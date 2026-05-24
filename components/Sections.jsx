'use client'

// ─── SECTION TITLE ──────────────────────────────────────────────────────
export function SectionTitle({ title, subtitle, accent, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 56 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        marginBottom: 16,
      }}>
        <div style={{ width: 24, height: 1, background: accent, opacity: 0.6 }} />
        <span style={{
          fontSize: 10, color: accent, fontWeight: 700,
          letterSpacing: 3.5, textTransform: 'uppercase',
        }}>
          {subtitle || 'Official'}
        </span>
        <div style={{ width: 24, height: 1, background: accent, opacity: 0.6 }} />
      </div>
      <h2 className="font-display" style={{
        fontSize: 'clamp(28px, 4.5vw, 52px)',
        color: '#f0ead8', lineHeight: 1.05,
        fontWeight: 700, letterSpacing: -0.5,
        marginBottom: 16,
      }}>
        {title}
      </h2>
      <div style={{
        width: 48, height: 3,
        background: `linear-gradient(90deg, ${accent}, ${accent}55)`,
        margin: center ? '0 auto' : 0,
      }} />
    </div>
  )
}

// ─── STATS ──────────────────────────────────────────────────────────────
export function Stats({ data }) {
  const accent = data?.accentColor || '#c8a84b'
  const stats  = data?.stats || []
  return (
    <div style={{
      background: `linear-gradient(90deg, #030b18, #061020, #030b18)`,
      borderTop: `1px solid rgba(200,168,75,0.1)`,
      borderBottom: `1px solid rgba(200,168,75,0.1)`,
      padding: '0 5%',
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: '1 1 150px', textAlign: 'center',
            padding: '36px 20px',
            position: 'relative',
          }}>
            {i < stats.length - 1 && (
              <div style={{
                position: 'absolute', right: 0, top: '25%', bottom: '25%',
                width: 1,
                background: `linear-gradient(180deg, transparent, ${accent}33, transparent)`,
              }} />
            )}
            <div className="stat-number" style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 900, lineHeight: 1,
              marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: 10, color: '#4a6a8a',
              fontWeight: 700, letterSpacing: 2.5,
              textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────
export function Achievements({ data }) {
  const accent = data?.accentColor || '#c8a84b'
  const theme  = data?.themeColor  || '#1a3a6b'

  return (
    <section id="achievements" style={{ padding: '100px 5%', background: '#061020' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionTitle title="Key Achievements" subtitle="Impact & Legacy" accent={accent} center />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 24,
        }}>
          {(data?.achievements || []).map((ac, i) => (
            <div key={i} className="card-glass" style={{
              padding: '36px 28px',
              position: 'relative', overflow: 'hidden',
              cursor: 'default',
            }}>
              {/* Top gradient accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${accent}, ${accent}33, transparent)`,
              }} />

              {/* Number watermark */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontSize: 64, fontFamily: 'Playfair Display, serif',
                fontWeight: 900, color: `${accent}07`,
                lineHeight: 1, userSelect: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="icon-circle" style={{
                background: `${accent}10`,
                marginBottom: 20,
              }}>
                {ac.icon}
              </div>

              <div style={{
                fontSize: 16, fontWeight: 700, color: '#e8d8b8',
                marginBottom: 12, fontFamily: 'Playfair Display, serif',
                lineHeight: 1.3,
              }}>
                {ac.title}
              </div>

              <div style={{
                fontSize: 14, color: '#6a8aaa',
                lineHeight: 1.85,
              }}>
                {ac.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── POLICIES ────────────────────────────────────────────────────────────
export function Policies({ data }) {
  const accent = data?.accentColor || '#c8a84b'

  return (
    <section id="policies" style={{ padding: '100px 5%', background: '#030b18' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionTitle title="Vision & Policies" subtitle="Our Agenda" accent={accent} center />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {(data?.policies || []).map((p, i) => (
            <div key={i} className="card-hover" style={{
              background: '#061020',
              border: `1px solid ${accent}1a`,
              padding: '32px 28px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Left accent bar */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: `linear-gradient(180deg, ${accent}, ${accent}44)`,
              }} />

              {/* Policy index */}
              <div style={{
                fontSize: 10, color: accent, fontWeight: 700,
                letterSpacing: 3, textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div style={{
                fontSize: 16, fontWeight: 700, color: '#d8c8a0',
                marginBottom: 24, fontFamily: 'Playfair Display, serif',
                paddingBottom: 16,
                borderBottom: `1px solid ${accent}18`,
              }}>
                {p.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(p.points || []).map((pt, j) => (
                  <div key={j} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}>
                    <div style={{
                      width: 18, height: 18, flexShrink: 0,
                      border: `1px solid ${accent}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 1,
                    }}>
                      <div style={{ width: 5, height: 5, background: accent, opacity: 0.7 }} />
                    </div>
                    <span style={{ fontSize: 14, color: '#7a9ab4', lineHeight: 1.7 }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TIMELINE ────────────────────────────────────────────────────────────
export function Timeline({ data }) {
  const accent = data?.accentColor || '#c8a84b'

  return (
    <section id="journey" style={{ padding: '100px 5%', background: '#061020' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <SectionTitle title="Political Journey" subtitle="Timeline" accent={accent} center />

        <div style={{ position: 'relative', marginTop: 12 }}>
          {/* Vertical spine */}
          <div style={{
            position: 'absolute', left: 80, top: 12, bottom: 12, width: 1,
            background: `linear-gradient(180deg, ${accent}44, ${accent}22, transparent)`,
          }} />

          {(data?.timeline || []).map((t, i) => (
            <div key={i} style={{
              display: 'flex', gap: 0, marginBottom: 12,
              alignItems: 'flex-start',
            }}>
              {/* Year */}
              <div style={{
                width: 80, textAlign: 'right', flexShrink: 0,
                paddingRight: 20, paddingTop: 12,
                fontSize: 13, fontWeight: 800,
                color: accent, fontFamily: 'Playfair Display, serif',
              }}>
                {t.year}
              </div>

              {/* Dot */}
              <div style={{ flexShrink: 0, paddingTop: 14, position: 'relative', zIndex: 1 }}>
                <div className="timeline-dot" style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: accent,
                  border: `3px solid #061020`,
                  boxShadow: `0 0 0 1px ${accent}55`,
                }} />
              </div>

              {/* Event card */}
              <div className="card-hover" style={{
                flex: 1, marginLeft: 20,
                background: '#030b18',
                border: `1px solid ${accent}14`,
                padding: '14px 20px',
              }}>
                <div style={{
                  fontSize: 15, color: '#c0d4e8',
                  lineHeight: 1.6, fontWeight: 500,
                }}>
                  {t.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────
export function Contact({ data }) {
  const accent = data?.accentColor || '#c8a84b'
  const theme  = data?.themeColor  || '#1a3a6b'
  const ct = data?.contact || {}

  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.13 19.79 19.79 0 01.22 4.59 2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.47-1.47a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: 'Phone', val: ct.phone, href: `tel:${ct.phone}`,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email', val: ct.email, href: `mailto:${ct.email}`,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      label: 'Website', val: ct.website, href: `https://${ct.website}`,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
      label: 'Facebook', val: ct.facebook, href: `https://${ct.facebook}`,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
      label: 'Office', val: ct.office, href: null,
    },
  ].filter(i => i.val)

  return (
    <section id="contact" style={{ padding: '100px 5%', background: '#030b18' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <SectionTitle title="Get In Touch" subtitle="Contact" accent={accent} center />

        {/* Contact cards */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: 16,
          marginBottom: 64,
        }}>
          {items.map((item, i) => (
            <div key={i} className="card-glass" style={{ padding: '28px 24px', minWidth: 180, textAlign: 'center' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `${accent}12`,
                border: `1px solid ${accent}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                color: accent,
              }}>
                {item.icon}
              </div>
              <div style={{
                fontSize: 9, color: accent, fontWeight: 700,
                letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8,
              }}>
                {item.label}
              </div>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer"
                  style={{ fontSize: 13, color: '#8aaac8', textDecoration: 'none', lineHeight: 1.5 }}>
                  {item.val}
                </a>
              ) : (
                <div style={{ fontSize: 13, color: '#8aaac8', lineHeight: 1.5 }}>{item.val}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          padding: '52px 40px',
          background: `linear-gradient(135deg, ${theme}33 0%, #061020 50%, ${theme}22 100%)`,
          border: `1px solid ${accent}22`,
          textAlign: 'center',
        }}>
          {/* Corner accents */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', width: 20, height: 20,
              ...pos,
              borderTop: (pos.top === 0) ? `2px solid ${accent}55` : 'none',
              borderBottom: (pos.bottom === 0) ? `2px solid ${accent}55` : 'none',
              borderLeft: (pos.left === 0) ? `2px solid ${accent}55` : 'none',
              borderRight: (pos.right === 0) ? `2px solid ${accent}55` : 'none',
            }} />
          ))}

          <div className="font-display" style={{
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            color: '#f0ead8', marginBottom: 14, fontWeight: 700,
          }}>
            Join Our Movement
          </div>
          <p style={{
            color: '#5a7a9a', fontSize: 15, lineHeight: 1.8,
            maxWidth: 480, margin: '0 auto 32px',
          }}>
            Together we can build a stronger, more prosperous constituency for every family.
          </p>
          <a href={`tel:${ct.phone}`} className="btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 40px',
            background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
            color: '#030b18',
            textDecoration: 'none', fontWeight: 800,
            fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            boxShadow: `0 6px 28px ${accent}44`,
            transition: 'all 0.3s',
          }}>
            Support Us Today
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────
export function Footer({ data }) {
  const accent = data?.accentColor || '#c8a84b'
  const year   = new Date().getFullYear()

  return (
    <footer style={{
      background: '#020810',
      borderTop: `1px solid ${accent}22`,
      padding: '32px 5%',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        {/* Name */}
        <div className="font-display" style={{
          fontSize: 20, color: accent, fontWeight: 700, letterSpacing: 0.5,
        }}>
          {data?.name}
        </div>

        {/* Divider nav */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {['About','Achievements','Policies','Journey','Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontSize: 11, color: '#3a5a7a', textDecoration: 'none',
              fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = '#3a5a7a'}>
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ fontSize: 11, color: '#2a3a5a', letterSpacing: 0.5 }}>
          © {year}&nbsp;{data?.party}&nbsp;·&nbsp;All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

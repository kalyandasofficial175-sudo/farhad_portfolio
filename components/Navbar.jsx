'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Policies',     href: '#policies' },
  { label: 'Journey',      href: '#journey' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar({ data }) {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [active, setActive]       = useState('')

  const accent = data?.accentColor || '#c8a84b'
  const theme  = data?.themeColor  || '#1a3a6b'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top accent line */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, ${accent}cc, transparent)`,
      }} />

      <nav style={{
        position: 'fixed', top: 2, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(3,11,24,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(200,168,75,0.12)` : 'none',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        padding: '0 5%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, maxWidth: 1300, margin: '0 auto' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38,
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, color: '#030b18',
              fontSize: 17, fontFamily: 'Playfair Display, serif',
              boxShadow: `0 4px 16px ${accent}44`,
            }}>
              {(data?.name || 'P')[0]}
            </div>
            <div>
              <div style={{
                color: '#fff', fontWeight: 700, fontSize: 15,
                fontFamily: 'Playfair Display, serif', lineHeight: 1.1,
                letterSpacing: 0.3,
              }}>
                {data?.name || 'Portfolio'}
              </div>
              <div style={{
                color: accent, fontSize: 9, fontWeight: 700,
                letterSpacing: 2.5, textTransform: 'uppercase',
              }}>
                {data?.partyShort || 'Official'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-only">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              return (
                <a key={label}
                  href={href}
                  className="nav-link"
                  style={{
                    color: active === id ? accent : '#9ab4cc',
                    fontSize: 11, fontWeight: 600,
                    letterSpacing: 1.8, textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.25s',
                  }}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none', border: `1px solid ${accent}44`,
              color: accent, cursor: 'pointer',
              width: 40, height: 40,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
              padding: 0,
            }}
            className="mobile-only"
          >
            {open ? (
              <>
                <span style={{ width: 18, height: 1.5, background: accent, transform: 'rotate(45deg) translate(3px, 3px)', display: 'block' }} />
                <span style={{ width: 18, height: 1.5, background: accent, transform: 'rotate(-45deg) translate(3px,-3px)', display: 'block' }} />
              </>
            ) : (
              <>
                <span style={{ width: 18, height: 1.5, background: accent, display: 'block' }} />
                <span style={{ width: 12, height: 1.5, background: accent, display: 'block', marginLeft: -3 }} />
                <span style={{ width: 18, height: 1.5, background: accent, display: 'block' }} />
              </>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div style={{
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
          background: 'rgba(3,11,24,0.97)',
          borderTop: open ? `1px solid ${accent}22` : 'none',
        }}>
          <div style={{ padding: '12px 0 20px' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 5%', color: '#9ab4cc',
                  textDecoration: 'none', fontSize: 13,
                  fontWeight: 600, letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  borderBottom: `1px solid rgba(255,255,255,0.04)`,
                  transition: 'color 0.2s, padding 0.2s',
                }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent, opacity: 0.6 }} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

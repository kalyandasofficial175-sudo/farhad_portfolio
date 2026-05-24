'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SECTIONS = [
  { id: 'basic',        label: '👤 Basic Info' },
  { id: 'stats',        label: '📊 Statistics' },
  { id: 'achievements', label: '🏆 Achievements' },
  { id: 'policies',     label: '📋 Policies' },
  { id: 'timeline',     label: '📅 Timeline' },
  { id: 'contact',      label: '📞 Contact' },
  { id: 'theme',        label: '🎨 Theme' },
]

export default function AdminPage() {
  const [data, setData]         = useState(null)
  const [section, setSection]   = useState('basic')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [loading, setLoading]   = useState(true)
  const [preview, setPreview]   = useState(false)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const r = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const res = await r.json()
      if (res.success) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    } finally { setSaving(false) }
  }

  const update = (path, value) => {
    const keys = path.split('.')
    setData(prev => {
      const d = JSON.parse(JSON.stringify(prev))
      let obj = d
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return d
    })
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a1628', color: '#c8a84b', fontSize: 18 }}>
      Loading CMS...
    </div>
  )

  const accent = data?.accentColor || '#c8a84b'
  const theme  = data?.themeColor  || '#1a3a6b'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a1628', fontFamily: 'Inter, sans-serif' }}>

      {/* SIDEBAR */}
      <div style={{ width: 220, background: '#061020', borderRight: '1px solid #1a2a4a', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1a2a4a' }}>
          <div style={{ color: accent, fontWeight: 700, fontSize: 15, marginBottom: 2 }}>⚙️ CMS Admin</div>
          <div style={{ color: '#4a6a8a', fontSize: 11 }}>Political Portfolio</div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0' }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              display: 'block', width: '100%', padding: '12px 18px', textAlign: 'left',
              background: section === s.id ? '#1a2a4a' : 'transparent',
              borderLeft: section === s.id ? `3px solid ${accent}` : '3px solid transparent',
              color: section === s.id ? accent : '#6a8aaa',
              border: 'none', cursor: 'pointer', fontSize: 13,
              transition: 'all .15s',
            }}>
              {s.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: 16, borderTop: '1px solid #1a2a4a' }}>
          <Link href="/" target="_blank" style={{ display: 'block', textAlign: 'center', padding: '10px', border: `1px solid ${accent}44`, color: accent, textDecoration: 'none', fontSize: 12, marginBottom: 8 }}>
            👁 View Portfolio
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOP BAR */}
        <div style={{ background: '#061020', borderBottom: '1px solid #1a2a4a', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ color: '#c8d8e8', fontSize: 15, fontWeight: 600 }}>
            {SECTIONS.find(s => s.id === section)?.label}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {saved && <span style={{ color: '#4caf50', fontSize: 13 }}>✓ Saved!</span>}
            <button onClick={save} disabled={saving} style={{
              padding: '10px 24px', background: saving ? '#4a4a2a' : accent,
              color: '#061020', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: 700, fontSize: 13, letterSpacing: 1,
              opacity: saving ? 0.7 : 1,
            }}>
              {saving ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </div>

        {/* FORM AREA */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
          {section === 'basic' && <BasicInfo data={data} update={update} accent={accent} />}
          {section === 'stats' && <StatsEditor data={data} setData={setData} accent={accent} />}
          {section === 'achievements' && <AchievementsEditor data={data} setData={setData} accent={accent} />}
          {section === 'policies' && <PoliciesEditor data={data} setData={setData} accent={accent} />}
          {section === 'timeline' && <TimelineEditor data={data} setData={setData} accent={accent} />}
          {section === 'contact' && <ContactEditor data={data} update={update} accent={accent} />}
          {section === 'theme' && <ThemeEditor data={data} update={update} accent={accent} theme={theme} />}
        </div>
      </div>
    </div>
  )
}

// ─── FIELD HELPERS ──────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#6a8aaa', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 7 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inp = { width: '100%', padding: '11px 14px', background: '#0d1e38', border: '1px solid #2a3a5a', color: '#d0e0f0', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }
const addBtn = (accent) => ({ padding: '10px 18px', background: '#1a2a4a', color: accent, border: `1px solid ${accent}55`, cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 8 })
const delBtn = { padding: '8px 12px', background: '#3a1a1a', color: '#e06060', border: '1px solid #5a2a2a', cursor: 'pointer', fontSize: 12 }
const card = { border: '1px solid #2a3a5a', padding: '20px 24px', marginBottom: 20, background: '#0d1e38' }
const sh = (accent) => ({ color: accent, fontSize: 18, marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #1a2a4a', fontFamily: 'Playfair Display, serif' })

function Inp({ value, onChange, type = 'text', placeholder = '' }) {
  return <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={inp} onFocus={e => e.target.style.borderColor = '#c8a84b'} onBlur={e => e.target.style.borderColor = '#2a3a5a'} />
}

function Textarea({ value, onChange, rows = 4 }) {
  return <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows}
    style={{ ...inp, resize: 'vertical' }}
    onFocus={e => e.target.style.borderColor = '#c8a84b'} onBlur={e => e.target.style.borderColor = '#2a3a5a'} />
}

// ─── SECTION EDITORS ────────────────────────────────────────────────
function BasicInfo({ data, update, accent }) {
  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.success) {
        update('photo', json.url)
      } else {
        setUploadErr(json.message || 'Upload failed')
      }
    } catch {
      setUploadErr('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <h2 style={sh(accent)}>Basic Information</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Field label="Full Name"><Inp value={data.name} onChange={v => update('name', v)} /></Field>
        <Field label="Title / Designation"><Inp value={data.title} onChange={v => update('title', v)} /></Field>
        <Field label="Party Name"><Inp value={data.party} onChange={v => update('party', v)} /></Field>
        <Field label="Party Short Code"><Inp value={data.partyShort} onChange={v => update('partyShort', v)} /></Field>
        <Field label="Constituency"><Inp value={data.constituency} onChange={v => update('constituency', v)} /></Field>
        <Field label="State"><Inp value={data.state} onChange={v => update('state', v)} /></Field>
      </div>
      <Field label="Tagline (Hero subtitle)"><Inp value={data.tagline} onChange={v => update('tagline', v)} /></Field>
      <Field label="Bio / About"><Textarea value={data.bio} onChange={v => update('bio', v)} rows={5} /></Field>

      {/* ── Profile Photo ── */}
      <Field label="Profile Photo">
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Preview */}
          <div style={{
            width: 110, height: 140, flexShrink: 0,
            border: `2px solid ${accent}44`,
            background: '#0d1e38',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative',
          }}>
            {data.photo ? (
              <img src={data.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ textAlign: 'center', color: '#3a5a7a' }}>
                <div style={{ fontSize: 32, marginBottom: 4 }}>👤</div>
                <div style={{ fontSize: 10, letterSpacing: 1 }}>No Photo</div>
              </div>
            )}
            {uploading && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(3,11,24,0.75)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: accent, fontSize: 12,
              }}>
                Uploading…
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ flex: 1, minWidth: 220 }}>
            {/* Upload button */}
            <label style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 20px',
              background: uploading ? '#1a2a4a' : `${accent}18`,
              border: `1px solid ${accent}55`,
              color: uploading ? '#4a6a8a' : accent,
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: 13, fontWeight: 700,
              letterSpacing: 0.5,
              marginBottom: 12,
              transition: 'all 0.2s',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              {uploading ? 'Uploading…' : 'Upload Photo'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </label>

            {uploadErr && (
              <div style={{ color: '#e06060', fontSize: 12, marginBottom: 10 }}>⚠ {uploadErr}</div>
            )}

            <div style={{ fontSize: 11, color: '#3a5a7a', marginBottom: 10 }}>
              JPG, PNG, WebP or GIF · Max 5 MB
            </div>

            {/* Or paste URL */}
            <div style={{ fontSize: 10, color: '#4a6a8a', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
              or paste URL
            </div>
            <Inp value={data.photo} onChange={v => update('photo', v)} placeholder="https://example.com/photo.jpg" />

            {data.photo && (
              <button onClick={() => update('photo', '')} style={{
                marginTop: 8, padding: '6px 12px',
                background: '#3a1a1a', color: '#e06060',
                border: '1px solid #5a2a2a', cursor: 'pointer',
                fontSize: 12,
              }}>
                ✕ Remove Photo
              </button>
            )}
          </div>
        </div>
      </Field>
    </div>
  )
}

function StatsEditor({ data, setData, accent }) {
  const update = (i, key, val) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.stats[i][key] = val
    return d
  })
  const add = () => setData(p => ({ ...p, stats: [...p.stats, { value: '0', label: 'New Stat' }] }))
  const del = (i) => setData(p => ({ ...p, stats: p.stats.filter((_, j) => j !== i) }))

  return (
    <div>
      <h2 style={sh(accent)}>Statistics</h2>
      <p style={{ color: '#6a8aaa', fontSize: 13, marginBottom: 24 }}>These numbers appear in the gold banner below the hero section.</p>
      {(data.stats || []).map((s, i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <div style={{ width: 120, flexShrink: 0 }}>
            <Field label="Value"><Inp value={s.value} onChange={v => update(i, 'value', v)} /></Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Label"><Inp value={s.label} onChange={v => update(i, 'label', v)} /></Field>
          </div>
          <button onClick={() => del(i)} style={{ ...delBtn, marginBottom: 2 }}>✕ Remove</button>
        </div>
      ))}
      <button onClick={add} style={addBtn(accent)}>+ Add Statistic</button>
    </div>
  )
}

function AchievementsEditor({ data, setData, accent }) {
  const update = (i, key, val) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.achievements[i][key] = val
    return d
  })
  const add = () => setData(p => ({ ...p, achievements: [...p.achievements, { icon: '⭐', title: 'New Achievement', desc: 'Description here.' }] }))
  const del = (i) => setData(p => ({ ...p, achievements: p.achievements.filter((_, j) => j !== i) }))

  return (
    <div>
      <h2 style={sh(accent)}>Achievements</h2>
      {(data.achievements || []).map((ac, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: accent, fontWeight: 600 }}>Achievement {i + 1}</span>
            <button onClick={() => del(i)} style={delBtn}>✕ Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
            <Field label="Icon (emoji)"><Inp value={ac.icon} onChange={v => update(i, 'icon', v)} /></Field>
            <Field label="Title"><Inp value={ac.title} onChange={v => update(i, 'title', v)} /></Field>
          </div>
          <Field label="Description"><Textarea value={ac.desc} onChange={v => update(i, 'desc', v)} rows={3} /></Field>
        </div>
      ))}
      <button onClick={add} style={addBtn(accent)}>+ Add Achievement</button>
    </div>
  )
}

function PoliciesEditor({ data, setData, accent }) {
  const updateTitle = (i, val) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.policies[i].title = val
    return d
  })
  const updatePoint = (i, j, val) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.policies[i].points[j] = val
    return d
  })
  const addPoint = (i) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.policies[i].points.push('New point')
    return d
  })
  const delPoint = (i, j) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.policies[i].points.splice(j, 1)
    return d
  })
  const addPolicy = () => setData(p => ({ ...p, policies: [...p.policies, { title: 'New Policy', points: ['Point 1'] }] }))
  const delPolicy = (i) => setData(p => ({ ...p, policies: p.policies.filter((_, j) => j !== i) }))

  return (
    <div>
      <h2 style={sh(accent)}>Policies & Vision</h2>
      {(data.policies || []).map((p, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: accent, fontWeight: 600 }}>Policy Area {i + 1}</span>
            <button onClick={() => delPolicy(i)} style={delBtn}>✕ Remove</button>
          </div>
          <Field label="Policy Title"><Inp value={p.title} onChange={v => updateTitle(i, v)} /></Field>
          <label style={{ fontSize: 11, color: '#6a8aaa', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Points</label>
          {(p.points || []).map((pt, j) => (
            <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <Inp value={pt} onChange={v => updatePoint(i, j, v)} />
              <button onClick={() => delPoint(i, j)} style={delBtn}>✕</button>
            </div>
          ))}
          <button onClick={() => addPoint(i)} style={{ ...addBtn(accent), fontSize: 12, padding: '8px 14px' }}>+ Add Point</button>
        </div>
      ))}
      <button onClick={addPolicy} style={addBtn(accent)}>+ Add Policy Area</button>
    </div>
  )
}

function TimelineEditor({ data, setData, accent }) {
  const update = (i, key, val) => setData(p => {
    const d = JSON.parse(JSON.stringify(p))
    d.timeline[i][key] = val
    return d
  })
  const add = () => setData(p => ({ ...p, timeline: [...p.timeline, { year: '2026', event: 'New milestone' }] }))
  const del = (i) => setData(p => ({ ...p, timeline: p.timeline.filter((_, j) => j !== i) }))

  return (
    <div>
      <h2 style={sh(accent)}>Political Journey Timeline</h2>
      {(data.timeline || []).map((t, i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <div style={{ width: 100, flexShrink: 0 }}>
            <Field label="Year"><Inp value={t.year} onChange={v => update(i, 'year', v)} /></Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Event / Milestone"><Inp value={t.event} onChange={v => update(i, 'event', v)} /></Field>
          </div>
          <button onClick={() => del(i)} style={{ ...delBtn, marginBottom: 2 }}>✕</button>
        </div>
      ))}
      <button onClick={add} style={addBtn(accent)}>+ Add Timeline Entry</button>
    </div>
  )
}

function ContactEditor({ data, update, accent }) {
  return (
    <div>
      <h2 style={sh(accent)}>Contact Information</h2>
      <Field label="Phone Number"><Inp value={data.contact?.phone} onChange={v => update('contact.phone', v)} placeholder="+91 99999 00000" /></Field>
      <Field label="Email Address"><Inp value={data.contact?.email} onChange={v => update('contact.email', v)} placeholder="contact@example.com" /></Field>
      <Field label="Website"><Inp value={data.contact?.website} onChange={v => update('contact.website', v)} placeholder="www.yourwebsite.com" /></Field>
      <Field label="Facebook Page / Profile"><Inp value={data.contact?.facebook} onChange={v => update('contact.facebook', v)} placeholder="facebook.com/YourPage" /></Field>
      <Field label="Office Address"><Textarea value={data.contact?.office} onChange={v => update('contact.office', v)} rows={3} /></Field>
    </div>
  )
}

function ThemeEditor({ data, update, accent, theme }) {
  return (
    <div>
      <h2 style={sh(accent)}>Theme Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <Field label="Primary Color (Background / Dark areas)">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <input type="color" value={data.themeColor || '#1a3a6b'} onChange={e => update('themeColor', e.target.value)}
                style={{ width: 52, height: 44, border: 'none', cursor: 'pointer', background: 'none', padding: 0 }} />
              <Inp value={data.themeColor} onChange={v => update('themeColor', v)} />
            </div>
          </Field>
          <Field label="Accent Color (Gold highlights / CTAs)">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <input type="color" value={data.accentColor || '#c8a84b'} onChange={e => update('accentColor', e.target.value)}
                style={{ width: 52, height: 44, border: 'none', cursor: 'pointer', background: 'none', padding: 0 }} />
              <Inp value={data.accentColor} onChange={v => update('accentColor', v)} />
            </div>
          </Field>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#6a8aaa', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Live Preview</div>
          <div style={{ background: data.themeColor || '#1a3a6b', padding: 24, border: `3px solid ${data.accentColor || '#c8a84b'}` }}>
            <div style={{ color: data.accentColor || '#c8a84b', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Farhad Ali</div>
            <div style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>Political Leader · Assam</div>
            <div style={{ display: 'inline-block', background: data.accentColor || '#c8a84b', color: '#061020', padding: '8px 18px', fontSize: 12, fontWeight: 700 }}>
              Contact Now
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

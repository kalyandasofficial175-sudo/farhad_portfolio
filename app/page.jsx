import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Stats, Achievements, Policies, Timeline, Contact, Footer } from '@/components/Sections'
import fs from 'fs'
import path from 'path'

async function getPortfolioData() {
  try {
    const file = path.join(process.cwd(), 'data', 'portfolio.json')
    const raw = fs.readFileSync(file, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export async function generateMetadata() {
  const data = await getPortfolioData()
  return {
    title: `${data.name || 'Portfolio'} – ${data.party || 'Political Portfolio'}`,
    description: data.tagline || data.bio || 'Official Political Portfolio',
    openGraph: {
      title: data.name,
      description: data.tagline,
      images: data.photo ? [data.photo] : [],
    },
  }
}

export default async function HomePage() {
  const data = await getPortfolioData()

  return (
    <main style={{ '--theme': data.themeColor || '#1a3a6b', '--accent': data.accentColor || '#c8a84b' }}>
      <Navbar data={data} />
      <Hero data={data} />
      <Stats data={data} />
      <Achievements data={data} />
      <Policies data={data} />
      <Timeline data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </main>
  )
}

export const revalidate = 0 // Always fresh data

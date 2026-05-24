import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json')

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  const data = readData()
  return NextResponse.json(data)
}

export async function POST(request) {
  try {
    const body = await request.json()
    writeData(body)
    return NextResponse.json({ success: true, message: 'Portfolio updated successfully' })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

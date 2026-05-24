import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Keep original extension, sanitize filename
    const ext = path.extname(file.name).toLowerCase() || '.jpg'
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    if (!allowed.includes(ext)) {
      return NextResponse.json({ success: false, message: 'File type not allowed' }, { status: 400 })
    }

    const filename = `profile_${Date.now()}${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    fs.writeFileSync(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ success: true, url: `/uploads/${filename}` })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

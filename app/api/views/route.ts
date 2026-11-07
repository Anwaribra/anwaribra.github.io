import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'views.json')

function getViews(): number {
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      return typeof data.views === 'number' ? data.views : 1842
    }
  } catch {
    // fallback
  }
  return 1842
}

function saveViews(count: number) {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ views: count }, null, 2), 'utf-8')
  } catch {
    // ignore
  }
}

export async function GET() {
  const current = getViews()
  return NextResponse.json({ views: current })
}

export async function POST() {
  const next = getViews() + 1
  saveViews(next)
  return NextResponse.json({ views: next })
}

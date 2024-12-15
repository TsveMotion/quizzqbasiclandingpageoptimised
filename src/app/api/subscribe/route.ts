import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.csv')

async function initializeWaitlist() {
  try {
    // Check if data directory exists, if not create it
    try {
      await fs.access(DATA_DIR)
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true })
    }

    // Check if waitlist file exists, if not create it
    try {
      await fs.access(WAITLIST_FILE)
    } catch {
      await fs.writeFile(WAITLIST_FILE, '', 'utf8')
    }
  } catch (error) {
    console.error('Error initializing waitlist:', error)
    throw error
  }
}

async function saveToWaitlist(email: string) {
  await initializeWaitlist()

  // Read existing emails
  const data = await fs.readFile(WAITLIST_FILE, 'utf8')
  const emails = data.split('\n').filter(email => email.trim())

  // Check for duplicates
  if (emails.includes(email)) {
    throw new Error('Email already registered')
  }

  // Add new email and save
  emails.push(email)
  await fs.writeFile(WAITLIST_FILE, emails.join('\n') + '\n', 'utf8')
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Save email to file
    await saveToWaitlist(email.toLowerCase())

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    const message = error instanceof Error ? error.message : 'Failed to join waitlist'
    return NextResponse.json(
      { message },
      { status: error instanceof Error && error.message === 'Email already registered' ? 400 : 500 }
    )
  }
} 
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

export async function GET() {
  try {
    // Initialize the waitlist file and directory
    await initializeWaitlist()

    // Read the file
    const data = await fs.readFile(WAITLIST_FILE, 'utf8')
    const emails = data.split('\n').filter(email => email.trim())

    return NextResponse.json({ emails })
  } catch (error) {
    console.error('Error reading waitlist:', error)
    return NextResponse.json(
      { message: 'Failed to fetch emails', error: String(error) },
      { status: 500 }
    )
  }
} 
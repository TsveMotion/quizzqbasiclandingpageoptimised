import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.csv')

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()

    // Read current emails
    const data = await fs.readFile(WAITLIST_FILE, 'utf8')
    const emails = data.split('\n').filter(e => e.trim())

    // Remove the specified email
    const updatedEmails = emails.filter(e => e !== email)

    // Write back to file
    await fs.writeFile(WAITLIST_FILE, updatedEmails.join('\n') + (updatedEmails.length ? '\n' : ''))

    return NextResponse.json({ message: 'Email deleted successfully' })
  } catch (error) {
    console.error('Error deleting email:', error)
    return NextResponse.json(
      { message: 'Failed to delete email' },
      { status: 500 }
    )
  }
} 
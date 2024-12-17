import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const updateAdminSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow super admin to update admin accounts
    if (session.user.email?.toLowerCase() !== 'tsvetozarkt@gmail.com') {
      return NextResponse.json(
        { error: 'Only the super admin can modify administrator accounts' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = updateAdminSchema.parse(body);

    // If updating email, check if it's already taken
    if (validatedData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: validatedData.email,
          NOT: {
            id: params.id,
          },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // If password is provided, hash it
    const updateData: any = { ...validatedData };
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only administrators can view this information' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 }
      );
    }

    // Only super admin can delete administrators
    if (session.user.email?.toLowerCase() !== 'tsvetozarkt@gmail.com') {
      return NextResponse.json(
        { error: 'Only the super administrator can delete administrators.' },
        { status: 403 }
      );
    }

    const adminToDelete = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!adminToDelete) {
      return NextResponse.json(
        { error: 'Administrator not found.' },
        { status: 404 }
      );
    }

    // Prevent deletion of super admin
    if (adminToDelete.email.toLowerCase() === 'tsvetozarkt@gmail.com') {
      return NextResponse.json(
        { error: 'Cannot delete the super administrator account.' },
        { status: 403 }
      );
    }

    // Delete the administrator
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Administrator deleted successfully.' });
  } catch (error) {
    console.error('Error deleting administrator:', error);
    return NextResponse.json(
      { error: 'Failed to delete administrator.' },
      { status: 500 }
    );
  }
}

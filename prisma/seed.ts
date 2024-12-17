import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash('Krisi2201', 12);
  
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'tsvetozarkt@gmail.com' },
    update: {},
    create: {
      email: 'tsvetozarkt@gmail.com',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  
  // Create test users
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      password: await hash('test123', 12),
      role: 'STUDENT',
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      name: 'Test Teacher',
      password: await hash('test123', 12),
      role: 'TEACHER',
    },
  });
  
  console.log({ admin, student, teacher });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

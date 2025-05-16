import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '12345678'; // contraseña en texto plano
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // hasheado con 10 salt rounds

  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      deviceId: 'device-abc-123',
      name: 'Test',
      lastname: 'User',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

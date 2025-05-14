
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '12345678'; // contraseña en texto plano
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // hasheado con 10 salt rounds

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      deviceId: 'device-abc-123',
      name: 'Test',
      lastname: 'User',
    },
  });

  const meal = await prisma.meal.create({
    data: {
      userId: user.id,
      imageKey: 'uploads/meal/test-image.jpg',
      isAIAnalysisDone: false,
    },
  });

  console.log('Usuario y comida creados exitosamente');
  console.log('Email:', user.email);
  console.log('Contraseña (texto plano):', plainPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



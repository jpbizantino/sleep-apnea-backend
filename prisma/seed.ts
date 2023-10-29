import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const scoreParameter = await prisma.parameter.upsert({
    where: { name: 'DESITION_SCORE' },
    update: {},
    create: {
      name: 'DESITION_SCORE',
      value: '17',
      description: 'Score para decisión',
    },
  });

  const roleAdmin = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      active: true,
    },
  });

  const userAdmin = await prisma.user.upsert({
    where: { email: 'dev@dev.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'dev@dev.com',
      active: true,
      password: '1233',
      roleId: (await prisma.role.findUnique({ where: { name: 'ADMIN' } }))
        .roleId,
    },
  });

  console.log({ alice: scoreParameter, role: roleAdmin, user: userAdmin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const roundsOfHashing = 10;

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

  const hassedPass = await bcrypt.hash('123456', roundsOfHashing);

  const userDev = await prisma.user.upsert({
    where: { email: 'dev' },
    update: {},
    create: {
      name: 'Developer',
      email: 'dev',
      active: true,
      password: hassedPass,
      roleId: (await prisma.role.findUnique({ where: { name: 'ADMIN' } }))
        .roleId,
    },
  });

  const userAdmin = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin',
      active: true,
      password: hassedPass,
      roleId: (await prisma.role.findUnique({ where: { name: 'ADMIN' } }))
        .roleId,
    },
  });

  console.log({ scoreParameter, roleAdmin, userAdmin, userDev });
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

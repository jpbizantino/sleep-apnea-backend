import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const scoreParameter = await prisma.parameters.upsert({
    where: { parameterName: 'DESITION_SCORE' },
    update: {},
    create: {
      parameterName: 'DESITION_SCORE',
      parameterValue: '17',
      parameterDescription: 'Score para decisión',
    },
  });

  const roleAdmin = await prisma.roles.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      active: true,
    },
  });

  console.log({ alice: scoreParameter, roleAdmin });
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

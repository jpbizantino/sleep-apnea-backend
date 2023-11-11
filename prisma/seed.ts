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

  const ageRule = await prisma.parameter.upsert({
    where: { name: 'AGE_GREATER_THAN' },
    update: {},
    create: {
      name: 'AGE_GREATER_THAN',
      value: '29',
      description: 'Edad a partir de la cual suma 1 al score',
    },
  });

  const genderRule = await prisma.parameter.upsert({
    where: { name: 'IS_A_MAN' },
    update: {},
    create: {
      name: 'IS_A_MAN',
      value: 'M',
      description: 'Si el encuestador el MALE suma 1 al score',
    },
  });

  const bmiRule = await prisma.parameter.upsert({
    where: { name: 'BMI_EQUAL_OR_GREATER_THAN' },
    update: {},
    create: {
      name: 'BMI_EQUAL_OR_GREATER_THAN',
      value: '25',
      description: 'Indice de Masa Corporal',
    },
  });

  const bmiScore = await prisma.parameter.upsert({
    where: { name: 'BMI_SCORE' },
    update: {},
    create: {
      name: 'BMI_SCORE',
      value: '2',
      description: 'Edad a partir de la cual suma 1 al score',
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

  console.log({
    scoreParameter,
    roleAdmin,
    userAdmin,
    userDev,
    ageRule,
    genderRule,
    bmiRule,
    bmiScore,
  });
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

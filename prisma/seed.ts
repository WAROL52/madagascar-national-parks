import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function userManagerFactory(length: number = 1000) {
  await prisma.user.upsert({
    where: { email: "raberolio@gmail.com" },
    update: {},
    create: {
      email: "raberolio@gmail.com",
      firstname: "rabe",
      lastname: "rolio",
      sexe: "Homme",
    },
  });
}

async function main() {}
main().then(async () => {
  console.log("(seed finii)------------");
});
// .then(() => {
//   prisma.$disconnect();
//   console.log('Au revoir !');
//   process.exit(1);
// });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function userManagerFactory(length: number = 1000) {
  // await prisma.user.upsert({
  //   where: { email: "raberolio@gmail.com" },
  //   update: {},
  //   create: {
  //     email: "raberolio@gmail.com",
  //     firstname: "rabe",
  //     lastname: "rolio",
  //     sexe: "Homme",
  //   },
  // });
}

async function main() {
  const prisma = new PrismaClient();
  console.log("seeed...:start");

  const email = await prisma.email.upsert({
    where: { email: "raberolio@gmail.com" },
    create: {
      email: "raberolio@gmail.com",
    },
    update: {},
  });
  console.log("seeed...:end");
}
main().then(async () => {
  console.log("(seed finii)------------");
});
// .then(() => {
//   prisma.$disconnect();
//   console.log('Au revoir !');
//   process.exit(1);
// });

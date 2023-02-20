import "./globals.css";
// import "./style.bundle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bootstrap from "./Bootstrap";
import { PrismaClient } from "@prisma/client";
async function seed() {
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
// seed();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body data-kt-app-layout="dark-sidebar">
        <Bootstrap>{children}</Bootstrap>
      </body>
    </html>
  );
}

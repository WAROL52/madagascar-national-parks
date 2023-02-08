import "./globals.css";
// import "./style.bundle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bootstrap from "./Bootstrap";
import { testData } from "@/prisma/data";
testData();
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

"use client";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import SSRProvider from "react-bootstrap/SSRProvider";
// import PersistentDrawerLeft from "./apps/AppsMenu";
import { ProSidebarProvider } from "react-pro-sidebar";
import BootstrapClient from "./BootstrapClient";

export default function Bootstrap({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BootstrapClient>
        <SSRProvider>
          {/* <AppNextUIProvider> */}
          {/* <PersistentDrawerLeft> */}
          <ProSidebarProvider>
            <HeaderNav />
            {children}
            <FooterNav />
          </ProSidebarProvider>
          ;{/* </PersistentDrawerLeft> */}
          {/* </AppNextUIProvider> */}
        </SSRProvider>
      </BootstrapClient>
    </>
  );
}

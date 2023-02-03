import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import SSRProvider from "react-bootstrap/SSRProvider";

export default function Bootstrap({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SSRProvider>
        <HeaderNav />
        {/* <AppNextUIProvider> */}
        {children}
        {/* </AppNextUIProvider> */}
        <FooterNav />
      </SSRProvider>
    </>
  );
}

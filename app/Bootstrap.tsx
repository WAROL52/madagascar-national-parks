import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";

export default function Bootstrap({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {/* <AppNextUIProvider> */}
      {children}
      {/* </AppNextUIProvider> */}
      <FooterNav />
    </>
  );
}

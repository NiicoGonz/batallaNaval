import Navbar from "./components/Navbar";

interface Props {
  children: any;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;

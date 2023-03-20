import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';

export function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

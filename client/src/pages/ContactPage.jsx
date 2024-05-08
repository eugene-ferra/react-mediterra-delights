import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Contactslayout from "../components/layout/ContactsLayout/ContactsLayout";

const ContactPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <Contactslayout />
      </MainLayout>
      <Footer />
    </>
  );
};

export default ContactPage;

import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useProducts } from "../hooks/useProducts";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Promo from "../components/layout/Promo/Promo";
import AboutBlock from "../components/layout/AboutBlock/AboutBlock";
import Gallery from "../components/layout/Gallery/Gallery";
import Product from "../components/block/Product/Product";
import BlockHeader from "../components/layout/BlockHeader/BlockHeader";
import Modal from "../components/block/Modal/Modal";
import Title from "../components/common/Title/Title";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";
import BtnBlock from "../components/layout/BtnBlock/BtnBlock";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    products: popular,
    error: popularError,
    isLoading: popularLoading,
  } = useProducts("sort=-avgRating");
  const {
    products: soups,
    error: soupsError,
    isLoading: soupLoading,
  } = useProducts("category=Супи&sort=-avgRating");
  const {
    products: meat,
    error: meatError,
    isLoading: saladLoading,
  } = useProducts("category=М'ясні+страви&sort=-avgRating");
  const {
    products: vegan,
    error: veganError,
    isLoading: veganLoading,
  } = useProducts("isVegan=true&sort=-avgRating");
  const {
    products: news,
    error: newsError,
    isLoading: newsLoading,
  } = useProducts("isNewProduct=true&sort=-avgRating");

  const { user } = useUser();
  const { pathname } = useLocation();

  const onClose = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <MainLayout>
        <Promo />
        <AboutBlock />
        <Gallery
          isLoading={popularLoading}
          error={popularError}
          top={
            <BlockHeader
              title={"Популярні страви"}
              to={"products"}
              linkText={"Всі страви"}
            />
          }
          items={popular?.[1]?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
              onUserError={() => setIsModalOpen(true)}
            />
          ))}
        />
        <Gallery
          isLoading={newsLoading}
          error={newsError}
          top={<BlockHeader title={"Новинки"} />}
          items={news?.[1]?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
              onUserError={() => setIsModalOpen(true)}
            />
          ))}
        />
        <Gallery
          isLoading={soupLoading}
          error={soupsError}
          top={
            <BlockHeader
              title={"Кращі супи"}
              to={"products?category=Супи"}
              linkText={"Всі супи"}
            />
          }
          items={soups?.[1]?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
              onUserError={() => setIsModalOpen(true)}
            />
          ))}
        />
        <Gallery
          isLoading={saladLoading}
          error={meatError}
          top={
            <BlockHeader
              title={"Кращі страви з м'яса"}
              to={"products?category=М'ясні+страви"}
              linkText={"Всі м'ясні страви"}
            />
          }
          items={meat?.[1]?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
              onUserError={() => setIsModalOpen(true)}
            />
          ))}
        />
        <Gallery
          isLoading={veganLoading}
          error={veganError}
          top={<BlockHeader title={"Для веганів"} />}
          items={vegan?.[1]?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
              onUserError={() => setIsModalOpen(true)}
            />
          ))}
        />
      </MainLayout>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={onClose} align="center">
        <Title type={"small"} align={"center"}>
          Увійдіть в свій аккаунт!
        </Title>
        <Text align={"center"}>
          Додавати товар в улюблені можуть лише зареєстровані користувачі сайту
        </Text>
        <BtnBlock>
          <Button asTag={"Link"} to={`/login?next=${pathname}`}>
            Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
          </Button>
          <Button asTag={"Link"} to={`/signup?next=${pathname}`} type={"outline-red"}>
            Реєстрація
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default HomePage;

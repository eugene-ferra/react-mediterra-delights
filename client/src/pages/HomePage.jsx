import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MainLayout from "../components/MainLayout/MainLayout";
import Promo from "../components/Promo/Promo";
import AboutBlock from "../components/AboutBlock/AboutBlock";
import Gallery from "../components/Gallery/Gallery";
import { useProducts } from "../hooks/useProducts";
import Product from "../components/Product/Product";
import BlockHeader from "../components/common/BlockHeader/BlockHeader";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import Modal from "../components/common/Modal/Modal";
import Title from "../components/common/Title/Title";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <Title type={"small"} align={"center"}>
            Увійдіть в свій аккаунт!
          </Title>
          <Text align={"center"}>
            Додавати товар в улюблені можуть лише зареєстровані користувачі сайту
          </Text>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Button asTag={"Link"} to={"/login"}>
              Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
            </Button>
            <Button asTag={"Link"} to={"/signup"} type={"outline-red"}>
              Реєстрація
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;

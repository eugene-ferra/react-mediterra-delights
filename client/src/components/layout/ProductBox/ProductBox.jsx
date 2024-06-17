import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { FormProvider, useForm } from "react-hook-form";
import { usePostReview } from "./usePostReview";
import { useSavedProduct } from "../../../hooks/useSavedProduct";
import { useCart } from "../../../hooks/useCart";
import { useProducts } from "../../../hooks/useProducts";
import { useReviews } from "../../../hooks/useReviews";
import Container from "../Container/Container";
import Title from "../../common/Title/Title";
import Stars from "../../common/Stars/Stars";
import Text from "../../common/Text/Text";
import Button from "../../common/Button/Button";
import Picture from "../../common/Picture/Picture";
import ThumbsGallery from "../../block/ThumbsGallery/ThumbsGallery";
import Marker from "../../common/Marker/Marker";
import Price from "../../common/Price/Price";
import Char from "../../common/Char/Char";
import Modal from "../../block/Modal/Modal";
import Form from "../Form/Form";
import TextArea from "../../common/TextArea/TextArea";
import StarRating from "../../common/StarRating/StarRating";
import Review from "../../block/Review/Review";
import Loader from "../../common/Loader/Loader";
import BtnBlock from "../BtnBlock/BtnBlock";
import styles from "./ProductBox.module.scss";
import Pagination from "../../block/Pagination/Pagination";
import PageLoader from "../PageLoader/PageLoader";
import Gallery from "../Gallery/Gallery";
import BlockHeader from "../BlockHeader/BlockHeader";
import Product from "../../block/Product/Product";
import loginImg from "../../../assets/login.svg";

const ProductBox = ({ slug }) => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { products, isLoading: isProductsLoading, error } = useProducts(`slug=${slug}`);

  if (error) navigate(`/${error?.status}`);

  const product = products?.[1]?.[0];
  const isSaved = user ? user.savedProducts.includes(products?.[1]?.[0]?.id) : false;

  const { saveProduct, isSaving, deleteProduct, isDeleting } = useSavedProduct(
    product?.id
  );

  const [page, setPage] = useState({ page: 1 });

  const { reviews, isLoading: isReviewsLoading } = useReviews(
    `isModerated=true&productID=${product?.id}&page=${page.page}&limit=5`
  );

  const { reviews: userReview } = useReviews(
    `&productID=${product?.id}&userID=${user?.id}`
  );

  const {
    products: categoryProducts,
    error: categoryError,
    isLoading: categoryLoading,
  } = useProducts(`category=${product?.category}&sort=-avgRating`);

  const methods = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { postReview, isLoading, errors } = usePostReview(() => {
    methods.reset();
    setIsModalOpen(false);
  });

  const { pathname } = useLocation();

  useEffect(() => {
    if (product) document.title = product?.title;
  }, [product]);

  const {
    addToCart,
    deleteFromCart,
    isInCart,
    isAdding: isAddingToCart,
    isDeleting: isDeletingFromCart,
  } = useCart();

  async function onSubmit(data) {
    data["productID"] = product?.id;
    data["userID"] = user?.id;
    postReview(data);
  }

  return (
    <>
      <Container className={styles.container}>
        {isProductsLoading && <PageLoader />}

        {!isProductsLoading && product && (
          <div className={styles.box}>
            <div className={styles.top}>
              <div className={styles.images}>
                {product?.images.length > 0 ? (
                  <ThumbsGallery
                    images={[product.imgCover, ...product.images]}
                    alt={product?.title}
                  />
                ) : (
                  <Picture formats={product?.imgCover} alt={product?.title} />
                )}
              </div>
              <div className={styles.info}>
                <Title>{product?.title}</Title>
                <Text>{product?.category}</Text>
                {(product?.isNewProduct ||
                  product?.discountPrice ||
                  product?.isVegan) && (
                  <div className={styles.options}>
                    {product?.isNewProduct && <Marker type={"green"}>Новинка</Marker>}
                    {product?.discountPrice && <Marker type={"red"}>% Акція</Marker>}
                    {product?.isVegan === true && <Marker type={"blue"}>Vegan</Marker>}
                  </div>
                )}
                <Stars rating={product?.avgRating} reviews={product?.reviewCount} />

                <Text> {product?.description}</Text>
                <div className={styles.actions}>
                  <div className={styles.buy}>
                    <>
                      <Price
                        discountPrice={product?.discountPrice}
                        price={product?.price}
                      />
                      <Button
                        className={styles.buyBtn}
                        onClick={
                          isInCart(product?.id)
                            ? () => deleteFromCart(product?.id)
                            : () => addToCart({ id: product?.id, quantity: 1 })
                        }
                      >
                        {isAddingToCart || isDeletingFromCart ? (
                          <Loader />
                        ) : isInCart(product?.id) ? (
                          "Видалити з кошика"
                        ) : (
                          "До кошика"
                        )}
                      </Button>
                    </>
                  </div>
                  {user ? (
                    <Button
                      onClick={isSaved ? deleteProduct : saveProduct}
                      disabled={isDeleting || isSaving}
                    >
                      {(isDeleting || isSaving) && <Loader />}
                      {isSaved ? "Видалити з улюблених" : "В улюблені"}
                    </Button>
                  ) : (
                    <Button onClick={() => setIsAuthModalOpen(true)}>В улюблені</Button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.moreInfo}>
                <Title type={"small"} className={styles.title}>
                  Детальна інформація
                </Title>
                <div className={styles.chars}>
                  <Char name={"Час приготування"} value={`${product?.cookTime} хв`} />
                  <Char name={"Вага страви"} value={`${product?.weight} г`} />

                  <Char
                    name={"Білки (на 100 г)"}
                    value={
                      product?.nutrients.protein
                        ? `${product?.nutrients.protein} г`
                        : "Не вказано"
                    }
                  />
                  <Char
                    name={"Жири (на 100 г)"}
                    value={
                      product?.nutrients.fats
                        ? `${product?.nutrients.fats} г`
                        : "Не вказано"
                    }
                  />
                  <Char
                    name={"Вуглеводи (на 100 г)"}
                    value={
                      product?.nutrients.carbohydrates
                        ? `${product?.nutrients.carbohydrates} г`
                        : "Не вказано"
                    }
                  />
                  <Char
                    name={"Калорійність (на 100 г)"}
                    value={
                      product?.nutrients.calories
                        ? `${product?.nutrients.calories} ккал`
                        : "Не вказано"
                    }
                  />
                </div>
                {product?.fullText && <Text>{product?.fullText}</Text>}
              </div>

              <div className={styles.reviews}>
                <div className={styles.reviewsHeader}>
                  <Title type={"small"}>Відгуки</Title>

                  {user && !userReview && (
                    <Button onClick={() => setIsModalOpen(true)}>Написати відгук</Button>
                  )}
                  {!user && (
                    <Button onClick={() => setIsModalOpen(true)}>Написати відгук</Button>
                  )}
                </div>
                <div className={styles.reviews}>
                  {isReviewsLoading && <PageLoader />}

                  {!isReviewsLoading && reviews?.length > 0 && (
                    <>
                      {reviews?.[1]?.map((review) => (
                        <Review review={review} key={review.id} />
                      ))}
                      <Pagination
                        totalCount={reviews?.[0]?.pages}
                        currPage={page.page}
                        onLink={setPage}
                      />
                    </>
                  )}

                  {!reviews && !isReviewsLoading && !userReview && (
                    <Text align={"center"}>
                      Відгуків ще немає. Будьте першим, хто залише відгук на цей продукт!
                    </Text>
                  )}
                  {!reviews && !isReviewsLoading && userReview && (
                    <Text align={"center"}>
                      Ваш відгук знаходиться на модерації. Дякуємо!
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isProductsLoading && product && (
          <Gallery
            isLoading={categoryLoading}
            error={categoryError}
            top={<BlockHeader title={"Схожі страви"} />}
            items={categoryProducts?.[1]?.map((item) => (
              <Product
                product={item}
                key={item?.id}
                isSaved={user?.savedProducts?.includes(item?.id)}
                onUserError={() => setIsModalOpen(true)}
              />
            ))}
          />
        )}
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {user ? (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Title align={"center"} type={"small"}>
                Сподобалася страва? Залиште відгук!
              </Title>
              <StarRating
                title={"Оцінка*"}
                name={"rating"}
                errorMessage={errors?.rating}
                disabled={isLoading}
              />
              <TextArea
                type={"text"}
                title={"Коментар*"}
                register={methods.register("review")}
                disabled={isLoading}
                errorMessage={errors?.review}
              />
              <Button style={{ margin: "0 auto" }}>Залишити відгук</Button>
            </Form>
          </FormProvider>
        ) : (
          <>
            <Title align={"center"} type={"small"}>
              Залишати відгуки можуть лише користувачі сайту!
            </Title>
            <BtnBlock>
              <Button asTag={"Link"} to={`/login?next=${pathname}`}>
                Увійти
              </Button>
              <Button
                type={"outline-red"}
                asTag={"Link"}
                to={`/signup?next=${pathname}`}
              >
                Зареєструватися
              </Button>
            </BtnBlock>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        align="center"
      >
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

export default ProductBox;

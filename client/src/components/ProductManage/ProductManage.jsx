import ManageItem from "../ManageItem/ManageItem";
import Button from "../common/Button/Button";
import Picture from "../common/Picture/Picture";
import Title from "../common/Title/Title";

const ProductManage = () => {
  return (
    <>
      <Title>Додані товари:</Title>
      <Button asTag={"Link"} to={"new"}>
        Створити
      </Button>
      <ManageItem
        columns={["Фото", "Назва", "Категорія", "Вага", "Ціна", "Знижка", "Рейтинг"]}
        rowsData={[
          [
            <Picture
              formats={{
                jpg: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
              }}
              key={1}
            />,
            "test1",
            "category1",
            100,
            200,
            "-",
            3.4,
          ],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
          ["ava", "test1", "category1", 100, 200, "-", 3.4],
        ]}
      />
    </>
  );
};

export default ProductManage;

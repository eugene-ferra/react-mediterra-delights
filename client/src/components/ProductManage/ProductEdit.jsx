import Title from "../common/Title/Title";
import Button from "../common/Button/Button";

const ProductEdit = () => {
  return (
    <>
      <Title>Додані товари:</Title>
      <Button asTag={"Link"} to={"new"}>
        Створити
      </Button>
    </>
  );
};

export default ProductEdit;

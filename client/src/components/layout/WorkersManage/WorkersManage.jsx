import { Link, useSearchParams } from "react-router-dom";
import { useWorkers } from "../../../hooks/useWorkers";
import { prettyTime } from "../../../utils/prettyTime";
import Title from "../../common/Title/Title";
import ManageItem from "../ManageItem/ManageItem";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Picture from "../../common/Picture/Picture";
import Pagination from "../../block/Pagination/Pagination";
import Button from "../../common/Button/Button";

const WorkersManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { workers, isError, error, isLoading } = useWorkers(searchParams.toString());

  return (
    <>
      <Title>Працівники ресторану</Title>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["", "Прізвище", "Ім'я", "Группа", "Посада", "Працює з"]}
        rowsData={workers?.data?.map((item, i) => [
          <Link to={`${item.id}`} key={`${item.id}-${i}`}>
            <Picture
              formats={item.photo}
              alt={`${item.lastName} ${item.name}`}
              style={{ width: "120px", maxHeight: "120px", objectFit: "cover" }}
            />
          </Link>,
          <Link to={`${item.id}`} key={`${item.name}-${i}`}>
            {item.name}
          </Link>,
          <Link to={`${item.id}`} key={`${item.lastName}-${i}`}>
            {item.lastName}
          </Link>,
          <Link to={`${item.id}`} key={`${item.positionType}-${i}`}>
            {item.positionType}
          </Link>,
          <Link to={`${item.id}`} key={`${item.position}-${i}`}>
            {item.position}
          </Link>,
          <Link to={`${item.id}`} key={`${item.startWorkDate}-${i}`}>
            {prettyTime(item.startWorkDate, {
              month: "long",
              year: "numeric",
            })}
          </Link>,
        ])}
      >
        <Pagination
          totalCount={workers?.pages}
          siblingCount={2}
          currPage={searchParams.get("page")}
          onLink={setSearchParams}
        />

        <Button asTag={"Link"} to={"new"}>
          Створити
        </Button>
      </ManageItem>
    </>
  );
};

export default WorkersManage;

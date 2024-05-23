import { prettyTime } from "../../../utils/prettyTime";
import Picture from "../../common/Picture/Picture";
import Text from "../../common/Text/Text";
import styles from "./WorkerCard.module.scss";

function calculateAge(dateOfBirth) {
  const currentDate = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  const dayDifference = currentDate.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

const WorkerCard = ({ worker }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.img}>
          <Picture formats={worker?.photo} alt={`${worker?.lastName} ${worker.name}`} />
        </div>
        <div className={styles.text}>
          <Text className={styles.workerTitle} type={"big"}>
            {`${worker.name} ${worker.lastName},`}{" "}
            <span>{calculateAge(worker.dateOfBirth)} р.</span>{" "}
          </Text>

          <Text>
            <span className={styles.subTitle}>Посада: </span>
            {worker.position}
          </Text>
          <Text>
            <span className={styles.subTitle}>Працює з: </span>
            {prettyTime(worker.startWorkDate, { month: "long", year: "numeric" })}
          </Text>
        </div>
      </div>
      <div className={styles.summary}>
        <Text type={"big"}>Біографія</Text>
        <Text className={styles.workerText}>{worker.summary}</Text>
      </div>

      {worker?.additionalInfo && (
        <div className={styles.additional}>
          <Text type={"big"}>Додаткова інформація</Text>
          <Text className={styles.workerText}> {worker?.additionalInfo}</Text>
        </div>
      )}
    </div>
  );
};

export default WorkerCard;

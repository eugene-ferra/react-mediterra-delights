import BlockHeader from "../BlockHeader/BlockHeader";
import Container from "../Container/Container";
import Picture from "../../common/Picture/Picture";
import Text from "../../common/Text/Text";
import about1 from "../../../assets/about-1.jpg";
import about2 from "../../../assets/about-2.jpg";
import styles from "./AboutBlock.module.scss";

const AboutBlock = () => {
  return (
    <Container>
      <div className={styles.inner}>
        <BlockHeader title={"Про нас"} linkText={"Більше інформації"} to={"/about"} />

        <div className={styles.aboutItem}>
          <Text>
            Ukrainian Delights - це не просто ресторан, це кулінарна підказка про те, як
            справжній смак України може змінити ваше бачення про їжу. Заклад створений на
            віру в те, що кожна страва - це історія, що розповідає про традиції, смаки і
            любов до їжі. Наша команда шеф-кухарів - це справжні майстри, які з великою
            увагою обирають найсвіжіші інгредієнти та традиційні рецепти, щоб створити
            для вас неповторний смаковий досвід. Від найменших деталей у приготуванні до
            обслуговування кожного гостя - усе в Ukrainian Delights націлене на те, щоб
            кожен відвідувач відчував себе особливим і залишався задоволеним.
          </Text>
          <Picture formats={{ jpg: about1 }} alt={"Про нас"} />
        </div>
        <div className={styles.aboutItem}>
          <Text>
            Наш ресторан - це не лише місце для поїдання, це місце для створення
            незабутніх спогадів та ділення радістю з близькими. Ми віримо, що обід або
            вечеря - це не лише акт харчування, а й можливість насолодитися спільністю,
            обмінятися емоціями та згадати добрі часи. Тому кожен, хто крокує до наших
            дверей, стає частиною нашої великої родини Ukrainian Delights, де кожен день
            - це свято смаку та гостинності. Приходьте до нас, щоб насолодитися справжнім
            українським гастрономічним досвідом і створити незабутні моменти разом з
            нами.
          </Text>
          <Picture formats={{ jpg: about2 }} alt={"Про нас"} />
        </div>
      </div>
    </Container>
  );
};

export default AboutBlock;

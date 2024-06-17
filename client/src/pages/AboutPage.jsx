import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import AboutBlock from "../components/layout/AboutBlock/AboutBlock";
import Text from "../components/common/Text/Text";
import Picture from "../components/common/Picture/Picture";
import restraunt from "../assets/restraunt.jpg";
import Gallery from "../components/layout/Gallery/Gallery";
import List from "../components/common/List/List";
import img1 from "../assets/gallery-1.jpg";
import img2 from "../assets/gallery-2.jpg";
import img3 from "../assets/gallery-3.jpg";
import img4 from "../assets/gallery-4.jpg";
import img5 from "../assets/gallery-5.jpg";
import img6 from "../assets/gallery-6.jpg";
import img7 from "../assets/gallery-7.jpg";
import img8 from "../assets/gallery-8.jpg";
import img9 from "../assets/gallery-9.jpg";
import img10 from "../assets/gallery-10.jpg";
import img11 from "../assets/gallery-11.jpg";
import img12 from "../assets/gallery-12.jpg";
import BlockHeader from "../components/layout/BlockHeader/BlockHeader";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Про нас";
  }, []);

  return (
    <>
      <Header />
      <MainLayout>
        <AboutBlock title={"Про нас"} reverse={true}>
          <Text align={"justify"}>
            {`Ресторан "Ukrainian Delights" - це затишний куточок,
           де можна скуштувати автентичні страви української кухні, приготовлені з любов'ю та за традиційними рецептами. 
           Наша історія розпочалася з невеликої сімейної пекарні, де ми ділилися з друзями та сусідами секретами 
           бабусиних рецептів. З часом затишні посиденьки за столом з ароматною випічкою та запашним чаєм 
           перетворилися на справжній ресторан, де кожен гість може відчути тепло української гостинності.
           Ми пишаємося тим, що використовуємо лише свіжі, сезонні продукти, вирощені на українській землі. Наші страви 
           готуються з душею, за перевіреними часом рецептами, які передаються з покоління в покоління.
           У меню ресторану "Ukrainian Delights" ви знайдете все розмаїття української кухні: від ароматних 
           борщів та вареників до ситних м'ясних страв та вишуканих десертів. Ми також пропонуємо широкий 
           вибір вин та інших напоїв, які чудово доповнять ваш обід або вечерю.
           "Ukrainian Delights" - це місце, де ви можете не лише смачно поїсти, але й познайомитися з українською культурою та традиціями. 
           У нас ви завжди знайдете привітну атмосферу, щиру посмішку та гостинність. `}
          </Text>
          <Picture formats={{ jpg: restraunt }} alt={"Про нас"} />
        </AboutBlock>

        <Gallery
          height={300}
          top={<BlockHeader title={"Наш ресторан"} />}
          items={[
            <Picture formats={{ jpg: img1 }} alt={"Про нас"} key={1} />,
            <Picture formats={{ jpg: img2 }} alt={"Про нас"} key={2} />,
            <Picture formats={{ jpg: img3 }} alt={"Про нас"} key={3} />,
            <Picture formats={{ jpg: img4 }} alt={"Про нас"} key={4} />,
            <Picture formats={{ jpg: img5 }} alt={"Про нас"} key={5} />,
            <Picture formats={{ jpg: img6 }} alt={"Про нас"} key={6} />,
            <Picture formats={{ jpg: img7 }} alt={"Про нас"} key={7} />,
            <Picture formats={{ jpg: img8 }} alt={"Про нас"} key={8} />,
            <Picture formats={{ jpg: img9 }} alt={"Про нас"} key={9} />,
            <Picture formats={{ jpg: img10 }} alt={"Про нас"} key={10} />,
            <Picture formats={{ jpg: img11 }} alt={"Про нас"} key={11} />,
            <Picture formats={{ jpg: img12 }} alt={"Про нас"} key={12} />,
          ]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            450: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
        />

        <AboutBlock title={"Атмосфера"}>
          <Text align={"justify"}>
            {`Переступивши поріг ресторану "Українські Делікатеси", ви опинитеся в затишному просторі, де кожна деталь 
            продумана для того, щоб ви відчули себе як вдома. Інтер'єр ресторану оформлений у стилі української хати. 
            Стіни прикрашені вишитими рушниками та картинами з українськими пейзажами. 
            На столах лежать лляні скатертини, а на полицях виставлені керамічні глечики та інші предмети народного промислу. 
            М'які меблі та приглушене освітлення створюють атмосферу спокою та розслаблення. Тут ви можете насолодитися 
            смачною їжею в приємній компанії друзів або родини. У ресторані звучить традиційна українська музика, 
            яка створює атмосферу гостинності та затишку.`}
          </Text>
          <List
            title={
              "Окрім основного меню, ми регулярно організовуємо спеціальні події та заходи:"
            }
          >
            <Text>
              Майстер-класи з приготування українських страв: Ви зможете не лише
              скуштувати смачні страви, але й навчитися готувати їх власноруч.
            </Text>
            <Text>
              Вечори української музики: Насолодіться виступами талановитих музикантів,
              які виконають для вас найкращі українські народні пісні.
            </Text>
            <Text>
              Дегустації українських вин: Відкрийте для себе різноманіття українських вин
              та навчіться їх правильно дегустувати.
            </Text>
            <Text>
              Тематичні вечори: Ми запрошуємо вас на святкування українських народних
              свят, таких як Різдво, Великдень, Масляна та інші.
            </Text>
          </List>
        </AboutBlock>
      </MainLayout>
      <Footer />
    </>
  );
};

export default AboutPage;

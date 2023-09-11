import "./About.scss";
import HeadBlock from "../HeadBlock/HeadBlock";
import AboutInner from "./AboutInner";

function About() {
  return (
    <div className="about">
      <div className="container">
        <HeadBlock link={"#"} />
        <AboutInner />
      </div>
    </div>
  );
}

export default About;

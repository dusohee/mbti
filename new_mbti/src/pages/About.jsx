import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="aboutPage">
      <article className="pageTitleGroup">
        <h1 className="pageTitle">
          우리 회사 <span className="fontOrange">MBTI</span> 분석
        </h1>
        <img src="/images/beeker.svg" alt="beeker" className="beeker" />
        <img src="/images/chemical.svg" alt="chemical" className="chemical" />
      </article>

      <article className="overview-Result">
        <img
          src="/images/about/bar-chart.svg"
          alt="chart"
          className="chart-result"
        />
        <p className="summary-result">
          우리 회사는 INTJ가 제일 많아. INTJ는 논리적으로 세상을 구조화하며 장기적 전략을 설계하는 조용한 전략가형이야.
          <br />
          NT(전략가) 중심의 전략·분석·혁신 성향이 강한 조직은, 문제 해결과 새로운 시도를 즐기는 분위기가 뚜렷해.
          <br />
          동시에 ENFJ·ENFP·ISFJ 등 F성향을 가진 사람 중심 커뮤니케이션이 강한 구성원도 많아 협업의 결이 부드러운 편이야.
          <br />
          전체적으로 아이디어가 활발히 오가고, 구조적 사고와 실험 정신이 균형 잡힌 조직문화라고 볼 수 있어.
        </p>
      </article>

      <article className="about-btnGroup">
        <Link to="/team" className="about-btnItem">
          <div className="flex">
            <img
              src="/images/about/teamHei.svg"
              alt="ico"
              width="55px"
            />
            <p className="pink-hover">우리팀 MBTI 구성은?</p>
          </div>
          <p className="arr pink-hover">→</p>
        </Link>
        <Link to="/evsi" className="about-btnItem">
          <div className="flex">
            <img
              src="/images/about/blue-planet.svg"
              alt="ico"
              width="60px"
            />
            <p className="blue-hover">화성에서 온 E, 금성에서 온 I</p>
          </div>
          <p className="arr blue-hover">→</p>
        </Link>
      </article>

      <Link to="/">
        <img src="/images/back-btn.svg" alt="back" className="home-btn" />
      </Link>
    </div>
  );
}

export default About;

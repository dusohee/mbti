import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="townLanding">
      <article className="titleArea">
        <h1 className="prjTitle">
          우리 회사가 <span className="fontRed">MBTI</span> 마을이라면?
        </h1>
        <div className="prjMenuGroup">
          <Link to="/town" className="prjMenuItem">
            <img src="/images/map.svg" alt="town" />
            <button className="prjMenuBtn blueBtn">마을 방문가기</button>
          </Link>
          <Link to="/about" className="prjMenuItem">
            <img src="/images/look.svg" alt="about" />
            <button className="prjMenuBtn purpleBtn">우리회사 분석</button>
          </Link>
          <a
            href="https://www.16personalitylab.com/q_rating?gad_source=1&gad_campaignid=22527977737&gclid=CjwKCAiA_dDIBhB6EiwAvzc1cAjsMSfE9TgDjL9qaoZdQ8PLAb94DOy-ImtTngzycrMOvWHkYI2h3BoCzBgQAvD_BwE&uid=5d6ba237-0c97-430a-8bd5-503cb11e87b5&gbraid=0AAAAA97Cn6OrJNLJrP4Myd5rxbFqlvVkt&lang=KR&aid=29&qid=6"
            target="_blank"
            rel="noopener noreferrer"
            className="prjMenuItem"
          >
            <img src="/images/test.svg" alt="test" />
            <button className="prjMenuBtn redBtn">테스트 하기</button>
          </a>
        </div>
      </article>
    </div>
  );
}

export default Landing;

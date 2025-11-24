import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="townLanding">
            <article className="titleArea">
                <h1 className="prjTitle">
                    우리 회사가 <span className="fontRed">MBTI</span>{" "}
                    마을이라면?
                </h1>
                <div className="prjMenuGroup">
                    <Link to="/town" className="prjMenuItem">
                        <img src="/images/map.svg" alt="town" />
                        <button className="prjMenuBtn blueBtn">
                            마을 방문가기
                        </button>
                    </Link>
                    <Link to="/about" className="prjMenuItem">
                        <img src="/images/look.svg" alt="about" />
                        <button className="prjMenuBtn purpleBtn">
                            우리회사 분석
                        </button>
                    </Link>
                    <a
                        href="https://www.16personalities.com/ko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="prjMenuItem"
                    >
                        <img src="/images/test.svg" alt="test" />
                        <button className="prjMenuBtn redBtn">
                            테스트 하기
                        </button>
                    </a>
                </div>
            </article>
        </div>
    );
}

export default Landing;

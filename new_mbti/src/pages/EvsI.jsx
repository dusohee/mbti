import { Link } from "react-router-dom";
import { employees } from "../data/employees";
import Avatar from "../components/Avatar";

function EvsI() {
    // E 성향 MBTI 타입들
    const eTypes = ["entp", "enfj", "enfp", "entj", "estj", "estp"];
    // I 성향 MBTI 타입들
    const iTypes = [
        "infj",
        "infp",
        "intj",
        "intp",
        "isfj",
        "isfp",
        "istj",
        "istp",
    ];

    // E 성향 사람들 수집
    const ePersons = eTypes.flatMap(
        (type) => employees[type]?.map((person) => ({ ...person, type })) || []
    );

    // I 성향 사람들 수집
    const iPersons = iTypes.flatMap(
        (type) => employees[type]?.map((person) => ({ ...person, type })) || []
    );

    // ENTJ와 ESTP는 이미지 크기 조정
    const getCustomStyle = (type) => {
        if (type === "entj" || type === "estp") {
            return { width: "60px" };
        }
        return undefined;
    };

    return (
        <div className="EvsI-page">
            <div className="EvsI-wrap">
                {/* E 성향들 */}
                <section className="planet-e">
                    <div className="about-e">
                        우리는 사람들과 어울리고 대화 나누는 걸 즐겨요.
                    </div>
                    <article className="avatar-wrap">
                        {ePersons.map((person, index) => (
                            <Avatar
                                key={`${person.type}-${person.name}-${index}`}
                                name={person.name}
                                mbtiType={person.type}
                                customStyle={getCustomStyle(person.type)}
                            />
                        ))}
                    </article>
                </section>

                {/* I 성향들 */}
                <section className="planet-i">
                    <div className="about-i">
                        우리는 혼자만의 시간과 조용한 집중을 즐겨요.
                    </div>
                    <article
                        className="avatar-wrap"
                        style={{ marginRight: "10%" }}
                    >
                        {iPersons.map((person, index) => (
                            <Avatar
                                key={`${person.type}-${person.name}-${index}`}
                                name={person.name}
                                mbtiType={person.type}
                            />
                        ))}
                    </article>
                </section>
            </div>

            {/* 홈으로 돌아가기 버튼 */}
            <Link to="/">
                <img
                    src="/images/back-btn.svg"
                    alt="back"
                    className="home-btn"
                />
            </Link>
        </div>
    );
}

export default EvsI;

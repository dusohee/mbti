import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MBTIGroup from "../components/MBTIGroup";
import { employees } from "../data/employees";
import { fetchMBTIReactions } from "../api/mbtiApi";
import sampleQuestionsData from "../../sample_question.json";

function Town() {
    const [question, setQuestion] = useState("");
    const [mbtiMessages, setMbtiMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sampleQuestions, setSampleQuestions] = useState([]);
    const [isDefaultMessage, setIsDefaultMessage] = useState(true);
    const [highlightedMbti, setHighlightedMbti] = useState(null);

    const mbtiTypes = [
        "entp",
        "enfj",
        "enfp",
        "entj",
        "estj",
        "estp",
        // "esfp",
        // "esfj",
        "infj",
        "infp",
        "intj",
        "intp",
        "isfj",
        "isfp",
        "istj",
        "istp",
        "mola",
    ];

    // MBTI별 기본 메시지
    const defaultMessages = {
        istj: "조용하지만 책임감 강한 실무형",
        isfj: "배려 깊고 안정적으로 돕는 조력자",
        infj: "깊게 생각하고 의미를 찾는 통찰형",
        intj: "계획 세우고 효율을 추구하는 전략가",
        istp: "차분하게 문제를 해결하는 해결사",
        isfp: "감성적이고 자유로운 분위기 메이커",
        infp: "가치와 감정에 진심인 이상주의자",
        intp: "논리 탐구를 즐기는 아이디어 집요러",
        estp: "즉흥적이고 액션 빠른 현실 실전파",
        esfp: "사람 좋아하고 분위기 밝히는 엔터테이너",
        enfp: "열정적이고 아이디어 폭발하는 자유 영혼",
        entp: "재치 있고 토론 좋아하는 발명가·변론가",
        estj: "체계적이고 추진력 강한 관리자",
        esfj: "사람 잘 돌보고 분위기 챙기는 사회적 리더",
        enfj: "포용력 있고 사람을 이끄는 멘토형",
        entj: "목표 향해 몰아붙이는 리더·지휘관",
        mola: "아직 MBTI를 모르는 신비로운 존재",
    };

    // 페이지 로딩 시 기본 메시지 설정 및 랜덤 질문 선택
    useEffect(() => {
        const getRandomQuestions = (arr, count) => {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        const randomQuestions = getRandomQuestions(sampleQuestionsData.questions, 4);
        setSampleQuestions(randomQuestions);

        // 기본 메시지 설정
        setMbtiMessages(defaultMessages);

        // 랜덤으로 하나의 MBTI 선택하여 말풍선 표시
        const randomIndex = Math.floor(Math.random() * mbtiTypes.length);
        setHighlightedMbti(mbtiTypes[randomIndex]);
    }, []);

    // ENTJ와 ESTP는 특별한 이미지 스타일 필요
    const getCustomStyle = (type) => {
        if (type === "entj" || type === "estp") {
            return { width: "60px" };
        }
        return undefined;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            setError("질문을 입력해주세요");
            return;
        }

        setIsLoading(true);
        setError(null);
        setHighlightedMbti(null); // 검색 시 랜덤 말풍선 숨기기

        try {
            const reactions = await fetchMBTIReactions(question);
            setMbtiMessages(reactions);
            setIsDefaultMessage(false);
        } catch (err) {
            setError(
                "질문을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요."
            );
            console.error("API 호출 오류:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSampleQuestionClick = async (sampleQuestion) => {
        setQuestion(sampleQuestion);
        setIsLoading(true);
        setError(null);
        setHighlightedMbti(null); // 검색 시 랜덤 말풍선 숨기기

        try {
            const reactions = await fetchMBTIReactions(sampleQuestion);
            setMbtiMessages(reactions);
            setIsDefaultMessage(false);
        } catch (err) {
            setError(
                "질문을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요."
            );
            console.error("API 호출 오류:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="map-wrapper">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">MBTI별 반응을 분석하는 중...</p>
                </div>
            )}
            <div className="map-content">
                <section className="search-area">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="search"
                            placeholder="갑자기 금요일 오후 5시에 긴급 미팅 잡힘 MBTI별 반응 비교해줘"
                            className="searchBar"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isLoading}
                        />
                    </form>
                    <article className="if-area">
                        {sampleQuestions.map((q, index) => (
                            <div
                                key={index}
                                className="sample-question"
                                onClick={() => handleSampleQuestionClick(q)}
                                style={{ cursor: "pointer" }}
                            >
                                {q}
                            </div>
                        ))}
                    </article>
                    {error && (
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "20px",
                                color: "#ff4444",
                            }}
                        >
                            <p>{error}</p>
                        </div>
                    )}
                </section>

                {mbtiTypes.map((type) => (
                    <MBTIGroup
                        key={type}
                        mbtiType={type}
                        members={employees[type]}
                        message={mbtiMessages[type]}
                        customAvatarStyle={getCustomStyle(type)}
                        isDefault={isDefaultMessage}
                        isHighlighted={type === highlightedMbti}
                    />
                ))}

                <Link to="/">
                    <img
                        src="/images/back-btn.svg"
                        alt="back"
                        className="home-btn"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Town;

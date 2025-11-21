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

    const mbtiTypes = [
        "entp",
        "enfj",
        "enfp",
        "entj",
        "estj",
        "estp",
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

    // 페이지 로딩 시 랜덤 질문 선택
    useEffect(() => {
        const getRandomQuestions = (arr, count) => {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        const randomQuestions = getRandomQuestions(sampleQuestionsData.questions, 4);
        setSampleQuestions(randomQuestions);
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

        try {
            const reactions = await fetchMBTIReactions(question);
            setMbtiMessages(reactions);
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

        try {
            const reactions = await fetchMBTIReactions(sampleQuestion);
            setMbtiMessages(reactions);
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

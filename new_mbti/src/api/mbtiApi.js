const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5500";
const QUESTIONS_CACHE_KEY = "mbti_questions";
const QUESTIONS_TIMESTAMP_KEY = "mbti_questions_timestamp";
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3시간 (밀리초)

export async function fetchQuestions() {
    try {
        // localStorage에서 캐시된 데이터 확인
        const cachedQuestions = localStorage.getItem(QUESTIONS_CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(QUESTIONS_TIMESTAMP_KEY);

        // 캐시가 있고, 3시간이 지나지 않았으면 캐시 반환
        if (cachedQuestions && cachedTimestamp) {
            const now = Date.now();
            const timestamp = parseInt(cachedTimestamp, 10);

            if (now - timestamp < CACHE_DURATION) {
                return JSON.parse(cachedQuestions);
            }
        }

        // 캐시가 없거나 만료되었으면 API 호출
        const response = await fetch(`${API_BASE_URL}/mbti/questions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const questions = data.questions || data;

        // localStorage에 저장
        localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(questions));
        localStorage.setItem(QUESTIONS_TIMESTAMP_KEY, Date.now().toString());

        return questions;
    } catch (error) {
        console.error("질문 목록 API 호출 실패:", error);

        // API 호출 실패 시 캐시가 있으면 캐시 반환
        const cachedQuestions = localStorage.getItem(QUESTIONS_CACHE_KEY);
        if (cachedQuestions) {
            return JSON.parse(cachedQuestions);
        }

        throw error;
    }
}

export async function fetchMBTIReactions(question) {
    try {
        const response = await fetch(`${API_BASE_URL}/mbti/reactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // API 응답의 대문자 MBTI를 소문자로 변환
        const reactions = {};
        Object.keys(data.reactions).forEach((key) => {
            reactions[key.toLowerCase()] = data.reactions[key];
        });

        // 기본 메시지 추가 (mola 등)
        if (!reactions.mola) {
            reactions.mola = "내 MBTI가 뭔지 모르겠어요...";
        }

        return reactions;
    } catch (error) {
        console.error("API 호출 실패:", error);
        throw error;
    }
}

import { Link } from "react-router-dom";

function TeamMbti() {
    const teams = [
        "MGMT",
        "ADM",
        "CLOUD",
        "BIZ",
        "SO-Unit",
        "OPC",
        "backend",
        "PF",
        "MEDIA",
        "DL",
    ];

    return (
        <div className="team-page">
            <h1 className="pageTitle">팀 MBTI 구성</h1>
            <article className="team-content">
                {teams.map((team) => (
                    <section key={team} className="team-chart">
                        <img src={`/images/team/${team}.svg`} alt={team} />
                    </section>
                ))}
            </article>
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

export default TeamMbti;

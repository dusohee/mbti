import { Link } from 'react-router-dom';
import { companyMBTI } from '../data/employees';

function About() {
  const { type, description, stats } = companyMBTI;

  return (
    <div className="aboutPage">
      <article className="pageTitleGroup">
        <h1 className="pageTitle">
          우리 회사 <span className="fontOrange">MBTI</span> 는?
        </h1>
        <img src="/images/beeker.svg" alt="beeker" className="beeker" />
        <img src="/images/chemical.svg" alt="chemical" className="chemical" />
      </article>

      <article className="showResult">
        <section className="showCharac">
          <img
            src={`/charac/${type.toLowerCase()}.svg`}
            alt="charac"
            className="characLarge"
          />
          <h3 style={{ letterSpacing: '10px' }}>{type}</h3>
        </section>
        <section className="aboutCharac">
          <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
        </section>
      </article>

      <article className="resultDetail">
        <section className="barChart">
          <div className="label">E</div>
          <span className="mbtiChart">
            <div className="bar org">
              <p className="per">{stats.EI.E}%</p>
            </div>
            <div className="bar gre">
              <p className="per">{stats.EI.I}%</p>
            </div>
          </span>
          <div className="label">I</div>
        </section>

        <section className="barChart">
          <div className="label">N</div>
          <span className="mbtiChart">
            <div className="bar blu">
              <p className="per">{stats.NS.N}%</p>
            </div>
            <div className="bar pur">
              <p className="per">{stats.NS.S}%</p>
            </div>
          </span>
          <div className="label">S</div>
        </section>

        <section className="barChart">
          <div className="label">T</div>
          <span className="mbtiChart">
            <div className="bar yel">
              <p className="per">{stats.TF.T}%</p>
            </div>
            <div className="bar gre">
              <p className="per">{stats.TF.F}%</p>
            </div>
          </span>
          <div className="label">F</div>
        </section>

        <section className="barChart">
          <div className="label">P</div>
          <span className="mbtiChart">
            <div className="bar blu">
              <p className="per">{stats.PJ.P}%</p>
            </div>
            <div className="bar org">
              <p className="per">{stats.PJ.J}%</p>
            </div>
          </span>
          <div className="label">J</div>
        </section>
      </article>

      <Link to="/">
        <img src="/images/back-btn.svg" alt="back" className="home-btn" />
      </Link>
    </div>
  );
}

export default About;

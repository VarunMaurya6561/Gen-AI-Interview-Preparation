import { useRef, useState } from "react";
import { useInterview } from "../hook/use.interview";
import "./home.scss";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();

  const { loading, generateReport, reports } = useInterview();

  const [jobDescription, setjobDescription] = useState("");
  const [selfDescription, setselfDescription] = useState("");
  const resumeInputRef = useRef();

  const context = useContext(AuthContext)
  const {user } = context
  
  const { handleLogout } = useAuth()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main>
        <h1>Generating......</h1>
      </main>
    );
  }

  const logoutFunc = async() => {
        await handleLogout()
        
    }

  return (
    <main className="main">

      <div className="home">

        <div className="interview-input">

          <div className="left">
            <p>Job Description</p>
            <textarea
              onChange={(e) => {
                setjobDescription(e.target.value);
              }}
              name="jobDescription"
              id="jobDescription"
              placeholder="Enter your Job Description"
            ></textarea>
          </div>

          <div className="right">
            <p>
              Resume <span>( Supports only PDF )</span>
            </p>
            <div className="input-group">
              <label className="upload" htmlFor="resume">
                Upload Resume
              </label>
              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                name="resume"
                hidden
                accept=".pdf"
              />
            </div>
            <div className="input-group">
              <p>Self Description</p>
              <textarea
                onChange={(e) => {
                  setselfDescription(e.target.value);
                }}
                name="selfDescripiton"
                id="selfDescripiton"
                placeholder="Enter Self Descripiton"
              ></textarea>
            </div>

            <button
              onClick={handleGenerateReport}
              className="button primary-button"
            >
              Generate Interview Report
            </button>
          </div>

        </div>
      </div>

      <div className="reports">
            <div className="header">
                <div className="heading">
                    <h1>Recent Reports</h1>
                </div>
                
                <div className="user-det">
                        <div className="user-name">
                            <p>{user}</p>
                        </div>
                        <div className="user-signout">
                            <p onClick={logoutFunc}>Sign Out</p>
                        </div>
                </div>
            </div>


        <div className="reports-div">
          {reports.map((i) => {
            return (
              <div
                key={i._id}
                className="div"
                onClick={() => navigate(`/interview/${i._id}`)}
              >
                <p>Title: {i.title}</p>
                <p>Match Score: {i.matchScore}</p>
              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
};

export default Home;

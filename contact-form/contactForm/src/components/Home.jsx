import { useContext, useEffect } from "react";
import FormContext from "../FormContext";
import { useNavigate } from "react-router-dom";
import HistoryCard from "./HistoryCard";
import Mail from "./Mail";
import Logo from "./logo/contact-logo.svg"

export default function Home() {
  const { user, fetchMails, mailDetails, Logout } = useContext(FormContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  

  useEffect(() => {
    if (user) {
      fetchMails();
    }
  }, [user]);
  return (
    <>
      <div>
        <div>
          <div className="nav">
            <h1
              className="m-3"
              style={{ fontFamily: "Rubik Lines", fontSize: "xx-large" }}
            >
              <img src={Logo} width={50} /> CONTACT LINK
            </h1>
          </div>
          <div>
            <button
              onClick={Logout}
              className="btn btn-warning"
              style={{ float: "right" }}
            >
             <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>
        </div>
        <h3 className="mx-5" style={{fontFamily:"Crushed" ,fontSize:"xx-large"}}>MAILS SENT BY YOU</h3>
        <div className="history-box">
          <div className="history-header">
            <div className="row ">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 ">
                Date & Time
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 ">
                Receiver
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 ">
                Subject & Message
              </div>
            </div>
          </div>
        </div>
        {mailDetails.map((item, index) => (
          <HistoryCard
            key={index}
            createdAt={item.createdAt}
            receiver={item.receiver}
            message={item.message}
            subject={item.subject}
          />
        ))}
      </div>
      <div className="compose-mail ">
        <button
          className="btn btn-primary btn-compose"
          data-bs-toggle="modal"
          data-bs-target="#sendMailModal"
        >
          Compose <i className="fa fa-plus"></i>
        </button>
      </div>
      <Mail />
    </>
  );
}

import { useContext, useState } from "react";
import FormContext from "../FormContext";

export default function Mail() {
  const { sendMail } = useContext(FormContext);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
      <div
        className="modal fade"
        id="sendMailModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="sendMailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sendMailModalLabel">
                <h1 className="text-start">Send Mail</h1>
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className=" " style={{ width: "100%" }}>
                <div>
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control mt-3"
                        placeholder="Email To"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        value={email}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Subject"
                        onChange={(e) => setSubject(e.currentTarget.value)}
                        value={subject}
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        className="form-control mt-3"
                        placeholder="Message"
                        rows={4}
                        defaultValue={""}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        value={message}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        style={{ width: "100%" }}
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          sendMail(email, subject, message);
                          setEmail("")
                          setSubject("")
                          setMessage("")
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

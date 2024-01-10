
export default function HistoryCard({ receiver, message, createdAt ,subject}) {
  return (
    <div>
      <div className="history-box">
        <div className="history-card" >
          <div className="row ">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 "><i className="fa fa-clock-o" aria-hidden="true"></i> : {createdAt}</div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 "><i className="fa fa-arrow-down"></i> : {receiver}</div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-4 message-box"><div><i className="fa fa-book" aria-hidden="true"></i>: {subject}</div><i className="fa fa-envelope" aria-hidden="true"></i> : {message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

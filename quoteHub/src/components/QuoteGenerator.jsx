import { useState } from "react";
import { useEffect } from "react";
import Logo from "../Images/logo.svg";

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState([]);
  const [quotesAuthor, setQuotesAuthor] = useState([]);
  const fetchQuotes = () => {
    fetch(`https://api.quotable.io/quotes/random?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setQuotesAuthor(data.map((item) => item.author));
          setQuotes(data.map((item) => item.content));
        }
      })
      .catch((err) => {
        setQuotes(err + "Cannot Fetch Quotes");
      });
  };
  useEffect(() => {
    fetchQuotes();
  }, []);
  return (
    <div>
      {/* section nav start */}
      <div className="text-center nav-head ">
        <div className="d-flex pt-2">
          <div>
            <img width={150} src={Logo} />
          </div>
          <div>
            <h3 style={{ fontFamily: "Girassol" }}>QUOTE HUB</h3>
            <p style={{ fontFamily: "Merienda", fontSize: "small" }}>
              A Hub For Random Quotes
            </p>
          </div>
        </div>
      </div>
      {/* section nav ends */}

      <div className="text-center mt-5">
        <button className="btn border border-dark" onClick={fetchQuotes}>
          Generate Quotes
        </button>
      </div>
      {/* Quotes content start */}
      <div className="justify-content-between align-items-center px-2 m-2 row ">
        {quotes.map((quote, index) => (
          <div key={index} className="col col-12 col-lg-4 col-sm-4">
            <div className="quote-box ">
              <h3>
                <span style={{fontFamily:"Rationale"}}><b>Author : </b></span>
                <span style={{ fontFamily: "Rajdhani" }}>
                  <u>{quotesAuthor[index]}</u>
                </span>
              </h3>
              <p style={{ fontFamily: "Merienda", fontSize: "x-large" }}>
                <i className="fa fa-quote-left " aria-hidden="true"> </i>  
                  {quote}  
                <i className="fa fa-quote-right" aria-hidden="true"> </i>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Quotes content ends */}
    </div>
  );
}

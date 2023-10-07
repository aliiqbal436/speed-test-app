import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loading.css';

const socket = io("http://144.202.14.21:3007");

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const runSpeedTest = async () => {
    setLoading(true);
    socket.emit("runTest");
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    runSpeedTest();
    // Listen for incoming messages from the server
    socket.on("testResult", (message) => {
      setHtmlContent(message);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {loading && (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <p>Loading...</p>
        </div>
      )}
      {/* {htmlContent ? (
       
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Button className="btn btn-primary" onClick={runSpeedTest}>
            {loading ? (
              <>
                <span className="sr-only">
                  Please wait for the test result{" "}
                </span>
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </>
            ) : (
              "Run Speed Test"
            )}
          </Button>
        </div>
      )} */}
    </div>
  );
}

export default App;

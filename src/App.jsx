import { useState, useEffect } from "react";
import "./App.css";
import ImageAnalysis from "./ImageAnalysis";
import ImageComparison from "./ImageComparison";

function App() {
  const [currentComp, setCurrentComp] = useState("analysis");
  const imgAnalysisComp = <ImageAnalysis />;
  const imgCompareComp = <ImageComparison />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: "5vh",
        }}
      >
        <button
          className="nav_button"
          onClick={() => {
            setCurrentComp("analysis");
          }}
        >
          Image analysis
        </button>
        <button
          className="nav_button"
          onClick={() => {
            setCurrentComp("compare");
          }}
        >
          Compare images
        </button>
      </div>
      <div className="page">
        <h1>Facial Analysis App</h1>
        {currentComp == "analysis" && imgAnalysisComp}
        {currentComp == "compare" && imgCompareComp}
      </div>
    </div>
  );
}

export default App;

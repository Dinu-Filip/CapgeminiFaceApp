import React, { useState, useEffect } from "react";
import AttributeLabel from "./attributeLabel";
import axios from "axios";

function ImageAnalysis() {
  const [imgRef, setImgRef] = useState("");
  const [img, setImg] = useState(null);
  const [labels, setLabels] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    if (img) {
      setLoading(true);
      let res = await axios
        .post(
          `http://127.0.0.1:5000/`,
          { file: img },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((err) => console.log(err));
      res = res.data;
      console.log(res);
      const newLabels = [];
      newLabels.push(
        <AttributeLabel
          attributeName="Age range"
          attributeValue={res.AgeRange.Low + " - " + res.AgeRange.High}
        />
      );
      newLabels.push(
        <AttributeLabel
          attributeName="Gender"
          attributeValue={res.Gender.Value}
          attributeError={res.Gender.Confidence}
        />
      );
      newLabels.push(
        <AttributeLabel
          attributeName="Smile"
          attributeValue={res.Smile.Value === true ? "Yes" : "No"}
          attributeError={res.Smile.Confidence}
        />
      );
      newLabels.push(
        <AttributeLabel
          attributeName="Eyeglasses"
          attributeValue={res.Eyeglasses.Value === true ? "Yes" : "No"}
          attributeError={res.Eyeglasses.Confidence}
        />
      );
      let maxEmotionName = "";
      let maxEmotionConfidence = 0;
      for (let emotion of res.Emotions) {
        if (emotion.Confidence > maxEmotionConfidence) {
          maxEmotionConfidence = emotion.Confidence;
          maxEmotionName = emotion.Type;
        }
      }
      newLabels.push(
        <AttributeLabel
          attributeName="Emotion"
          attributeValue={maxEmotionName}
          attributeError={maxEmotionConfidence}
        />
      );
      console.log(newLabels);
      setLabels(newLabels);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    console.log("good");
  }, [labels]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div>
      <h3>
        Upload an image and click the submit button to generate the analysis
      </h3>
      <div
        className="row"
        style={{ marginTop: "20px", justifyContent: "center" }}
      >
        <div className="col-lg-6">
          {imgRef != "" && (
            <img
              src={imgRef}
              alt="photo for analysis"
              className="row"
              style={{ width: "60%", marginLeft: "20%" }}
            ></img>
          )}
          <form
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <input
              type="file"
              accept=".jpg,.png"
              className="row"
              onChange={(e) => {
                console.log(URL.createObjectURL(e.target.files[0]));
                setImgRef(URL.createObjectURL(e.target.files[0]));
                setImg(e.target.files[0]);
              }}
            />
          </form>
          <button
            className="btn btn-outline-secondary row"
            style={{ marginTop: "20px", width: "60%" }}
            onClick={generateAnalysis}
          >
            Submit
          </button>
        </div>
        <div className="col-lg-6">
          {loading && (
            <div className="spinner-border text-secondary" role="status"></div>
          )}
          {labels && !loading && (
            <span>
              <div className="labelRow">
                {labels[0]}
                {labels[1]}
              </div>
              <div className="labelRow">
                {labels[2]}
                {labels[3]}
              </div>
              <div className="labelRow">{labels[4]}</div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageAnalysis;

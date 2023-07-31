import React, { useEffect, useState } from "react";
import axios from "axios";
import AttributeLabel from "./attributeLabel";

function ImageComparison() {
  const [img1Ref, setImg1Ref] = useState("");
  const [img1, setImg1] = useState();
  const [img2Ref, setImg2Ref] = useState("");
  const [img2, setImg2] = useState();
  const [labels, setLabels] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    setLoading(true);
    let res = await axios
      .post(
        `http://127.0.0.1:5000/compareface`,
        { img_1: img1, img_2: img2 },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    res = res.data;
    console.log(res);
    const similarity = res[0].Similarity;
    console.log(similarity);
    let msg = "";
    if (0 <= similarity && similarity < 40) {
      msg =
        "The two faces are not similar at all; two different people are shown";
    } else if (40 <= similarity && similarity < 65) {
      msg = "The two faces are somewhat similar; these may be the same person";
    } else {
      msg = "The two faces are very similar; the same person is shown";
    }
    setLabels(
      <AttributeLabel
        attributeName={"Similarity"}
        attributeValue={msg}
        attributeError={similarity}
      />
    );
    setLoading(false);
  };

  return (
    <>
      <h3>Upload two images to compare the people in them</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div className="col-md-6">
          {img1Ref != "" && (
            <img
              src={img1Ref}
              alt="first image"
              className="row"
              style={{ width: "60%", marginLeft: "20%" }}
            />
          )}
          <form
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <input
              type="file"
              accept=".jpg,.png"
              width="100%"
              onChange={(e) => {
                console.log(URL.createObjectURL(e.target.files[0]));
                setImg1Ref(URL.createObjectURL(e.target.files[0]));
                setImg1(e.target.files[0]);
              }}
            />
          </form>
        </div>
        <div className="col-md-6">
          {img2Ref != "" && (
            <img
              src={img2Ref}
              alt="second image"
              className="row"
              style={{ width: "60%", marginLeft: "20%" }}
            />
          )}
          <form
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <input
              type="file"
              accept=".jpg,.png"
              width="100%"
              onChange={(e) => {
                setImg2Ref(URL.createObjectURL(e.target.files[0]));
                setImg2(e.target.files[0]);
              }}
            />
          </form>
        </div>
      </div>
      <button
        className="btn btn-outline-secondary row"
        style={{ marginTop: "30px", width: "50%", minWidth: "200px" }}
        onClick={generateAnalysis}
      >
        Submit
      </button>
      <div className="row">
        {loading && (
          <div className="spinner-border text-secondary" role="status"></div>
        )}
      </div>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        {labels}
      </div>
    </>
  );
}

export default ImageComparison;

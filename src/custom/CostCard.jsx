import React from "react";

export default function CostCard() {
  return (
    <>
      <div class="card" style={{ width: "80%", width: "300px" }}>
        <img
          class="card-img-top"
          src={"http://127.0.0.1:3012/img?id=" + parseInt(27)}
          alt="Card image cap"
        ></img>
      </div>
      <div
        class="card"
        style={{
          marginLeft: "20px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "400px",
        }}
      >
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h3>المعلومات الاساسية </h3>
          </li>
          <li class="list-group-item">{"kkk"}</li>
          <li class="list-group-item">{"ddd"}</li>
          <li class="list-group-item">{"ff"}</li>

          <li class="list-group-item"></li>
        </ul>
      </div>
    </>
  );
}

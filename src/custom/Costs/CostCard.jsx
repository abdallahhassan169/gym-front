import React from "react";
import axios from "axios";
import { backEnd } from "../../default";
export default function CostCard({ bill }) {
  const [dataCard, setDataCard] = React.useState([]);
  console.log(dataCard);
  React.useEffect(() => {
    axios
      .get(backEnd + "/cost_data?id=" + parseInt(bill))
      .then((res) => setDataCard(res.data[0]));
  }, [bill]);
  return (
    <>
      <div class="card" style={{ width: "350px" }}>
        <img
          class="card-img-top"
          src={"http://127.0.0.1:3012/bills?id=" + parseInt(bill)}
          alt="Card image cap"
        ></img>
      </div>
      <div
        class="card"
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "350px",
        }}
      >
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h3>الوصف و السعر </h3>
          </li>
          <li class="list-group-item">{dataCard?.description}</li>
          <li class="list-group-item">{dataCard?.cost}</li>

          <li class="list-group-item"></li>
        </ul>
      </div>
    </>
  );
}

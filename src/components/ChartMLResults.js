import axios from "axios";
import { useState } from "react";

const getImageURL = async () => {
  const response = await axios({
    method: "get",
    url: 'http://localhost:8000/api/get_image',
    responseType: 'blob'
  });
  return URL.createObjectURL(response.data)
}

const ChartMLResults = () => {

  const [imgSrc, setImgSrc] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    getImageURL().then(res => setImgSrc(res));
  }

  return (
    <section>
      <div className="container border mt-3">
        <h2>Results</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={handleClick}>get</button>
        </div>
        <div className="row my-3">
          <div className="col-md-6 text-start">
            <h4 className="text-primary">Input(s) Dist.</h4>
            <img src={imgSrc} alt="results" className="img-fluid" />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-primary">Output Dist.</h4>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ChartMLResults;

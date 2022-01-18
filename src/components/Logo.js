// import Image from "react-bootstrap/Image";
const image_src = require("../images/shap_logo.png");

const Logo = () => {
  return (
    <section className="d-flex flex-row justify-content-center mt-4">
      <img src={image_src} alt="shap logo" height="250px" />
    </section>
  );
};

export default Logo;

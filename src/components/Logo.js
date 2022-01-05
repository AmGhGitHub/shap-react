import Image from "react-bootstrap/Image";
const image_src = require("../images/shap.png");

const Logo = () => {
  return (
    <Image
      src={image_src}
      alt="logo"
      height="150px"
      className="rounded mx-auto d-block my-3"
    />
  );
};

export default Logo;

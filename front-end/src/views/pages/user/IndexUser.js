import React from "react";
import { Container } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function IndexUser() {
  const handleImageClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container className="py-5 cre">
      <Carousel>
        <div onClick={() => handleImageClick("http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/tiep-tuc-chan-chinh-hoat-dong-dang-kiem-xe-co-gioi-som-giai-quyet-un-tac-10540.html")}>
          <img
            className="d-block w-100"
            src="http://www.vr.org.vn/PublishingImages/IMG_0608.jpg?RenditionID=10"
            alt="First slide"
          />
        </div>
        <div onClick={() => handleImageClick("http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/giot-mau-dao---trao-hy-vong-10539.html")}>
          <img
            className="d-block w-100"
            src="http://www.vr.org.vn/PublishingImages/0R3A1418.JPG?RenditionID=10"
            alt="Second slide"
          />
        </div>
        <div onClick={() => handleImageClick("http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/tiep-nhan-kiem-dinh-vien-quan-su-tang-cuong-cho-cac-trung-tam-dang-kiem-10537.html")}>
          <img
            className="d-block w-100"
            src="http://www.vr.org.vn/PublishingImages/0R3A1265.JPG?RenditionID=10"
            alt="Third slide"
          />
        </div>
      </Carousel>
    </Container>
  );
}

export default IndexUser;

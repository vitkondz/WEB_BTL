import React from "react";
import { Container, CardLink, Carousel, CarouselItem, CarouselIndicators } from "reactstrap";
import "./IndexUser.css";

const items = [
  {
    title: "Tiếp tục chấn chỉnh hoạt động đăng kiểm xe cơ giới, sớm giải quyết ùn tắc",
    description: "Cục Đăng kiểm Việt Nam (ĐKVN) vừa có văn bản số 1379/ĐKVN-VAR về việc chấn chỉnh trong hoạt động kiểm định xe cơ giới.",
    url: "http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/tiep-tuc-chan-chinh-hoat-dong-dang-kiem-xe-co-gioi-som-giai-quyet-un-tac-10540.html",
    urlToImage: "http://www.vr.org.vn/PublishingImages/IMG_0608.jpg?RenditionID=10"
  },
  {
    title: "Giọt máu đào - Trao hy vọng",
    description: "Đoàn TNCS HCM Cục Đăng kiểm Việt Nam vừa tổ chức Chương trình hiến máu tình nguyện với thông điệp: Giọt máu đào - Trao hy vọng",
    url: "http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/giot-mau-dao---trao-hy-vong-10539.html",
    urlToImage: "http://www.vr.org.vn/PublishingImages/0R3A1418.JPG?RenditionID=10"
  },
  {
    title: "Tiếp nhận kiểm định viên quân sự tăng cường cho các trung tâm đăng kiểm",
    description: "Chiều 18/3, Cục Đăng kiểm VN (Bộ GTVT) và Tổng cục kỹ thuật (Bộ Quốc phòng) đã phối hợp tổ chức Lễ xuất quân kiểm định viên quân sự tham gia hỗ trợ kiểm định xe cơ giới dân sự theo chỉ đạo của Chính phủ.",
    url: "http://www.vr.org.vn/vn/tin-tuc-su-kien/tin-tuc-chung/tiep-nhan-kiem-dinh-vien-quan-su-tang-cuong-cho-cac-trung-tam-dang-kiem-10537.html",
    urlToImage: "http://www.vr.org.vn/PublishingImages/0R3A1265.JPG?RenditionID=10"
  }
];

function IndexUser() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Container>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              onExiting={onExiting}
              onExited={onExited}
            >
              <CardLink href={item.url} target="_blank">
                <img src={item.urlToImage} alt={item.description} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.title}</h5>
                </div>
              </CardLink>
            </CarouselItem>
          ))}
          <a
            className="carousel-control-prev"
            data-slide="prev"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              previous();
            }}
            role="button"
          >
            <i className="now-ui-icons arrows-1_minimal-left"></i>
          </a>
          <a
            className="carousel-control-next"
            data-slide="next"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            role="button"
          >
            <i className="now-ui-icons arrows-1_minimal-right"></i>
          </a>
        </Carousel>
      </Container>
    </>
  );
}

export default IndexUser;

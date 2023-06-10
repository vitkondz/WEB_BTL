import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function MainHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
        style={{
          height: "1500px",
          maxHeight: "1000px"
        }}
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg_cdc2.jpeg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="">
            <img alt="..." src={require("assets/img/Logo_cdc2.png")} className={"rounded-circle"} width={"150px"}></img>
          </div>
          <h4 className="title">Cục đăng kiểm Việt Nam</h4>

        </Container>
      </div>
    </>
  );
}

export default MainHeader;

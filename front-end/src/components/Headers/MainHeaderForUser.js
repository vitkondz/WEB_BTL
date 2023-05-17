import React from "react";
import Cookies from 'js-cookie';


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
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg_cdc2.jpeg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="">
            <img alt="..." src={require("assets/img/Logo_cdc2.png")} className={"rounded-circle"} width={"150px"}></img>
          </div>
          <h4 className="title">{JSON.parse(Cookies.get('info')).center_name}</h4>

        </Container>
      </div>
    </>
  );
}

export default MainHeader;

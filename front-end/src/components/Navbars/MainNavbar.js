import React from "react";

// core components
import TopMainNavbar from "./TopMainNavbar";
import MainHeader from "components/Headers/MainHeader";

function MainNavbar() {
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <TopMainNavbar />
      <MainHeader />
    </>
  );
}

export default MainNavbar;

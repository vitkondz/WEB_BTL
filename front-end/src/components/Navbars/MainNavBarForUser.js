import React from "react";

// core components
import TopMainNavbarForUser from "./TopMainNavbarForUser";
import MainHeaderForUser from "components/Headers/MainHeaderForUser";

function MainNavBarForUser() {
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
      <TopMainNavbarForUser />
      <MainHeaderForUser />
    </>
  );
}

export default MainNavBarForUser;

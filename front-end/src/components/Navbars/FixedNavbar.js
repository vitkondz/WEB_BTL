import React from "react";
// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    Container,
    UncontrolledTooltip,
} from "reactstrap";
import NavLinkContext from "./NavLinkContext";

function FixedNavbar() {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
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
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top "} color="info" expand="lg">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            // href=""
                            target="_blank"
                            id="navbar-brand"
                        >
                            VietNam Register
                        </NavbarBrand>
                        <UncontrolledTooltip target="#navbar-brand">
                            Cục đăng kiểm Việt Nam
                        </UncontrolledTooltip>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <NavLinkContext />
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default FixedNavbar;

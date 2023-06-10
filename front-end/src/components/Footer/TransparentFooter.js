/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import Clock from "./Clock";

function TransparentFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <b>Trụ sở chính:</b>  18 Đường Phạm Hùng, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội <br />
          <b>Điện thoại:</b> +84.24.37684714 - 37684715 <br />
          <b>Fax:</b> +84.24.37684779 <br />
          <b>Email:</b> vr-id@vr.org.vn <br />
          <b>Website: ​</b> http://www.vr.org.vn
        </nav>
        <div className="copyright" id="copyright">
          <Clock/>
          Copyright © {new Date().getFullYear()} {" "}
          <a
            href="https://github.com/vitkondz/WEB_BTL"
            target="_blank"
          >
            My Team
          </a>
          .
          
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;

import React from "react";
import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
function Registry() {
  return (
    <>
      <FixedNavbarUser />
      <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <div>
          <p>
            Nhập biển xe để tìm xe (các thông tin khác tự hiện vào ô) <br />
            Button: Đăng kiểm cho xe (cập nhật vào registration info) - form đăng kiểm <br />
            <br />
            Xuất giấy chứng nhận đăng kiểm
          </p>


        </div>
      </div>
    </>
  )
}

export default Registry;
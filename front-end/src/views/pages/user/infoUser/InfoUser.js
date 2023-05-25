import React from 'react'
import Cookies from 'js-cookie'
import FixedNavbarUser from 'components/Navbars/FixedNavbarUser'

function InfoUser() {
  return (
    <div>
      <FixedNavbarUser />
      <div className="spaceHeader"></div>
      <div>
        <h1>{JSON.parse(Cookies.get('info')).center_name}</h1>
        <p>Thông tin của trung tâm. Button Edit thông tin, đổi mật khẩu</p>
      </div>
    </div>
  )
}

export default InfoUser
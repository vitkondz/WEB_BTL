async function getAreaByProvince(provinceName) {
    const northernProvinces = ['Bắc Giang', 'Bắc Kạn', 'Cao Bằng', 'Điện Biên', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hòa Bình', 'Hưng Yên', 'Lai Châu', 'Lào Cai', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Phú Thọ', 'Quảng Bình', 'Quảng Ninh', 'Sơn La', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Tuyên Quang', 'Vĩnh Phúc', 'Yên Bái'];
    const centralProvinces = ['Bình Định', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Gia Lai', 'Hà Tĩnh', 'Khánh Hòa', 'Kon Tum', 'Nghệ An', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Trị', 'Thừa Thiên Huế'];
    const southernProvinces = ['An Giang', 'Bà Rịa - Vũng Tàu', 'Bạc Liêu', 'Bến Tre', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Đồng Nai', 'Đồng Tháp', 'Hậu Giang', 'Kiên Giang', 'Lâm Đồng', 'Long An', 'Sóc Trăng', 'Tây Ninh', 'Tiền Giang', 'TP. Hồ Chí Minh', 'Trà Vinh', 'Vĩnh Long', 'Vĩnh Phúc'];

    if (northernProvinces.includes(provinceName)) {
        return 'miền Bắc';
    } else if (centralProvinces.includes(provinceName)) {
        return 'miền Trung';
    } else if (southernProvinces.includes(provinceName)) {
        return 'miền Nam';
    } else {
        return 'Không xác định';
    }
}

module.exports = getAreaByProvince;
function addMonthsToDate(inputDate, numberOfMonths) {
    var dateParts = inputDate.split("/");

    // Kiểm tra xem inputDate có hợp lệ hay không
    if (dateParts.length !== 3) {
        return "Ngày không hợp lệ";
    }

    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Giảm đi 1 vì tháng trong đối tượng Date bắt đầu từ 0
    var year = parseInt(dateParts[2], 10);

    // Kiểm tra xem day, month, year có hợp lệ hay không
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return "Ngày không hợp lệ";
    }

    var date = new Date(year, month, day);

    // Thêm số tháng vào ngày
    date.setMonth(date.getMonth() + numberOfMonths);


    // Định dạng lại ngày, tháng, năm thành chuỗi với định dạng dd/mm/yyyy
    var formattedDate = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();

    // Trả về ngày sau khi thêm số tháng
    return formattedDate;
}

function formatDate(dateString) {
    var date = new Date(dateString);

    // Kiểm tra xem dateString có hợp lệ hay không
    if (isNaN(date.getTime())) {
        return "Ngày không hợp lệ";
    }

    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng trong đối tượng Date bắt đầu từ 0
    var year = date.getFullYear();

    // Định dạng lại ngày, tháng, năm thành chuỗi với định dạng dd/mm/yyyy
    var formattedDate = ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;

    return formattedDate;
}
function isDateBeforeToday(inputDate) {
    // Tạo đối tượng Date cho ngày hiện tại
    var today = new Date();

    // Tách ngày, tháng và năm từ ngày nhập vào
    var parts = inputDate.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Lưu ý: tháng trong đối tượng Date bắt đầu từ 0
    var year = parseInt(parts[2], 10);

    // Tạo đối tượng Date cho ngày nhập vào
    var inputDateObj = new Date(year, month, day);

    // So sánh ngày nhập vào với ngày hiện tại
    if (inputDateObj < today) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    addMonthsToDate: addMonthsToDate,
    formatDate: formatDate,
    isDateBeforeToday: isDateBeforeToday
}

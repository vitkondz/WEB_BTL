// Ham tra ve danh sach cac trung tam, tinh thanh, khu vuc
async function areaFilter(center_information) {
    let area_info = [];
    let centerId_info = [];
    let province_info = [];
    let areaVisits = [];
    for (let i = 0; i < center_information.length; i++) {
        if (center_information[i].center_id != 'VN0000') {
            if (!areaVisits[center_information[i].center_id]) {
                centerId_info.push({label: center_information[i].center_id});
                areaVisits[center_information[i].center_id] = true;
            }
    
            if (!areaVisits[center_information[i].area]) {
                area_info.push({label: center_information[i].area});
                areaVisits[center_information[i].area] = true;
            }
    
            if (!areaVisits[center_information[i].province]) {
                province_info.push({label: center_information[i].province});
                areaVisits[center_information[i].province] = true;
            }
        }
    }

    return ({centers: centerId_info, areas: area_info, provinces: province_info});
}

module.exports = areaFilter;
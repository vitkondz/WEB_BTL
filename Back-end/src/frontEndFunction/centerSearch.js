// Ham tim trung tam theo ma trung tam
async function centerSearch(centers, center_id) {
    let left = 0;
    let right = centers.length -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (centers[mid].center_id === center_id) {
            return centers[mid];
        } else {
            if (centers[mid].center_id < center_id) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
       
    }
    return {province: -1, area: -1};
}

module.exports = centerSearch;
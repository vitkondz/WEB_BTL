// Ham tim xe o to theo ma dang ky bien so xe
async function ownerSearch(owners, registration_number) {
    let left = 0;
    let right = owners.length -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (owners[mid].registration_number === registration_number) {
            return owners[mid];
        } else {
            if (owners[mid].registration_number < registration_number) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return {registration_number: registration_number, owner: "unknown"};
}

module.exports = ownerSearch;
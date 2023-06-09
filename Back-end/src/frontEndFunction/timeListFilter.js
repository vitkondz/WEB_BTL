let centerSearch = require('./centerSearch')

async function getQuarter(month) {
    if (month >= 1 && month <= 3) {
      return 1;
    } else if (month >= 4 && month <= 6) {
      return 2;
    } else if (month >= 7 && month <= 9) {
      return 3;
    } else if (month >= 10 && month <= 12) {
      return 4;
    } else {
      return "Invalid month number. Month number should be between 1 and 12.";
    }
}

// Ham loc thong tin dang kiem theo ngay dang kiem va khu vuc
async function timeListFilter(registration_information, center_information, year, quarter, month, center_id, province, area) {
    let registrations = await registration_information.slice();
    let centers = await center_information.slice();

    if (center_id !== false) {
        for (let i = 0; i < registrations.length; i++) {
            if (registrations[i].center_id !== center_id) {
                registrations.splice(i, 1);
                i--;
            }
        }
    } else if (province !== false) {
        for (let i = 0; i < registrations.length; i++) {
            let center = await centerSearch(centers, registrations[i].center_id);
            if (center.province !== province) {
                registrations.splice(i, 1);
                i--;
            }
        }
    } else if (area !== false) {
        for (let i = 0; i < registrations.length; i++) {
            let center = await centerSearch(centers, registrations[i].center_id);
            if (center.area !== area) {
                registrations.splice(i, 1);
                i--;
            }
        }
    }
    
    if (year !== false) {
        for (let i = 0; i < registrations.length; i++) {
            let m = parseInt(registrations[i].date_issued.slice(3, 5));
            let y = parseInt(registrations[i].date_issued.slice(6, 10));

            if (y !== year) {
                registrations.splice(i, 1);
                i--;
            }
            else {
                let deleted = false;
                if (quarter !== false) {
                    let q = await getQuarter(m);
                    if (q !== quarter) {
                        registrations.splice(i, 1);
                        i--;
                        deleted = true;
                    }
                }
                if (!deleted && month !== false) {
                    if (m !== month) {
                        registrations.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    } 
    
    // Ket qua tra ve la mang cac thong tin dang kiem da duoc loc
    return registrations;
}

module.exports = timeListFilter;
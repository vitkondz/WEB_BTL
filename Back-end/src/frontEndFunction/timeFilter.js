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

// Ham loc thong tin dang kiem theo ngay dang kiem
async function timeFilter(registration_information, center_information, year, quarter, center_id, province, area) {
    let dem = [];
    let kq = [];
    let dates_issued = [];
    let timeline = [];
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

    for (let i = 0; i < registrations.length; i++) {
        let day = registrations[i].date_issued.slice(0, 2);
        let month = registrations[i].date_issued.slice(3, 5);
        let year = registrations[i].date_issued.slice(6, 10);

        dates_issued.push(new Date(year, parseInt(month) - 1, day));
    }
    dates_issued.sort(
        function(a, b) {
            return a.getTime() - b.getTime();
        }
    );
    
    if (year === true) {
        let years_visited = [];
        for (let i = 0; i < dates_issued.length; i++) {
            let y = dates_issued[i].getFullYear();
            if (years_visited[y] === undefined) {
                years_visited[y] = true;
                dem[y] = 1;   
                timeline.push(y);
            } else {
                dem[y]++;
            }
        }

        for (let i = 0; i < timeline.length; i++) {
            kq.push({year: timeline[i], quantity: dem[timeline[i]]});
        }
    } else if (quarter === true) {
        for (let i = 1; i <= 4; i++) {
            dem[i] = 0;
        }
        for (let i = 0; i < dates_issued.length; i++) {
            let y = dates_issued[i].getFullYear();
            if (y === year) {
                let q = await getQuarter(dates_issued[i].getMonth() + 1);
                dem[q]++;
            }
        }

        for (let i = 1; i <= 4; i++) {
            kq.push({quarter: i, quantity: dem[i]});
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            dem[i] = 0;
        }
        for (let i = 0; i < dates_issued.length; i++)  {
            let y = dates_issued[i].getFullYear();
            if (y === year) {
                let m = dates_issued[i].getMonth() + 1;
                dem[m]++;
            }
        }

        for (let i = 1; i<= 12; i++) {
            kq.push({month: i, quantity: dem[i]});
        }
    }
    return kq;
}

module.exports = timeFilter;
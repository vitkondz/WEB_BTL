const database = require('../common/NDODatabase');

class RegistryForecast {

    // Ham du bao thong tin dang kiem lai va dang kiem moi trong thang moi
    static async registryForecast(data, result) {
        let center_id = data.center_id;
        let province = data.province;
        let area = data.area;

        let queries = [];
        let values = [];
        let query = "select registration_information.registration_number, registration_information.center_id, registration_information.date_issued, registration_information.date_expired, center_information.province, center_information.area" 
                + " from registration_information" 
                + " join center_information on registration_information.center_id = center_information.center_id";
        let value = [];
        queries.push(query);
        values.push(value);

        database.get(queries, values)
        .then((res) => {
            let registries = res[0];

            // Loc thong tin dang kiem theo dau vao ma trung tam, tinh thanh, khu vuc
            if (center_id !== false && center_id !== "VN0000") {
                for (let i = 0; i < registries.length; i++) {
                    if (registries[i].center_id !== center_id) {
                        registries.splice(i, 1);
                        i--;
                    }
                }
            } else if (province !== false) {
                for (let i = 0; i < registries.length; i++) {
                    if (registries[i].province !== province) {
                        registries.splice(i, 1);
                        i--;
                    }
                }
            } else if (area !== false) {
                for (let i = 0; i < registries.length; i++) {
                    if (registries[i].area !== area) {
                        registries.splice(i, 1);
                        i--;
                    }
                }
            }

            // Sap xep mang dang kiem dua tren ma dang kiem va ngay dang kiem
            registries.sort(function (a, b) {
                if (a.registration_number < b.registration_number) {      
                    return -1;
                }
                if (a.registration_number > b.registration_number) {
                    return 1;
                }
                let d1 = a.date_issued.slice(0, 2);
                let m1 = a.date_issued.slice(3, 5);
                let y1 = a.date_issued.slice(6, 10);
                let date1 = new Date(d1, parseInt(m1) - 1, y1);
                
                let d2 = a.date_issued.slice(0, 2);
                let m2 = a.date_issued.slice(3, 5);
                let y2 = a.date_issued.slice(6, 10);
                let date2 = new Date(d2, parseInt(m2) - 1, y2);
                if (date1 < date2) {
                    return -1;
                }
                return 1;
            })

            // Dem so luong xe dang kiem moi va dang kiem lai hang thang

            // Bien dem so luong xe dang kiem moi hang thang
            let dem1 = 0;

            // Bien dem so luong xe dang kiem lai hang thang
            let dem2 = 0;

            // Bien luu gia tri cua ngay dau tien co xe dang kiem moi
            let min1 = new Date();

            // Bien luu gia tri cua ngay dau tien co xe dang kiem lai
            let min2 = new Date();

            for (let i = 0; i < registries.length; i++) {
                let d = registries[i].date_issued.slice(0, 2);
                let m = registries[i].date_issued.slice(3, 5);
                let y = registries[i].date_issued.slice(6, 10);
                let date = new Date(y, parseInt(m) - 1, d);

                if (i === 0) {
                    dem1++;
                    min1 = date;
                } else {
                    if (registries[i].registration_number !== registries[i - 1].registration_number) {
                       dem1++;
                       min1 = (date < min1) ? date : min1;
                    } else {
                        dem2++;
                        min2 = (date < min2) ? date : min2;
                    }
                }
            }
  
            let this_month = new Date().getMonth();
            let this_year = new Date().getFullYear();
            console.log(this_year, min1.getFullYear(), min1.getMonth(), this_month);
            // Tinh trung binh xe dang kiem moi tinh tu 1-1-2020
            dem1 = Math.floor(dem1 / (12 * (this_year - min1.getFullYear()) - min1.getMonth() + this_month));
            // Tinh trung binh xe dang kiem lai tinh tu 6-1-2020
            dem2 = Math.floor(dem2 / (12 * (this_year - min2.getFullYear()) - min2.getMonth() + this_month));
            result({result: dem1 + dem2, new_registrations: dem1, re_Registrations: dem2});
        })
        .catch((err) => {
            // Truong hop xay ra loi do lenh truy van co so du lieu
            result({result: false, error: err.message});
        })
    }
}

module.exports = RegistryForecast;
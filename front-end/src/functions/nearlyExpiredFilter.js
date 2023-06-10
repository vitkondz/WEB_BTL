// Ham loc thong tin dang kiem sep het han
async function nearlyExpiredFilter(registrations) {
    let copiedRegistrations = await registrations.slice();

    let y = new Date();
    let currentMonth = y.getMonth() + 1;

    for (let i = 0; i < copiedRegistrations.length; i++) {
        let day_expired = await copiedRegistrations[i].date_expired.slice(0, 2);
        let month_expired = await copiedRegistrations[i].date_expired.slice(3, 5);
        let year_expired = await copiedRegistrations[i].date_expired.slice(6, 10);
        let tam1 = new Date(year_expired, parseInt(month_expired) - 1, day_expired);
        let tam2 = new Date(tam1);
        tam1.setDate(tam1.getDate() - 60);
        

        if (tam2.getTime() < y.getTime()) {
            copiedRegistrations.splice(i, 1);
            i--;
        } else if (tam1.getFullYear() !== y.getFullYear()) {
            copiedRegistrations.splice(i, 1);
            i--;
        }
        else if (tam1.getMonth() + 1 > currentMonth) {
            copiedRegistrations.splice(i, 1);
            i--;
        }
    }
    

    return copiedRegistrations;
}

module.exports = nearlyExpiredFilter;
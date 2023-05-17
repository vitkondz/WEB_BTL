 let Registration = require('./registration.model');
 let Owner = require('./owner.model');
 let Car = require('./car.model')

const RegisterForm = function(registerForm) {

}

//Nhận dữ liệu từ form đăng kiểm
RegisterForm.get_data = function(data, result) {
    Registration.checkRegistrationValid(data, function(response) 
    {
        if (response === true) {
            //Tách dữ liệu thành 3 phần tương ứng với 3 cở sử dữ liệu: thông tin đăng kiểm, thôn tin xe, thông tin chủ sở hữu
            let newRegistrationInfo = {
                number_plate: data.number_plate,
                owner_name: data.owner_name,
                owner_id: data.owner_id,
                date_issued: data.date_issued,
                date_expired: data.date_expired,
                center_name: data.center_name,
                center_id: data.center_id,
            }
            Registration.create(newRegistrationInfo, function(response) {{
                //    result({result: response});
            }})
            
            let newCarInfo = {
                number_plate: data.number_plate,
                car_name: data.car_name,
                province: data.province,
                date_issued: data.date_issued,
                date_expired: data.date_expired,
                brand: data.brand,
                purpose_of_use: data.purpose_of_use,
                owner_name: data.owner_name,
                owner_id: data.owner_id
            }
            Car.create(newCarInfo, function(response) {{
                //    result({result: response});
            }})
                
            let newOwnerInfo = {
                owner_name: data.owner_name,
                type_of_ownership: data.type_of_ownership,
                owner_id: data.owner_id,
                owner_address: data.owner_address,
                contact_number: data.contact_number,
            }
            Owner.create(newOwnerInfo, function(response) {{
                //     result({result: response});
            }})
            result({result: 'Dang kiem xe co bien so ' + data.number_plate + ' thanh cong'});
        } else {
            result({result: 'Dang kiem xe co bien so ' + data.number_plate + ' that bai'});
        }
    })
} 
   
module.exports = RegisterForm;
import axios from 'axios';

export const updateSettings = async (data, type) => {

    try {
        const url = type === 'password' ? 'http://localhost:5000/alok/api/v1/users/updateMyPassword' : 'http://localhost:5000/alok/api/v1/users/updateMe'

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        if (res.data.status === "Success") {
            if (type === "data") {
                document.getElementById("updateSuccess_alert" || "updateSuccess_alert2").classList.remove("hidden")
                document.getElementById("updateSuccess_alert" || "updateSuccess_alert2").innerHTML = `${type.toUpperCase()} Updated Successfully!!`
                setTimeout(function () {
                    document.getElementById("updateSuccess_alert" || "updateSuccess_alert2").classList.add("hidden")
                }, 5 * 1000)
            } else if (type === "password") {
                document.getElementById("updateSuccess_alert2" || "updateSuccess_alert2").classList.remove("hidden")
                document.getElementById("updateSuccess_alert2" || "updateSuccess_alert2").innerHTML = `${type.toUpperCase()} Updated Successfully!!`
                setTimeout(function () {
                    document.getElementById("updateSuccess_alert2" || "updateSuccess_alert2").classList.add("hidden")
                }, 5 * 1000)
            }
        }


    } catch (error) {
        if (type === 'data') {
            document.getElementById("updateFail_alert").classList.remove("hidden")
            document.getElementById("updateFail_alert").innerHTML = error.response.data.message
            setTimeout(function () {
                document.getElementById("updateFail_alert").classList.add("hidden")
            }, 8 * 1000)

        } else if (type === "password") {
            document.getElementById("updateFail_alert2").classList.remove("hidden")
            document.getElementById("updateFail_alert2").innerHTML = error.response.data.message
            setTimeout(function () {
                document.getElementById("updateFail_alert2").classList.add("hidden")
            }, 8 * 1000)
        }
    }
}
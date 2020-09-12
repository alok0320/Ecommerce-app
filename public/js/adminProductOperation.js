import '@babel/polyfill';
import axios from 'axios';

export const addproduct = async (name, price, maxprice, category, subcategory, availableQty, productWeight, deliveryCharge, productDescription, approvedBy, enableDisplay) => {
    // var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");
    try {
        const res = await axios({
            method: "POST",
            url: "http://localhost:5000/alok/api/v1/products",
            data: {
                name,
                price,
                maxprice,
                category,
                subcategory,
                availableQty,
                productWeight,
                deliveryCharge,
                productDescription,
                approvedBy,
                enableDisplay
            },

        });
        console.log(res.data.status);
        if (res.data.status === "Success") {
            document.getElementById("SuccessAddproduct").classList.remove("hidden")
            document.getElementById("SuccessAddproduct").style.color = "green"
            document.getElementById("SuccessAddproduct").innerHTML = "Product Added Successfully"
            setTimeout(function () {
                document.getElementById("SuccessAddproduct").classList.add("hidden")

            }, 5 * 1000)

        }

        console.log(res);
    } catch (err) {
        document.getElementById("SuccessAddproduct").classList.remove("hidden")
        document.getElementById("SuccessAddproduct").style.color = "red"
        document.getElementById("SuccessAddproduct").innerHTML = "<b>ERROR IN ADDING PRODUCT!!!</b> <br><br>" + err.response.data.message

        setTimeout(function () {
            document.getElementById("SuccessAddproduct").classList.add("hidden")

        }, 5 * 1000)
    }

};

export const editProduct = async (name, price, maxprice, category, subcategory, availableQty, productWeight, deliveryCharge, productDescription, approvedBy, enableDisplay, dealOfDay, tag1, tag2, tag3, tag4) => {
    try {
        const url = (window.location.href).toLowerCase()
        const obj = new URL(url);
        const id = obj.pathname.split("/")[2]

        const res = await axios({
            method: "PATCH",
            url: `http://localhost:5000/alok/api/v1/products/${id}`,
            data: {
                name,
                price,
                maxprice,
                category,
                subcategory,
                availableQty,
                productWeight,
                deliveryCharge,
                productDescription,
                approvedBy,
                enableDisplay,
                dealOfDay,
                tag1,
                tag2,
                tag3,
                tag4
            },

        });
        if (res.data.status === "success") {
            // alert("Updated Successfully");
            document.getElementById("updateSuccess").classList.remove("hidden")
            document.getElementById("updateSuccess").innerHTML = "Product Updated SuccessFully!"
            document.getElementById("updateSuccess").style.color = "green"
            document.getElementById("updateFail").classList.add("hidden")

            setTimeout(function () {
                location.assign("/admin-view_All_products")
            }, 5 * 1000)

        }


    } catch (error) {
        // alert("fail" + error.response.data.message)
        document.getElementById("updateFail").classList.remove("hidden")
        document.getElementById("updateFail").innerHTML = "Failed in Updating Product <br><br>" + error.response.data.message
        document.getElementById("updateFail").style.color = "red"
        document.getElementById("updateSuccess").classList.add("hidden")

    }
}
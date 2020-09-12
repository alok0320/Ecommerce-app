import {
    login,
    logout,
    signup,

} from './login';

import {
    updateSettings
} from "./updateSettings";

import {
    addproduct,
    editProduct
} from './adminProductOperation'


const promocode = document.querySelector(".promotest")
const loginform = document.querySelector(".form");
const signupForm = document.getElementById("form");
const logoutBtn = document.querySelector(".logout");
const logoutBtn2 = document.querySelector(".logout2");
const userdataForm = document.querySelector(".formUserData");
const userpasswordForm = document.querySelector(".formUserPassword");
const addnewproduct = document.querySelector(".add_new_product");
const updateProduct = document.querySelector(".update_product")
const deleteProductBtn = document.getElementById("deleteProduct")


if (loginform) {
    loginform.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // const name = document.getElementById("name").value;
        // const phone = document.getElementById("phone").value;
        // const passwordConf = document.getElementById("passwordConf").value;
        login(email, password);
        // signup(name, email, phone, password, passwordConf);

    });

}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout)
}
if (logoutBtn2) {
    logoutBtn2.addEventListener('click', logout)
}

if (signupForm) {
    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const passwordConf = document.getElementById("passwordConf").value;

        signup(name, email, phone, password, passwordConf);

    });
}

//****************************       COUPON FOR CART PAGE       ****************************/
if (promocode) {
    promocode.addEventListener("click", e => {

        e.preventDefault();

        // function verify() {
        const promocode = document.querySelector(".promocode").value
        if (promocode.match("happy")) {
            console.log("success");


            document.getElementById("hidden_discount").classList.remove("hidden")
            document.getElementById("hidden").classList.remove("hidden");
            document.getElementById("hidden2").classList.add("hiddenred");

            var totalPrice = document.querySelector(".Subtotal").innerHTML.slice(0)
            var totalprice = parseInt(totalPrice.slice(1))



            var saved = totalprice - (totalprice * 0.1)
            var totalDiscountPrice = (totalprice / 100) * 10
            console.log("Value::::" + saved);
            document.getElementById("hidden").innerHTML =
                "<strong>Coupon Applied!!!</strong> <br><br> You Saved Extra ₹" + totalDiscountPrice + " in this Order";
            document.querySelector(".veryfinal").innerHTML = "₹" + saved
            document.querySelector(".discount").innerHTML = "₹" + totalDiscountPrice
            return

        } else if (promocode === '') {
            console.log("err");

            document.getElementById("hidden2").classList.remove("hiddenred");
            document.getElementById("hidden2").innerHTML = "Please Enter Coupon Code";

        } else {
            document.getElementById("hidden").classList.add("hidden");
            document.getElementById("hidden2").classList.remove("hiddenred");
            document.getElementById("hidden2").innerHTML = "Invalid Coupon Code";
        }
        // }
    })
}
//****************************       COUPON FOR CART PAGE --ENDS      ****************************/


if (userdataForm) {
    userdataForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        updateSettings({
            name,
            email
        }, 'data');
    })
}


if (userpasswordForm) {
    userpasswordForm.addEventListener("submit", async e => {
        e.preventDefault();
        document.querySelector(".updatePass").innerHTML = "Updating..."
        const passwordCurrent = document.getElementById("currentPassword").value;
        const password = document.getElementById("newPassword").value;
        const passwordConf = document.getElementById("passwordConf").value;

        await updateSettings({
            passwordCurrent,
            password,
            passwordConf
        }, 'password');

        document.querySelector(".updatePass").innerHTML = "Save Changes"
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("passwordConf").value = "";
    })
}

if (addnewproduct) {
    addnewproduct.addEventListener("submit", e => {
        e.preventDefault();
        document.querySelector(".submitProduct").innerHTML = "Adding Product...."

        const name = document.getElementById("productname").value;
        const price = document.getElementById("productSellPrice").value;
        const maxprice = document.getElementById("productMaxPrice").value;
        const category = document.getElementById("productcategory").value;
        const subcategory = document.getElementById("productSubCategory").value;
        const availableQty = document.getElementById("productAvailableQty").value;
        const productWeight = document.getElementById("productweight").value;
        const deliveryCharge = document.getElementById("deliverycharge").value;
        const productDescription = document.getElementById("productDescription").value;
        const approvedBy = document.getElementById("approvedBy").value;
        const enableDisplay = document.getElementById("enableDisplay").value;

        addproduct(name, price, maxprice, category, subcategory, availableQty, productWeight, deliveryCharge, productDescription, approvedBy, enableDisplay)
        document.querySelector(".submitProduct").innerHTML = "Add Product"


    })
}














if (updateProduct) {
    updateProduct.addEventListener("submit", e => {
        e.preventDefault()
        const name = document.getElementById("productname").value;
        const price = document.getElementById("productSellPrice").value;
        const maxprice = document.getElementById("productMaxPrice").value;
        const category = document.getElementById("productcategory").value;
        const subcategory = document.getElementById("productSubCategory").value;
        const availableQty = document.getElementById("productAvailableQty").value;
        const productWeight = document.getElementById("productweight").value;
        const deliveryCharge = document.getElementById("deliverycharge").value;
        const productDescription = document.getElementById("productDescription").value;
        const approvedBy = document.getElementById("approvedBy").value;
        const enableDisplay = document.getElementById("enableDisplay").value;
        const dealOfDay = document.getElementById("dealOfDay").value;
        const tag1 = document.getElementById("tag1").value;
        const tag2 = document.getElementById("tag2").value;
        const tag3 = document.getElementById("tag3").value;
        const tag4 = document.getElementById("tag4").value;



        editProduct(name, price, maxprice, category, subcategory, availableQty, productWeight, deliveryCharge, productDescription, approvedBy, enableDisplay, dealOfDay, tag1, tag2, tag3, tag4);
    })


}
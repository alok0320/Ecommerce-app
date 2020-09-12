 import '@babel/polyfill';
 import axios from 'axios';
 import {
     assign
 } from 'nodemailer/lib/shared';
 export const login = async (email, password) => {
     // var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");
     try {
         const res = await axios({
             method: "POST",
             url: "http://localhost:5000/alok/api/v1/users/login",
             data: {
                 email,
                 password,
             },

         });
         console.log(res.data.status);
         if (res.data.status === "Success") {
             alert("Logged In Successfully");
             location.assign("/")
         }

         console.log(res);
     } catch (err) {
         document.querySelector(".hideAlert").classList.remove("alert")
         document.getElementById("alert").innerHTML = err.response.data.message
     }

 };



 export const signup = async (name, email, phone, password, passwordConf) => {
     // var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");
     try {

         const res = await axios({
             method: "POST",
             url: "http://localhost:5000/alok/api/v1/users/signup",
             data: {
                 name,
                 email,
                 phone,
                 password,
                 passwordConf
             },

         });
         console.log(res.data.status);
         if (res.data.status === "Success") {
             alert("Account Created Successfully");
             location.assign("/")
         }


         console.log(res);
     } catch (err) {
         if (err.response.status === 500) {
             document.querySelector(".hideAlert").classList.remove("alert")
             document.getElementById("alert").innerHTML = "Cannot Submit Form Please Fill Required Field Correctly"



         } else {
             document.querySelector(".hideAlert").classList.remove("alert")
             document.getElementById("alert").innerHTML = err.response.data.message
         }
     }

 };


 export const logout = async () => {
     try {
         const res = await axios({
             method: 'GET',
             url: 'http://localhost:5000/alok/api/v1/users/logout'
         })

         if (res.data.status === 'success') {
             location.reload(true);
             location.assign("/")

         }

     } catch (error) {
         console.log(error);
         alert("Error in Logging Out. Please Try Again!!!")
     }
 }
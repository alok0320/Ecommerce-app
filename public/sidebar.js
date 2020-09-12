document.getElementById("buttonOpen").addEventListener("click", openMenu);

function openMenu() {
  document.querySelector(".sidebar-mobile").classList.add("open");
  document.body.style.backgroundColor = " rgba(0,0,0,0.5)";
  document.body.style.top = "0";
  document.body.style.overflow = "hidden";
}
document
  .querySelector(".sidebar-close-button")
  .addEventListener("click", closeMenu);

function closeMenu() {
  document.querySelector(".sidebar-mobile").classList.remove("open");
  document.body.style.backgroundColor = "#ebebeb";
  document.body.style.overflow = "auto";
}

// *********************************************Sticky NAVBAR*******************************************

window.onscroll = function () {
  myFunction();
};

// Get the navbar
var navbar = document.querySelector(".grid-container-main");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// ****************Products**************

// class UI {
//     displayProducts(products) {
//             let result = "";
//             products.forEach(product => {
//                 result += `
//        <!-- single product -->
//           <article class="product">
//             <div class="img-container">
//               <img
//                 src=${product.image}
//                 alt="product"
//                 class="product-img"
//               />
//               <button class="bag-btn" data-id=${product.id}>
//                 <i class="fas fa-shopping-cart"></i>
//                 add to cart
//               </button>
//             </div>
//             <h3>${product.title}</h3>
//             <h4>$${product.price}</h4>
//           </article>
//           <!--end of single product -->
//        `;
//             });
//             productsDOM.innerHTML = result;
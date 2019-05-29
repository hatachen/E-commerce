//variables

const CartBtn=document.querySelector('.cart-btn');
const CloseCartBtn=document.querySelector('.close-cart');
const ClearCartBtn=document.querySelector('.clear-cart');
const cartDOM=document.querySelector('.cart');
const cartOverlay=document.querySelector('.cart-overlay');
const cartItems=document.querySelector('.cart-items');
const cartTotals=document.querySelector('.cart-total');
const cartContent=document.querySelector('.cart-content');
const productDOM=document.querySelector('.products-center');

//cart

let cart = [];

//getting the products

class Products{
    async getProducts(){
    try {
       let result= await fetch('https://github.com/hatachen/E-commerce/blob/master/products.json');
       let data = await result.json;
       let products = data.items;
       products = products.map(item =>{
           const {title, price} = item.fields;
           const {id} = item.sys;
           const {image} = item.fields.image.fields.file.url;
           return {title, price, id, image};
       })



       return products;  
    } catch (error) {
        console.log(error);
    }
        
    }

}

//display product

class UI{
    displayProducts(products){
        let result = "";
        products.forEach(product => {
            result += `
            <!--single product-->
            <article class="product">
              <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}></button>
                <i class="fa fa-shopping-cart"></i>add to bag
              </div>
              <h3>${product.title}</h3>
              <h4>$ ${product.price}</h4> 
            </article>
            <!--end of single product-->
            `;
        });
        
        productDOM.innerHTML=result;
       
    }
    
}

//local Storage

class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON,stringify(products));
                                }
}
document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();


// get all products

products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);

});

})
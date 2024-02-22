let foodproducts = [
    {
    "productId":1,
     "name":"Chicken Wrap",
     "image":"shawarma_wrap.jpg",
     "type":"Shawarma",
     "price":450.00,
     "ratings":4.7

    },
    
    {
        "productId":2,
        "name":"Idly [2 Nos]",
        "image":"Brahmin_cafe.jpg",
        "type":"South Indian",
        "price":70.00,
        "ratings":4.7

    },
    {
        "productId":3,
        "name":"Crispy Veg Burger",
        "image":"mcdonalds.jpg",
        "type":"Burger,Fast Food",
        "price":99.00,
        "ratings":4.7

    },
    {
        "productId":4,
        "name":"Hot 'N' Cheezy Burger",
        "image":"burger_king.jpg",
        "type":"Burger,Fast Food",
        "price":199.00,
        "ratings":4.7

    },
    {
        "productId":5,
        "name":"Tofu Veggie Stirfry",
        "image":"freshmenu.jpg",
        "type":"Shawarma",
        "price":133.00,
        "ratings":4.7

    },
    {
        "productId":6,
        "name":"Mysore Pak",
        "image":"sangamsweets.jpg",
        "type":"Sweets,Desserts",
        "price":150.00,
        "ratings":4.7

    },{
        "productId":7,
        "name":"Poori Sabji",
        "image":"vijayalakshni_veg.jpg",
        "type":"South Indian,Ch..",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":8,
        "name":"Hot Dum Biryani",
        "image":"ambur_biryani.jpg",
        "type":"Biryani",
        "price":450.00,
        "ratings":4.7

    },
    {
        "productId":9,
        "name":"Mango Lassi",
        "image":"Lassi_Shop.jpg",
        "type":"Beverages,Shake..",
        "price":450.00,
        "ratings":4.7

    }

];

let homePageFoodProducts = [];
 
let userid = '';


function onclickOfEnter(ev) {
    if(ev.which==13){
        searchFoodItem();
    }
  };
/**
 * display all items from foodproducts on home page
 */
function createFoodItemList(){
    userid = sessionStorage.getItem("fname");
    password = sessionStorage.getItem("password");      
    if(userid==undefined || password==undefined){
        window.location="/html/login.html";
    }else{
        let foodItemarrsession = sessionStorage.getItem("foodItemArr");
        if(foodItemarrsession==undefined||foodItemarrsession==null ||foodItemarrsession=='undefined'){
            sessionStorage.setItem("foodItemArr",foodproducts.stringify);
        }else{
            foodproducts=JSON.parse(foodItemarrsession);
        }
        searchFoodItem();
        document.getElementById("totalItemInCart").innerText=0;    
        document.getElementById("userprofile").innerText = userid;
         if( sessionStorage.getItem("isAdmin")=="false"){
             document.getElementById("addRestraurant").style.display="none";
         }

    }
 
    
    
}
/**
 * function for adding food items to new array for cart and display in cart div
 */
let  cartItem = [];
function addtocart(foodItem)
{
   
     let prodcutid = foodItem.getAttribute('data-productId');
     let cartFoodItem = cartItem.find((item) => {return item.productId == prodcutid});
          
     console.log("food items in cart"+cartFoodItem);
     let fooditemtemp=null;
     if(cartFoodItem==undefined){
        console.log("inside the if block");
        fooditemtemp = foodproducts.find((item) => {return item.productId == prodcutid});
        fooditemtemp.quantity=1;  
        cartItem.push(fooditemtemp);
     }else{
        console.log("inside the else block"+cartFoodItem.prodcutId);
        cartFoodItem.quantity++;
        fooditemtemp=cartFoodItem;
     }
     let cartContent =createContentForShoppingCartDynamically(cartItem);    
     document.getElementById('shoppingCart').innerHTML=cartContent;
     document.getElementById("totalItemInCart").innerText=cartItem.length;
     document.getElementById('totalAmtCart').innerHTML='Total :'+calculateTotal(cartItem);
    
 
 
 }
/**
 * function for searching the restraurant filter the restraurants based on seach
 */
 function searchFoodItem(){    
    
    let searchKeyWord = document.getElementById('searchInput').value;
    if(isEmpty(searchKeyWord)){
        homePageFoodProducts = foodproducts;
    }else{
       homePageFoodProducts = foodproducts.filter((item)=>{

            return item.name.toUpperCase().includes(searchKeyWord.toUpperCase()) ||  item.type.toUpperCase().includes(searchKeyWord.toUpperCase());
        })
    }
    let content = createContentDynamically(homePageFoodProducts);
    document.getElementById("productList").innerHTML=content;


 }
 /**
 * function for creating cards dynamically for foodproducts array
 */
 function createContentDynamically(itemArray){
    let content='';
    itemArray.forEach((product) => {
        console.log("----->"+product.name);
        content += `<div class="col-md-4">
                    <div class="card">
                    <img src="/images/products/${product.image}" class="card-img-top" alt="Card Image">
                    <div class="card-body">
                        <h5 class="card-title"style="padding-bottom: 20px;" >
                            <span style="float:left;font-size:18px">${product.name}</span>
                            <span class="ratings" style="font-size:13px;float: right;">${product.ratings}<span class="fa fa-star" style="font-size:13px;margin-left: 5px;"></span>
                        </h5>
                        <p class="card-text" style="padding-bottom: 20px;" >
                            <span style="float: left;">${product.type}</span> 
                            <span style="float: right;">&#8377;${product.price}</span>
                        </p>  
                        <a href="#" class="btn btn-primary"  data-productId="${product.productId}" onclick="addtocart(this)">Add To Cart</a>
                         </div>
                    </div>
                </div>
            `

    })
    return content;

 }
 function createContentForShoppingCartDynamically(itemArray){
    let cartContent=``;
    itemArray.forEach(item => {
        cartContent=cartContent+`        
        <div class="row">
        <div class="col-md-6">
            <img src="/images/products/${item.image}" class="card-img-top" alt="Card Image">
            <p style="font-weight:600;font-size:smaller;"> ${item.name} </p>
           
        </div>
        <div class="col-md-6">                     
           <div>
            <table style="width: 100%;"> 
              <tr style="vertical-align: top;">
                <td><p>&#8377;${item.price}</p></td>
                <td style="text-align: right;"> <a href="#" data-productid="${item.productId}" onclick="removefromCart(this);" ><span class="fa fa-trash-o" style="font-weight: bold;"></span></a></td>
              </tr>
            </table> 
           </div>
            <div style="display: flex;width: 100%;margin:auto" >
            <a href="#" data-productidplus="${item.productId}" class="btn btn-success btn-sm" onclick="increaseQuantityInCart(this)"><span class="fa fa-plus"  onclick="increaseQuantityInCart(this)"></span></a>                      
            <input type="text" id="quantity" name="quantity" value="${item.quantity}" style="width: 40px;">    
            <a href="#" data-productidminus="${item.productId}" class="btn btn-success btn-sm" onclick="decreaseQuantityInCart(this)"><span class="fa fa-minus" onclick="decreaseQuantityInCart(this)"></span></a>
          </div>
        </div>
        
    </div>      `
        
     });
     return cartContent;
 }

 function isEmpty(str){
    return str==null||str.trim()=="";
 }
 function logout(){
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("password");
    window.location="/html/login.html"
 }

 function increaseQuantityInCart(element){   
    let productId = element.getAttribute("data-productidplus");
    let index = cartItem.findIndex((item) => {return item.productId == productId});
     if(index>=0){
        
        cartItem[index].quantity++;
    }
    console.log("array object"+ cartItem[index].quantity);
    let cartContent =createContentForShoppingCartDynamically(cartItem);    
     document.getElementById('shoppingCart').innerHTML=cartContent;
     document.getElementById('totalAmtCart').innerHTML='Total :'+calculateTotal(cartItem);

 }
 function decreaseQuantityInCart(element){
    
     let productId = element.getAttribute("data-productidminus");
     console.log(''+productId);
     let index = cartItem.findIndex((item) => {return item.productId == productId});
      
     if(index>=0){
        
        cartItem[index].quantity--;
     }
     console.log("array object"+ cartItem[index].quantity);
     if(cartItem[index].quantity==0){
        removeFromCartArrya(productId);

     }else{
        let cartContent =createContentForShoppingCartDynamically(cartItem);    
        document.getElementById('shoppingCart').innerHTML=cartContent;
     }
     document.getElementById('totalAmtCart').innerHTML='Total :'+calculateTotal(cartItem);
     

 }
 
 function removefromCart(element){
    let productId = element.getAttribute("data-productid");
    removeFromCartArrya(productId);
    document.getElementById('totalAmtCart').innerHTML='Total :'+calculateTotal(cartItem);

 }

 function removeFromCartArrya(productId){
    let index = cartItem.findIndex((item) => {return item.productId == productId});
    cartItem.splice(index,1);
    let cartContent =createContentForShoppingCartDynamically(cartItem);    
     document.getElementById('shoppingCart').innerHTML=cartContent;
    
 }

 function calculateTotal(arrOfItems){
    let total=0;
    cartItem.forEach((cartItemTmp)=>{
        total=total+(parseInt(cartItemTmp.price)*parseInt(cartItemTmp.quantity));

     });
     return total;
 }
 function addCartItemForPayment(){
    sessionStorage.setItem("cartItems",JSON.stringify(cartItem));
 }
 function addFoodItem(){
    let item = {
        "productId":10,
        "name":document.getElementById('foodName').value,
        "price":document.getElementById('price').value,
        "type":document.getElementById('cuisineType').value,
        "image": "shawarma_wrap.jpg",
        "rating":getRatingValue(document.getElementById('ratings'))
    }
    let foodItemarrsession = sessionStorage.getItem("foodItemArr");
    if(foodItemarrsession==undefined||foodItemarrsession==null ||foodItemarrsession=='undefined'){
        sessionStorage.setItem("foodItemArr",foodproducts.stringify);
    }else{
        foodproducts=JSON.parse(foodItemarrsession);
    }
   
   foodproducts.push(item);
   sessionStorage.setItem("foodItemArr",JSON.stringify(foodproducts));
   alert(sessionStorage.getItem("foodItemArr"));
   window.location.href = "/html/home.html";
 }
 function getRatingValue(element){
    let rating = 0;
    element.querySelectorAll('span').forEach(span => {
        
        console.log (span.className);
        
        if(span.className.includes("checked")){

                rating++;
        }
        
    
    });
    return rating;
 }
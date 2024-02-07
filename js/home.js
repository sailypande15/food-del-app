const foodproducts = [
    {
    "productId":1,
     "name":"Rolls On Wheels",
     "image":"shawarma_wrap.jpg",
     "type":"Shawarma",
     "price":450.00,
     "ratings":4.7

    },
    
    {
        "productId":2,
        "name":"Brahmins' Thatte Idli",
        "image":"Brahmin_cafe.jpg",
        "type":"South Indian",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":3,
        "name":"MaCdonalds",
        "image":"mcdonalds.jpg",
        "type":"Burger,Fast Food",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":4,
        "name":"Burger King",
        "image":"burger_king.jpg",
        "type":"Burger,Fast Food",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":5,
        "name":"FreshMenu",
        "image":"freshmenu.jpg",
        "type":"Shawarma",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":6,
        "name":"Kanthi Sweets",
        "image":"sangamsweets.jpg",
        "type":"Sweets,Desserts",
        "price":150.00,
        "ratings":4.7

    },{
        "productId":7,
        "name":"Vijayalakshmi Veg",
        "image":"vijayalakshni_veg.jpg",
        "type":"South Indian,Ch..",
        "price":150.00,
        "ratings":4.7

    },
    {
        "productId":8,
        "name":"Ambur Hot Dum Biryani",
        "image":"ambur_biryani.jpg",
        "type":"Biryani",
        "price":450.00,
        "ratings":4.7

    },
    {
        "productId":9,
        "name":"Lassi Shop",
        "image":"Lassi_Shop.jpg",
        "type":"Beverages,Shake..",
        "price":450.00,
        "ratings":4.7

    }

];
 
let userid = '';
/**
 * display all items from foodproducts on home page
 */
function createFoodItemList(){
    let content =createContentDynamically(foodproducts) ; 
    document.getElementById("productList").innerHTML=content;
    document.getElementById("totalItemInCart").innerText=0;
    userid = sessionStorage.getItem("userid");
    console.log('--------->'+sessionStorage.getItem("userid"));
    console.log('--------->'+sessionStorage.getItem("password"));
    document.getElementById("userprofile").innerText = userid;

    
    
}
/**
 * function for adding food items to new array for cart and display in cart div
 */
let  cartItem = [];
function addtocart(foodItem)
{
   
     let prodcutid = foodItem.getAttribute('data-productId');
     let fooditemtemp = foodproducts.find((item) => {return item.productId == prodcutid});    
     cartItem.push(fooditemtemp);
     let cartContent =``;
     cartItem.forEach(item => {
        cartContent=cartContent+`<div class="row">
        <div class="col-md-6">
            <img src="/images/products/${item.image}" class="card-img-top" alt="Card Image">
            <p> ${item.name}</p>
           
        </div>
        <div class="col-md-4">
           
           <p>&#8377;${item.price}  </p>
            <div style="display: flex;width: 100%;" >
            <button class="btn btn-success btn-sm" type="button" name="button">
                <i class="fa fa-plus" ></i>
            </button>
            <input type="text" value="1" style="width: 40px;">
            
            <button class="btn btn-success btn-sm" type="button" name="button">
                <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="col-md-2">
            <a href="#" ><i class="fa fa-trash-o" style="font-weight: bold;"></i></a>

        </div>
    </div>        `
        
     });
     document.getElementById('shoppingCart').innerHTML=cartContent;
     document.getElementById("totalItemInCart").innerText=cartItem.length;
    
 
 
 }
/**
 * function for searching the restraurant filter the restraurants based on seach
 */
 function searchFoodItem(){
    let searchKeyWord = document.getElementById('searchInput').value;
    let searchArr=[];
    if(isEmpty(searchKeyWord)){
        searchArr=foodproducts;
       

    }else{
        
       searchArr = foodproducts.filter((item)=>{

            return item.name.toUpperCase().includes(searchKeyWord.toUpperCase()) ||  item.type.toUpperCase().includes(searchKeyWord.toUpperCase());
        })
        
        console.log("search array = "+searchArr);
       

    }
    let content = createContentDynamically(searchArr);
    document.getElementById("productList").innerHTML=content;


 }
 /**
 * function for creating cards dynamically for foodproducts array
 */
 function createContentDynamically(itemArray){
    let content='';
    itemArray.forEach((product) => {

        content += `<div class="col-md-4">
                    <div class="card">
                    <img src="/images/products/${product.image}" class="card-img-top" alt="Card Image">
                    <div class="card-body">
                        <h5 class="card-title"style="padding-bottom: 20px;" >
                            <span style="float:left;padding-top: 5px;">${product.name}</span>
                            <span class="ratings" style="float: right;">${product.ratings}<span class="fa fa-star" style="margin-left: 5px;"></span>
                        </h5>
                        <p class="card-text" style="padding-bottom: 20px;" >
                            <span style="float: left;">${product.type}</span> 
                            <span style="float: right;">&#8377;${product.price} For One</span>
                        </p>  
                        <a href="#" class="btn btn-primary"  data-productId="${product.productId}" onclick="addtocart(this)">Add To Cart</a>
                         </div>
                    </div>
                </div>
            `

    })
    return content;

 }

 function isEmpty(str){
    return str==null||str.trim()=="";
 }
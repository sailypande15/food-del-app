let cartitems = [];

function loadCartItems() { 
    cartitems = JSON.parse(sessionStorage.getItem("cartItems"));
    document.getElementById('orderTotal').innerHTML= calculateTotal(cartitems)
    

}
function calculateTotal(arrOfItems){
   
    let total =cartitems.reduce((accumulator,currentvalue)=>{
        return accumulator+(parseInt(currentvalue.price)*parseInt(currentvalue.quantity));
    },0);   
    
     return total;
 }
let cartitems = [];

function loadCartItems() { 
    cartitems = JSON.parse(sessionStorage.getItem("cartItems"));
    let total =  calculateTotal(cartitems);
    document.getElementById('orderTotal').innerHTML=total;
    document.getElementById('totalCartAmount').innerHTML= total;
    
    

}
function calculateTotal(arrOfItems){
   
    let total =cartitems.reduce((accumulator,currentvalue)=>{
        return accumulator+(parseInt(currentvalue.price)*parseInt(currentvalue.quantity));
    },0);   
    
     return total;
 }
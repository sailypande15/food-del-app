
function myFunction(){
    let x = document.getElementById("myFile");
    let img = document.getElementById("myImg");
    img.src = URL.createObjectURL(x.files[0]); 
    console.log(x.files[0]);
}

function highlightThestar(element) {
    element.querySelectorAll('span').forEach(span => {
        
        console.log (span.className);
        span.className = "fa fa-star checked";
        
    
    });

}

function redirectToLogin(){
    userid = sessionStorage.getItem("fname");
    password = sessionStorage.getItem("password");      
    if(userid==undefined || password==undefined){
        window.location="/html/login.html";
    }
}
let registeredUsers=[
  {"userid":"test1@gmail.com","password":"abcd1234","address":"","role":"admin","fname":"test1","lname":""},
{"userid":"test2@gmail.com","password":"password","address":"","role":"","fname":"test2","lname":""},
{"userid":"test3@gmail.com","password":"password","address":"","role":"","fname":"test3","lname":""},
{"userid":"test4@gmail.com","password":"password","address":"","role":"admin","fname":"test4","lname":""},
{"userid":"saily.pande@gmail.com","password":"abcd1234","address":"","role":"admin","fname":"test4","lname":""}
];



function registerUser(){ 
  let element = document.getElementById('registrationForm');
  regExForUserId = /^\S+@\S+\.\S+$/;
  if(!element.userId.value.match(regExForUserId)){
    document.getElementById('registrationError').innerText = "User id is not valid";
    return;
  }
  if((element.password.value==null) || (element.password.value==undefined)){
    document.getElementById('registrationError').innerText = "User id is not valid";
    return;
  } 
  const userinfo ={
      "userid":element.userId.value,
      "password":element.password.value,
      "fname":element.firstName.value,
      "lname":element.lastName.value,
      "address":element.address.value,
      "role":element.flexCheckChecked.checked?"admin":""
      
  } 
  postAjaxRequest(JSON.stringify(userinfo));
  registeredUsers.push({"username":element.userId.value,"password":element.password.value,"address":element.address.value,"role":userinfo.role,"fname":element.firstName.value,"lname":element.lastName.value})
  sessionStorage.userid = element.userId.value;
  sessionStorage.password =element.password.value;
  sessionStorage.fname=element.firstName.value;
  sessionStorage.isAdmin = element.flexCheckChecked.checked;
  window.location.href = "./home.html"
  
}
async function onclickOfButton(){
    let username = ''+document.getElementById("username").value;
    let password = document.getElementById("password").value;  
    const res = await fetch('http://localhost:3000/users');    
    registeredUsers = await res.json(); 
    let userDetails =JSON.parse( JSON.stringify(registeredUsers)).find( (item)=>{return item.userid===username && password===item.password}); 
    if(userDetails != undefined||userDetails !=null){
       sessionStorage.fname=userDetails.fname;
       sessionStorage.userid = username;
       sessionStorage.password=password;
       sessionStorage.isAdmin = userDetails.role==='admin';
       console.log("5");
       document.getElementById("loginform").submit();

    }else{
      document.getElementById('errorMsg').innerHTML='Invalid Username / Password';
    }
   
  }
  function postAjaxRequest(data){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xhttp.open("POST", "http://localhost:3000/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
    console.log('data is sent');
  
}
let registeredUsers=[{"username":"test1@gmail.com","password":"abcd1234","address":"","role":"admin","fname":"test1","lname":""},
{"username":"test2@gmail.com","password":"password","address":"","role":"","fname":"test2","lname":""},
{"username":"test3@gmail.com","password":"password","address":"","role":"","fname":"test3","lname":""},
{"username":"test4@gmail.com","password":"password","address":"","role":"admin","fname":"test4","lname":""},
{"username":"saily.pande@gmail.com","password":"abcd1234","address":"","role":"admin","fname":"test4","lname":""}]


function registerUser(){ 
  let element = document.getElementById('registrationForm');
  regExForUserId = /"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/;
  if(!regExForUserId.test(element.userId.value)){
    document.getElementById('registrationError').innerText = "User id is not valid";
    return;

  }
  if((element.password.value==null) || (element.password.value==undefined)){
    document.getElementById('registrationError').innerText = "User id is not valid";
    return;

  }
  alert('form object name='+element.userId.value);  
  const userinfo ={
      "userid":element.userId.value,
      "password":element.password.value,
      "fistname":element.firstName.value,
      "lastname":element.lastName.value,
      "address":element.address.value,
  }
  registeredUsers.push({"username":element.userId.value,"password":element.password.value,"address":element.address.value,"role":"admin","fname":element.firstName.value,"lname":element.lastName.value})
  sessionStorage.userid = element.userId.value;
  sessionStorage.password =element.password.value;
  sessionStorage.fname=element.firstName.value;
  element.submit();
  
}
function onclickOfButton(){
    let username = ''+document.getElementById("username").value;
    let password = document.getElementById("password").value;  
    let userDetails = registeredUsers.find( (item)=>{return item.username===username && password===item.password}); 
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
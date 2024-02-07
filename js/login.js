function onclickOfButton(){
    let username = ''+document.getElementById("username").value;
    let password = document.getElementById("password").value; 
    const userObj = {"userid":username,"password":password};
   
    sessionStorage.userid = username;
    sessionStorage.password = password;
    
   
    console.log('--------->'+sessionStorage.getItem("userid"));
    console.log('--------->'+sessionStorage.getItem("password"));
    if('saily'==username && password == 'password' ){
      document.getElementById("loginform").submit();
    }
   
  }

  window.onload = async function(){
    token = window.localStorage.getItem('token');
    if(token){
      token = atob(token).split('-');
      usuario = token[0];
      perfil = token[1];

      url = window.location.href.split('/')[2];
      window.location.href = "http://"+ url + "/admin.html";
    }
  }

async function login(){
    usuario = document.getElementById('user').value;
    pass = document.getElementById('pass').value;

    let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({"username":`${usuario}`,"password":`${pass}`});
       
       let response = await fetch("/api/login", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       let data = await response.text();
       data = JSON.parse(data);
       if(data.status == 'OK'){      
            token64 = btoa(data.username + '-' + data.type);
            window.localStorage.setItem("token",token64);
        
        url = window.location.href.split('/')[2];
        window.location.href = "http://"+ url + "/admin.html";
       }else{
        document.getElementById('error').classList.remove('hidden');
       }
       
       


}



async function registro(){
    usuario = document.getElementById('user').value;
    pass = document.getElementById('pass').value;

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({"username":usuario, "password":pass});
       
       let response = await fetch("/api/registro", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
        let data = await response.text();
        data = JSON.parse(data);
        if(data.status == 'OK'){      
            url = window.location.href.split('/')[2];
            window.location.href = "http://"+ url +"/login.html";
        }
       
}
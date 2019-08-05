class User{
   constructor(name,email,password,pid=[],qty=[]){
      this.name = name;
      this.email = email;
      this.password = password;
      this.pid = pid;
      this.qty = qty;
   }
}


function signin()
{
   var name = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var newUser = new User(name,email,password);
   if(localStorage.getItem('Users')) {
      let users = JSON.parse(localStorage.getItem('Users') || "[]");
      users.push(newUser);
      cartedProduct.push({"email":email,"purchased_product_id":[]});
      localStorage.setItem('Users', JSON.stringify(users));
      window.location = 'login.html'
      window.alert("User successfully created. Now login to continue.!");
  } else {
      localStorage.setItem('Users', JSON.stringify([newUser]));
      window.location = 'login.html'
      window.alert("User successfully created. Now login to continue.!");
  }
}


function login()
{
   var email = document.getElementById("username").value;
   var password = document.getElementById("password").value;
   let users = JSON.parse(localStorage.getItem('Users') || "[]");
   let user;
   //console.log(users[0].password);
   let isAuthUser;
   var i;
   for(i = 0; i < users.length; i++) 
   {
       if(users[i].email === email && users[i].password === password) {
           isAuthUser = true;
           sessionStorage.setItem('isAuthenticated', true);
           break;
       }
   }
   if(isAuthUser) {
      sessionStorage.setItem('currUserName', users[i].name);
      sessionStorage.setItem('currUserEmail', users[i].email);
      sessionStorage.setItem('isAuthenticated', true);
      window.location = 'product.html'
  } else {
      window.alert("Invalid email or incorrect password. Try Again!");
  }
}



function getUser()
{
   if(sessionStorage.getItem('isAuthenticated'))
   {
      document.getElementById("user_name").innerHTML = sessionStorage.getItem('currUserName');
      document.getElementById("loginhref").removeAttribute("href");
   }
   else
   {
      document.getElementById('user_name').innerHTML = "Login";
      document.getElementById('carthref').removeAttribute("href");
   }
}



var products =[
   {"id":1,"name":"Halfmoon Male","price":100,"category":"Pets","source":"images/halfmoon.jpeg"},
   {"id":2,"name":"Crowntail Male","price":150,"category":"Pets","source":"images/crowntail.jpg"},
   {"id":3,"name":"Double Tail Male","price":150,"category":"Pets","source":"images/doubletail.jpg"},
   {"id":4,"name":"Galaxy Koi Female","price":200,"category":"Pets","source":"images/koi.jpg"},
   {"id":5,"name":"Veiltail Male","price":150,"category":"Pets","source":"images/veiltail.jpeg"},
   {"id":6,"name":"Osaki Platinum Betta Food","price":100,"category":"Pets&Supplies","source":"images/fishfood.jpg"},
];




function addToCart(id,bid,bbid){
   if(sessionStorage.getItem('isAuthenticated'))
   {
      var email = sessionStorage.getItem('currUserEmail');
      //window.cartedProduct.push({"email":email,purchased_product_id:[]});
      //for (var i=0;i<cartedProduct.length;i++)
      {
        // if(email === cartedProduct[i].email)
         {
            //window.cartedProduct[i].purchased_product_id.push(id);
            //console.log(cartedProduct[i].purchased_product_id);
            document.getElementById(bid).innerHTML = "Added";
            window.alert("Product Added to the Cart");
            let carted = JSON.parse(localStorage.getItem('Users') || []);
            for(var j=0;j<carted.length;j++)
            {
               if(email === carted[j].email)
               {
                  carted[j].pid.push(id);
                  carted[j].qty.push(1);
                  document.getElementById(bbid).disabled = true;
                  break;
               }
            }
            localStorage.setItem('Users',JSON.stringify(carted));
            
         }
      }
      
   }
   else
   {
      window.alert("Please Login to add Items to the Cart");
   }
}

function start(){
   getUser();
   generateCart();
}

function stop(){
   getUser();
   checkout();
}

function generateCart()
{
   if(sessionStorage.getItem('isAuthenticated'))
   {
      document.getElementById("flex-container").innerHTML = '';
      var product_id_array = [];
      var mail = sessionStorage.getItem('currUserEmail');
      var cp = JSON.parse(localStorage.getItem('Users') || []);
      for(var i=0;i<cp.length;i++)
      {
         if(mail === cp[i].email)
         {
            if(cp[i].pid.length!=0){
               product_id_array = cp[i].pid;
               break;
            }
            else{
               window.alert("No Item in the Cart");
               break;
               exit;
            }
         }
         
      }

      var htmlele = '';
      for(var j=0;j<product_id_array.length;j++)
      {
         let data = `<div><div class = "items item1">
            <div class="gcontainer">
               <div class="gitem4">
               <div class="gitem2 image"><img src="${products[product_id_array[j]-1].source}"></div>
               <div class="gitem1">${products[product_id_array[j]-1].name}</div>
               <div class="gitem3">
                  <div class="itemOne">Rs<label>${products[product_id_array[j]-1].price}</label></div>
                  <div class="itemTwo"> <button class="nbutton" id="btn-minus-${products[j].id}">-</button><label id="label-${products[j].id}">1</label> <button class="pbutton" id="btn-plus-${products[j].id}" >+</button></div>
               </div>
               <button id="${j}-remove" class="buttons" type="submit" onclick="removeItem('${j}')">Remove from Cart</button>
               </div>
            </div>
         </div>
         </div>`;

          htmlele += data;
      }
      document.getElementById("flex-container").innerHTML += htmlele;

      for(let i=0; i<products.length; i++){
         let label = document.getElementById("label-"+products[i].id);
         document.getElementById("btn-minus-"+products[i].id).onclick = function(e){
            if(label.innerHTML >1)
            {
               label.innerHTML = parseInt(label.innerHTML) - 1;
               let reduceqty = JSON.parse(localStorage.getItem('Users') || []);
               for(var i=0;i<reduceQty.length;i++)
               {
                  if(sessionStorage.getItem('currUserEmail') == reduceqty[i].email)
                  {
                     reduceqty[i].qty[i] -= 1;
                     break;
                  }
               }
               localStorage.setItem('Users',JSON.stringify(reduceqty));
            }
            else{
               window.alert("You cannot reduce the Quantity further Below");
            }
            
         }
         document.getElementById("btn-plus-"+products[i].id).onclick = function(e){
            label.innerHTML = parseInt(label.innerHTML) + 1;
            let reduceqty = JSON.parse(localStorage.getItem('Users') || []);
            for(var i=0;i<reduceQty.length;i++)
               {
                  if(sessionStorage.getItem('currUserEmail') == reduceqty[i].email)
                  {
                     reduceqty[i].qty[i] += 1;
                     break;
                  }
               }
               localStorage.setItem('Users',JSON.stringify(reduceqty));
         }
      }
   }
   else{
      window.alert("Hai");
   }
}

function removeItem(id)
{
   console.log(id);
   let rm = JSON.parse(localStorage.getItem('Users') || []);
   var email = sessionStorage.getItem('currUserEmail');
   for(var i=0;i<rm.length;i++)
   {
      if(email === rm[i].email)
      {
         rm[i].pid.splice(id,1);
         rm[i].qty.splice(id,1);
         break;
         
      }
   }
   localStorage.setItem('Users',JSON.stringify(rm));
   generateCart();
}

function reduceQty(id){
   if(document.getElementById(id).innerHTML > 1){
      document.getElementById(id).innerHTML -= 1 ;
      let reduceqty = JSON.parse(localStorage.getItem('Users') || []);
      for(var i=0;i<reduceQty.length;i++)
      {
         if(sessionStorage.getItem('currUserEmail') == reduceqty[i].email)
         {
            reduceqty[i].qty[id] -= 1;
            break;
         }
      }
      localStorage.setItem('Users',JSON.stringify(reduceqty));
   }
   else{
      window.alert("You cannot reduce the Quantity further Below");
   }
}

function increaseQty(price,id){
   console.log(id);
      // document.getElementById(id).innerHTML = parseInt(document.getElementById(id).innerHTML) + 1;
      // document.getElementById(id).innerHTML = price;
}


function save_and_continue(){
   window.location = 'checkout.html';
}

function checkout()
{
   document.getElementById("tcontainer").innerHTML='';
   var cp = JSON.parse(localStorage.getItem('Users' || []));
   var product = [];
   var quans = [];
   for(var i=0;i<cp.length;i++)
   {
      if(cp[i].email === sessionStorage.getItem('currUserEmail'))
      {
         product = cp[i].pid;
         quans = cp[i].qty;
         break;
      }
   }
   console.log(quans);
   
   var htmle = '';
   for(var j=0;j<product.length;j++)
   {
      let tabledata = `<tr>
      <td data-label="Product Name">${ products[product[j]-1].name }</td>
      <td data-label="Price">${products[product[j]-1].price}</td>
      <td data-label="Quantity">${quans[j]}</td>
      <td data-label="Amount">${parseInt(products[product[j]-1].price) * parseInt(quans[j])}</td>
    </tr>`;

    htmle += tabledata;
    console.log(products[product[j]-1].name);
   }
   document.getElementById("tcontainer").innerHTML += htmle;
}

function logout(){
  /* var n = sessionStorage.length;
while(n--) {
  var key = sessionStorage.key(n);
  if(/curr/.test(key)) {
    sessionStorage.removeItem(key);
  }  
}*/
sessionStorage.removeItem('currUserName');
sessionStorage.removeItem('currUserEmail');
sessionStorage.removeItem('isAuthenticated');
window.location = "product.html";
}
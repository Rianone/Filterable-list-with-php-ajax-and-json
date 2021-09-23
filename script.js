
const modal_up = document.getElementById('modal-update');
const modal_add = document.getElementById('modal-add');
const close = document.getElementById('cross');
const add = document.getElementById("add-primary");
const del = document.getElementById("delete-primary");
var search_bar = document.getElementById("search");
var nam = document.getElementById("name1");
var number = document.getElementById("number1");
var name_up = document.getElementById("name2");
var number_up = document.getElementById("number2");
var up_btn = document.getElementById("update-btn");

close.addEventListener("click", function(){
    modal_up.style.display = "none";
});


window.addEventListener("click",function (evt) {
    if(evt.target == modal_up)
    {
      modal_up.style.display = "none";
    }
});

function verif(name,number) {
    regName = /^[a-zA-Z]{1}[a-zA-Zéè 1-9]{2,}$/;
    regNumber = /^[0-9+ ]{6,20}$/;
    var p = document.querySelectorAll("#invalid");
    var bool = true;
    if(regName.test(name.value))
    {
        p[0].style.display = "none";
        p[1].style.display = "none";
    }
    else
    {
     bool = false;
    p[0].style.display = "block";
    p[1].style.display = "block";
    }

    if(regNumber.test(number.value))
    {
        p[0].style.display = "none";
        p[1].style.display = "none";
    }
    else
    {
    bool = false;
    p[0].style.display = "block";
    p[1].style.display = "block";
    }

    return bool;
}

search_bar.addEventListener("input",function()
{
    modal_add.style.display = "none";
    modal_up.style.display = "none";

    var contact_h2 = document.querySelectorAll('h2');
    var contact_list = document.querySelectorAll('li');
    var contact_divs = document.querySelectorAll('div');
    
    input = search_bar.value.toUpperCase();
    for (let i = 0; i < contact_h2.length; i++) {
        contact_h2[i].style.display = "none";   
    }
    for (let i = 0; i < contact_divs.length; i++) {
        contact_divs[i].style.borderBottom = "none";   
    }
    for (var i = 0,c=contact_list.length;i<c; i++) {
        contact = contact_list[i].innerHTML.toUpperCase();
        if(contact.indexOf(input) > -1)
        {
            contact_list[i].style.display = "block";
        }
        else{
            contact_list[i].style.display = "none";
        }
    } 
});

search_bar.addEventListener("blur",function(){
    var contact_h2 = document.querySelectorAll('h2');
    var contact_divs = document.querySelectorAll('div');

    for (let i = 0; i < contact_h2.length; i++) {
        contact_h2[i].style.display = "block";   
    }
    for (let i = 0; i < contact_divs.length; i++) {
        contact_divs[i].style.borderBottom = "3px blue solid";   
    }
});


var xhr = new XMLHttpRequest();

    xhr.open("GET","contacts.json",true);
    xhr.onload = function() {
        if(this.status == 200)
        {
           

            var contacts_list = JSON.parse(this.responseText);
           
            contacts_list.forEach(element => {
               
                var name = element.name;
                var number = element.number;
                var nom = "";
                var num = "";
                var if_exists = "";

                var lists = document.querySelectorAll('li');

                for (let i = 0; i < lists.length; i++) {
                    const sec = lists[i];
                    var val = sec.firstChild;
                    var next = sec.childNodes[1];
                    num = next.firstChild.nodeValue
                    nom = val.nodeValue;

                    if(name.toUpperCase() == nom.toUpperCase() && number==num)
                    {
                        if_exists = "Contact already exists";
                    }
                }
               
            if(if_exists == ""){

                var position = name[0];
                var main;
                position = position.toUpperCase();
        
                var contacts = document.getElementById("contacts");
                contacts = contacts.childNodes;
                for (let i = 0; i < contacts.length; i++) {
                    if(contacts[i].id == position)
                    {
                        main = contacts[i];
                    }
                }
                
                
                // Creating elements
               var list_elmt = document.createElement("li");
               var p_elmt = document.createElement("p");
               var list_del = document.createElement("button");
               var list_up = document.createElement("button");
        
               list_elmt.innerHTML = name;
               p_elmt.innerHTML = number;
               list_del.innerHTML = "Delete";
               list_del.className = "button";
               list_del.style.transition = "all 0.7s";
               list_up.innerHTML = "Update";
               list_up.className = "button";

        
               list_del.addEventListener("click",function() {
                //   list_elmt.style.display = "none";
                var parent = list_elmt.parentNode;
                parent.removeChild(list_elmt);

                var xhr = new XMLHttpRequest();
           
                    xhr.open("GET","load.php?x=delete&name= &number= &name_init="+element.name+"&num_init="+element.number+"&name_up="+name_up.value+"&num_up="+ number_up.value,true);
                    xhr.onload = function() {
                        if(this.status == 200)
                        {
                            // console.log(this.responseText);
                            list_elmt.style.display = "none";
                            Load_json(this.responseText);
                            alert("Contact deleted");
                        }
                    }
                    
                    xhr.send();
               });
        
               list_up.addEventListener("click",function() {
                
                modal_up.style.display = "flex";
        
                up_btn.addEventListener("click",()=>{

                if(verif(name_up,number_up)){
                   modal_up.style.display = "none";
                    var xhr = new XMLHttpRequest();
           
                    xhr.open("GET","load.php?x=update&name= &number= &name_init="+element.name+"&num_init="+element.number+"&name_up="+name_up.value+"&num_up="+ number_up.value,true);
                    xhr.onload = function() {
                        if(this.status == 200)
                        {
                            // console.log(this.responseText);
                            list_elmt.style.display = "none";
                            Load_json(this.responseText);
                            alert("Contact updated");
                        }
                    }
                    name_up.value = "";
                    number_up.value = "";
                    xhr.send();
                 }
                });  
               
         
               });

               main.appendChild(list_elmt);
               list_elmt.appendChild(p_elmt);
               p_elmt.appendChild(list_del);
               p_elmt.appendChild(list_up); 
            }
            else
            {
                console.log(if_exists);
            }
            });
         
        }
        
    
    }
   
    xhr.send();




del.addEventListener("click",function () {
    var contact_list = document.querySelectorAll('li');
        for (let i = 0; i < contact_list.length; i++) {
            contact_list[i].parentNode.removeChild(contact_list[i]);   
        }
        modal_add.style.display = "none";

        var xhr = new XMLHttpRequest();

        xhr.open("GET","load.php",true);
        xhr.onload = function() {
            if(this.status == 200)
            {
                console.log(this.responseText);
                Load_json(this.responseText);
            }
        }
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send();


});

add.addEventListener("click",function() {
    modal_add.style.display = "flex";
    var add_btn = document.getElementById("add-btn");
    
    
    add_btn.addEventListener('click',function() {

       if(verif(nam,number))
       {
           var nom = nam.value;
           var num = number.value;
           nam.value = "";
           number.value = "";
           modal_add.style.display =  "none";

           var xhr = new XMLHttpRequest();
           var res;
           xhr.open("GET","load.php?x=add&name="+nom+"&number="+num+"&num_init= &name_init= &name_up= &num_up= ",true);
           xhr.onload = function() {
               if(this.status == 200)
               {
                   var res = this.responseText;
                   Load_json(res);
               }
           }
           xhr.send();
       }
    });

});

function Load_json(response) {

    if(response == "")
    {
        var all_li = document.querySelectorAll('li');
        for (let i = 0; i < all_li.length; i++) {
            const element = all_li[i];
            document.removeChild(element);
        }
    }
    else{
        var contacts_list = JSON.parse(response);
           
        contacts_list.forEach(element => {
           
            var name = element.name;
            var number = element.number;
            var nom = "";
            var num = "";
            var if_exists = "";

            var lists = document.querySelectorAll('li');

            for (let i = 0; i < lists.length; i++) {
                const sec = lists[i];
                var val = sec.firstChild;
                var next = sec.childNodes[1];
                num = next.firstChild.nodeValue
                nom = val.nodeValue;

                if(name.toUpperCase() == nom.toUpperCase() && number==num)
                {
                    if_exists = "Contact already exists";
                }
            }
           
        if(if_exists == ""){

            var position = name[0];
            var main;
            position = position.toUpperCase();
    
            var contacts = document.getElementById("contacts");
            contacts = contacts.childNodes;
            for (let i = 0; i < contacts.length; i++) {
                if(contacts[i].id == position)
                {
                    main = contacts[i];
                }
            }
            
            
            // Creating elements
           var list_elmt = document.createElement("li");
           var p_elmt = document.createElement("p");
           var list_del = document.createElement("button");
           var list_up = document.createElement("button");
    
           list_elmt.innerHTML = name;
           p_elmt.innerHTML = number;
           list_del.innerHTML = "Delete";
           list_del.className = "button";
           list_del.style.transition = "all 0.7s";
           list_up.innerHTML = "Update";
           list_up.className = "button";

    
           list_del.addEventListener("click",function() {
            //   list_elmt.style.display = "none";
            var parent = list_elmt.parentNode;
            parent.removeChild(list_elmt);

            var xhr = new XMLHttpRequest();
       
                xhr.open("GET","load.php?x=delete&name= &number= &name_init="+element.name+"&num_init="+element.number+"&name_up="+name_up.value+"&num_up="+ number_up.value,true);
                xhr.onload = function() {
                    if(this.status == 200)
                    {
                            list_elmt.style.display = "none";
                            Load_json(this.responseText);
                            alert("Contact deleted");
                    }
                }
                
                xhr.send();
           });
    
           list_up.addEventListener("click",function() {
            
            modal_up.style.display = "flex";
    
            up_btn.addEventListener("click",()=>{

            if(verif(name_up,number_up)){
               modal_up.style.display = "none";
                var xhr = new XMLHttpRequest();
       
                xhr.open("GET","load.php?x=update&name= &number= &name_init="+element.name+"&num_init="+element.number+"&name_up="+name_up.value+"&num_up="+ number_up.value,true);
                xhr.onload = function() {
                    if(this.status == 200)
                    {
                        list_elmt.style.display = "none";
                        Load_json(this.responseText);
                        alert("Contact updated");
                    }
                }
                name_up.value = "";
                number_up.value = "";
                xhr.send();
             }
            });  
           
     
           });

           main.appendChild(list_elmt);
           list_elmt.appendChild(p_elmt);
           p_elmt.appendChild(list_del);
           p_elmt.appendChild(list_up); 
        }
        else
        {
            console.log(if_exists);
        }
        });
     
    }
 
}

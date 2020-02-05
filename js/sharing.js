firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    s=user.email;
    s=s.slice(0,s.length-10);


  } else {
    // No user is signed in.
  }
  });

  function shared_to(){

    var shared_to_list=[];

    var my_id=s;

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("SAP").
      child(my_id).child("Uploads").child("Shared_To");

    ref.once("value", function(snapshot) {

      shared_to_list=snapshot.val();


      for(v in shared_to_list){

        for(y in shared_to_list[v]){
            
            add_table_row([v,y],shared_to_list[v][y],y);

        }


      }


    }, function (error) {

     });

  }

  function shared_from(){

    var shared_from_list=[];

    var my_id=s;

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("SAP").
      child(my_id).child("Uploads").child("Shared_From");

    ref.once("value", function(snapshot) {

      shared_from_list=snapshot.val();
      //console.log(shared_from_list)

      for(v in shared_from_list){
       //console.log(v)
        for(y in shared_from_list[v]){
          
                //console.log(shared_from_list[v][y])
                
                add_table_row([v,y],shared_from_list[v][y],y);
          


     


      }
    }

    }, function (error) {

     });

  }






    function create_table_header(headers){
      v=`<thead class="text-primary" id="table-head">`

      //v+="<br>";
      for(var i=0;i<headers.length;i++){
        v+="<th>"+headers[i]+"</th>"


      }
      document.getElementById("table").innerHTML=v+"</thead>";
    }

z=0


    function add_table_row(row,url,name){
     z=z+1
     
      name=name.replace("_",".")
      //console.log(url)
      var table_body_ref=document.getElementById("table");
  
      y=""
      row[1]=name
      //id="`+url+`"
      var button=`
      <button type="button"  id ="`+url+`" name="`+name+`"  onclick ="cloudd(this)" class="icon">
        <div class="cloud">
          <div class="puff puff-1"></div>
          <div class="puff puff-2"></div>
          <div class="puff puff-3"></div>
          <div class="puff puff-4"></div>
          <div class="puff puff-5"></div>
          <div class="puff puff-6"></div>
          <div class="puff puff-7"></div>
          <div class="puff puff-8"></div>
          <div class="puff puff-9"></div>
          <div class="puff puff-10"></div>
          <div class="cloud-core"></div>
          <div class="check"></div>
          <div class="arroww">
            <div class="arroww-stem">
              <div class="arroww-l-tip"></div>
              <div class="arroww-r-tip"></div>
            </div>
          </div>
        </div>
        <div class="preload">
          <div class="drop drop-1"></div>
          <div class="drop drop-2"></div>
          <div class="drop drop-3"></div>
        </div>
      
      </button>`
      //html="<tr id ="+url+" name="+name+" onclick=call_ajax(this)>"
      //console.log(row)
      //table_body_ref.innerHTML+=html;
      for(var i=0;i<row.length;i++){
        if(i==1){
        y+=`<td><p id ="`+url+`" name="`+name+`" onclick="call_ajax(this)">`+row[i]+'</p>'+button+'</td>';
        }
        else{
          y+=`<td id ="`+url+`" name="`+name+`" onclick="call_ajax(this)">`+row[i]+'</td>';
        }
      }
     
      table_body_ref.innerHTML+=y;
    
      //table_body_ref.innerHTML+="</tr>";


    }

    function cloudd(reference){
       
      //console.log("hiiiiiiii")
         let waitClass = "waiting",
         runClass = "running",
             cl = reference.classList;
                //console.log(cl)
              if (!cl.contains(waitClass) && !cl.contains(runClass)) {
                //console.log("INside if")
                cl.add(waitClass);
                setTimeout(function(){
                  cl.remove(waitClass);
                  setTimeout(function(){
                    cl.add(runClass);
                    setTimeout(function(){
                      cl.remove(runClass);
                    }, 4000);
                  }, 200);
                }, 1800);
              }
         
       
      var name = $(reference).attr("name");
      var url=$(reference).attr("id");
      //console.log(name,url)
     // 
     pdf=url.split(" ")[1]
      doc_url=url.split(" ")[0];
     // //console.log(doc_url,pdf)
     // q="<iframe src='"+doc_url+"' width='100%' height='100%'>"
     // 
     // document.getElementById("file_content").innerHTML=q;
      //console.log(doc_url)
      var a = document.createElement('A');
      a.href = doc_url;
    2//  a.download = doc_url.substr(doc_url.lastIndexOf("/") + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

//this.querySelector(".icon").addEventListener("click",function(){
//   let waitClass = "waiting",
//   runClass = "running",
//       cl = this.classList;
//          //console.log("Inside cloud!!!!")
//        if (!cl.contains(waitClass) && !cl.contains(runClass)) {
//          cl.add(waitClass);
//          setTimeout(function(){
//            cl.remove(waitClass);
//            setTimeout(function(){
//              cl.add(runClass);
//              setTimeout(function(){
//                cl.remove(runClass);
//              }, 4000);
//            }, 200);
//          }, 1800);
//        }
//      });
//    });



    
    
    }

    this.querySelector(".icon").addEventListener("click",function(){

      //console.log("hiiiiiiii")
         let waitClass = "waiting",
         runClass = "running",
             cl = this.classList;
                //console.log("Inside cloud!!!!")
              if (!cl.contains(waitClass) && !cl.contains(runClass)) {
                cl.add(waitClass);
                setTimeout(function(){
                  cl.remove(waitClass);
                  setTimeout(function(){
                    cl.add(runClass);
                    setTimeout(function(){
                      cl.remove(runClass);
                    }, 4000);
                  }, 200);
                }, 1800);
              }
            });
       
      
    function call_ajax(reference){

      var name = $(reference).attr("name");
      var url=$(reference).attr("id");
      //console.log(name,url)
      
      doc_url=url.split(" ")[0];
      pdf=url.split(" ")[1]
      //console.log(doc_url,pdf)
      q="<iframe src='"+pdf+"' width='100%' height='100%'>"
      document.getElementById("file_content").innerHTML=q;
    
      document.getElementById("file_title").innerHTML=name;
      $('#open_file').modal('show');
    }

    function reset_table(){

        var t=document.getElementById("table");
        t.innerHTML='';


    }







    function load_content(no){
      reset_table();
      create_table_header(["SAP","Document"],no);
      if(no==1){

        shared_from();
      }
      else{

        shared_to();
      }
    }

function openCity(evt, no) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("1").style.display = "block";
    load_content(no);
    evt.currentTarget.className += " active";
}

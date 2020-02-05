
    url = new URL(window.location);
    var doc_type = url.searchParams.get("type");
    var file_to_share;
    var list_of_links = [];
    var name_of_file = [];
    var teacher_individual_doc_list = [];

    //console.log(window.location.href);
    var url=new URL(window.location.href);
    var c = url.searchParams.get("subject");
    // var c=url.searchParams.get("subject");
    // if(c==null){
    //   c="BCE"
    // }
    // c = c.slice(1,c.length-1);
    // //console.log(c);




    var config = {
      apiKey: "AIzaSyAUqEPdNAR9S015OTsA_CBD79kyznEarF0",
      authDomain: "edify-6c876.firebaseapp.com",
      databaseURL: "https://edify-6c876.firebaseio.com",
      projectId: "edify-6c876",
      storageBucket: "edify-6c876.appspot.com",
      messagingSenderId: "15052371556"
    };
    firebase.initializeApp(config);



      // sap=firebase.auth().currentUser.email;
      // var user=sap.slice(0,sap.length-10);
      // firebase.auth().onAuthStateChanged(function(user) {
      // if (user) {
      //   // User is signed in.
      //   var s=user.email;
      //   s=s.slice(0,s.length-10);
      //   var user=s;


      //alert(user);
      var user = "12345678912";
      alert(user);
      var root = new Firebase('https://edify-6c876.firebaseio.com');
  	  var ref=root.child("Department").child("Information Technology").child("TE").child("Teachers_upload").
      child(c).child(doc_type);

      //console.log(user);
      var teacher_sap = root.child("Department").child("Information Technology").child("TE").child("Teacher_SAP").child(user).child("Uploads");
      teacher_sap.once("value",function(snapshot){
        //console.log(snapshot.val());
        teacher_individual_files = snapshot.val();
      });

      // var exp_links = root.child("Department").child("Information Technology").child("TE").child("Teachers_upload").child("Cryptography And Network Security").child("Experiments");
      // link_list = {};
      // exp_links.once("value",function(snapshot){

      //   links = snapshot.val();

      //   for(link in links){
      //     link_list[link] = links[link];
      //   }

      // });



      ref.once("value",function(snapshot){

          data = snapshot.val();
          var no = data.length;
          if(no==0){
              //console.log("NO docs");
          }
          else{
            //console.log("reached here in else");
              for(x in data){
                  link = data[x];
                  name_of_file.push(x);
                  //console.log("x = = =",x);
                  //console.log("data[x] = = ",data[x]);

                  document.getElementById("wrapper").innerHTML+=`<div class="menu">
                  <div class="title" >`+x+`<div class="wrapper_button">
                  <div class="file-upload"><input id="document" name=`+x+` type="file" oninput="retrieve_path_to_file(this)"><i class="fa fa-arrow-up"></i>
                  </div></div><div style="position:absolute;right:10px;top:20px;" onclick="f(this)" name=`+x+`><span  class="fa fa-bars"></span></div>
                  <div class="arrow"></div>
                  </div><div class="dropdown1" style="overflow:hidden;">
                  `+getdata(x,data[x])+`</div></div>`;
                  }
          }

      },function(error){

      });


    // } else {
    //   // No user is signed in.
    // }
    // });

      function openmodal(){

        //console.log("modal load tha ne");
        $('#dialog_form').dialog(
        {
            open: function() {
                $(this).load('./face.py');
            },
            modal: true
        }
        );
        $('#dialog-form').dialog('open');

      }
      function f(name) {
      // //console.log(name);

      // //console.log($(name).attr('name'));
      var counter;
      var n = $(name).attr('name');
      // //console.log(name_of_file);
      for(i=0;i<name_of_file.length;i++){
        if(n==name_of_file[i])
            {
              var ind = name_of_file[i];
              counter=i;
              var pad="";
              //console.log("##################################################");
              //console.log(document.getElementsByClassName('dropdown1')[counter]);
              if(document.getElementsByClassName('dropdown1')[counter].innerHTML.replace(/\s+/, "").length!=0){
              document.getElementsByClassName('dropdown1')[counter].classList.toggle('down');
              document.getElementsByClassName('arrow')[counter].classList.toggle('gone');
              if (document.getElementsByClassName('dropdown1')[counter].classList.contains('down')) {
                setTimeout(function() {
                  document.getElementsByClassName('dropdown1')[counter].style.overflow = 'visible'
                }, 500)
                pad = "top";
              } else {
                document.getElementsByClassName('dropdown1')[counter].style.overflow = 'hidden'
                pad = "bottom";
              }
            }
            addpadding(pad,i+1,name_of_file.length,ind);
            break;
            }

      }
      }
      function addpadding(pad,j,length,ind){
        //console.log("-----------------------------");
        //console.log(teacher_individual_files);
        //console.log("/////////////////////////////");
        //console.log("ind = ",ind);
        //console.log(teacher_individual_files[ind]);
        //console.log(pad,j,length,Object.keys(teacher_individual_files[ind]).length);
        k = j-1;
        total_no_of_file_length = Object.keys(teacher_individual_files[ind]).length;  
        //console.log("total files = ",total_no_of_file_length);
        if(pad=="top"){
        //console.log("top*************&&&&&&&&&&&&&&&&&&&");
            px_val = String(50*total_no_of_file_length+40)+"px";
            document.getElementsByClassName('menu')[k].style["margin-bottom"] = px_val;
        }
        else if(pad=="bottom"){
            document.getElementsByClassName('menu')[k].style["margin-bottom"] = "0px";   
        }
      }

      function call_ajax(url){

        // alert(url);
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {

                  // alert(this.responseText);
                  q=this.responseText.replace(/\n/g, "<br />");
                  document.getElementById("file_content").innerHTML=q;
                  //$("#file_content").val(""+this.responseText);
                  document.getElementById("file_title").innerHTML="face.py";
                  $('#open_file').modal('show');

             }
          };
          xhttp.open("GET", "fac.txt", true);
          xhttp.setRequestHeader('Accept', 'text/plain');
          xhttp.send();
        // $.ajax({
        //   url: "./js/teacher_first.js",
        //   contentType: "*/*",
        //   crossOrigin: true,
        //   success: function(result){
        //           //$("#div1").html(result);
        //           alert(result)
        //       },error:function(error){
        //
        //         alert("error")
        //         //console.log(error)
        //
        //       }});
      }//getting data for dropdown
      function getdata(x,files){
      
        // droplist = "";
        // for(y in files){
        //   g=y.replace(/[&\/\\#,+()$~%'":*?<>{} ]/g, '');
        //   droplist+=`<p>`+y+`<span name=`+g+` onclick="Sharedoc(this)" class="fa fa-inbox"></span></p><div><input id=`+g+` class="Share" type="text"></div>`;
        //   list_of_links[g]=files[y];
        // }
      
        // //console.log("list = ",list_of_links);
        // return droplist;
        //console.log(x,files)
        d = "";
          for(t_sap in teacher_individual_files[x]){
          //console.log("t_sap = ",t_sap);
          g = t_sap.replace(/[&\/\\#,+()$~%'":*?<>{} ]/g, '')
          teacher_individual_doc_list[t_sap] = teacher_individual_files[x][t_sap];
          //console.log(teacher_individual_doc_list);
          list_of_links[g]=files[t_sap];
          //console.log()
         
          
          d+=`<div  id="p1"><p style="display:inline" name="`+t_sap+`" id="`+teacher_individual_doc_list[t_sap]+`" onclick="call_ajax(this)">`+t_sap.replace("_",".")+`
          </p>
              <span>  
            <button type="button" id="`+teacher_individual_doc_list[t_sap]+`" onclick ="cloudd(this)" class="icon">
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
            <div class="progress"></div>
          </button>
          
          </span>
          
          <span>       
          <i name="`+t_sap+`?`+teacher_individual_doc_list[t_sap]+`" onclick="Sharedocument(this)" class="material-icons">share</i></span>&nbsp;
          </div>`;
          //<input id=`+g+` class="Share" type="text">
          }
      
          //console.log("d =",d);
          //console.log("list = ",list_of_links);
          return d;
      
      }
      
      function Sharedocument(name_and_url){

       //console.log($(name_and_url).attr('name'));
       var name_and_url = $(name_and_url).attr('name');
       file_to_share = name_and_url.split('?');
       //console.log(file_to_share);

        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {

                  $('#myModal').modal('show');

             }
          };
          xhttp.open("GET", "", true);
          xhttp.send();

      }
function retrieve_path_to_file(name){

      //console.log("name = ",name);

      //console.log("upload called");

      var a=document.getElementById("document");
      //console.log(a.files.length);

      for(i=0;i<a.files.length;i++){

          //console.log(a.files[i]);
          upload(a.files[i],name);
      }
      //console.log("Sending",a.files[i]);

      //console.log("End of script");
}

function share_btn_click() {

  var sap_to_share = document.getElementById("sap_to_share").value;
  var sharing_id = sap_to_share.split(',');


  var doc_name=file_to_share[0];
  var doc_url=file_to_share[1];

  for(i=0;i<sharing_id.length;i++){
    sharing_id[i] = sharing_id[i].replace(/[&\/\\#,+()$~%'":*?<>{} ]/g, '');
    //console.log("sharing_id[i]",sharing_id[i]);
    //console.log(doc_name,doc_url);
    var ref2 = new Firebase('https://edify-6c876.firebaseio.com');
    firebase.database().ref("Department/Information Technology/TE/SAP/"+user+"/Uploads/Shared_To/"+sharing_id[i]+"/"+doc_name).set(doc_url);
    firebase.database().ref("Department/Information Technology/TE/SAP/"+sharing_id[i]+"/Uploads/Shared_From/"+user+"/"+doc_name).set(doc_url);
  }
  var x = document.getElementById("sap_to_share");
  x.value="";

}

function upload(file_to_upload,experiment_name){

      // File or Blob named mountains.jpg
      //console.log(file_to_upload);
      var file = file_to_upload;

      // Create the file metadata
      // var metadata = {
      //   contentType: ('image/jpeg','html')
      // };

      // var storage=firebase.storage();
      // //console.log("Storage",storage);
      var ref = firebase.storage();
      var storageRef = firebase.storage().ref('/uploads/');

      // Upload file and metadata to the object 'images/mountains.jpg'
      //console.log("file = "+file);
      //console.log("ref = "+'uploads/SAP/'+user+''+ file.name);
      var uploadTask = storageRef.child('SAP/'+user+'/individual_files/'+ file.name).put(file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          //console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          //console.log('Upload is running');
          break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //console.log('File available at', downloadURL);

    var filename = file.name;
    filename = filename.replace('.','_');
    //console.log("filename = ",filename);

    // var ref=root.child("Department").child("Information Technology").child("TE").child("SAP").child(user).
    // child("Uploads").child(c).child(experiment_name).child(filename).set(downloadURL);

    firebase.database().ref("Department/Information Technology/TE/Teacher_SAP/"+user+"/Uploads/"+experiment_name+"/"+filename).set(downloadURL);

  });
});


      // Listen for state changes, errors, and completion of the upload.
      /*uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              //console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              //console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;



          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //console.log('File available at', downloadURL);
        });
      });

      */
      //console.log("Upload Complete");

}

function open(){

  $("#upfile1").click(function(){
    $("#document").trigger('click');
  });
}

function opendocument(link){
  //console.log(link);
  document.body.innerHTML+=`<object width="400" height="50" data="face.py"></object>`;
}


function cloudd(reference){
  
  var name = $(reference).attr("name");
  var url=$(reference).attr("id");
  //console.log(name,url)
  
  doc_url=url.split(" ")[0];
  pdf=url.split(" ")[1]
//console.log(doc_url,pdf)
  q="<iframe src='"+doc_url+"' width='100%' height='100%'>"
  document.getElementById("file_content").innerHTML=q;

 

  document.getElementById("file_title").innerHTML=name;
  $('#open_file').modal('show');


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
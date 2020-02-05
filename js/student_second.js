
    var name_of_exp = [];
    var list_of_links = [];
    var name_of_file = [];
    teacher_individual_doc_list = [];
    var file_to_share;
    //console.log(window.location.href);
    var url=new URL(window.location.href);
    var c=url.searchParams.get("subject");
    var doc_type = url.searchParams.get("type");    // type of doc which will come from previous page
    //console.log("doc_type = ",doc_type);
    //console.log("c = ",c);
    if(c==null){
      c="Business Communication And Ethics"
    }
    // c = c.slice(1,c.length-1);
    //console.log(c);

    var config = {
      apiKey: "AIzaSyAUqEPdNAR9S015OTsA_CBD79kyznEarF0",
      authDomain: "edify-6c876.firebaseapp.com",
      databaseURL: "https://edify-6c876.firebaseio.com",
      projectId: "edify-6c876",
      storageBucket: "edify-6c876.appspot.com",
      messagingSenderId: "15052371556"
    };
    firebase.initializeApp(config);
    var user = "60003160032";
    // firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // var s=user.email;
      // s=s.slice(0,s.length-10);
      // user=s;



    //var user = "60003160032";


    var root = new Firebase('https://edify-6c876.firebaseio.com');
	  // var ref=root.child("Department").child("Information Technology").child("TE").child("SAP").child(user).
    // child("Uploads").child("Cryptography And Network Security");

    var ref=root.child("Department").child("Information Technology").child("TE").child("Teachers_upload").
    child(c).child(doc_type);

    var teacher_sap = root.child("Department").child("Information Technology").child("TE").child("SAP").child(user).child("Uploads").child(c);
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
    //   //console.log("link_list = ",link_list);

    // });


    ref.once("value", function(snapshot) {

      data=snapshot.val();

      var no_of_exp=data.length;

      var j=0;
      if(no_of_exp==0){

        //console.log("There are no files");
      }
      else{

      for(x in data){

        //console.log("x***********************",x);
        //console.log("data[x]-----------------",data[x]);
        name_of_exp.push(x);
        // <label for="input-file"><img src="plus.jpg" height="20px" width="20px"></label>
        document.getElementById("wrapper").innerHTML+=`<div class="menu">
        <div class="title" >`+x+`<div class="wrapper_button">
        <div class="file-upload"><input id="document" name=`+x+` type="file" oninput="retrieve_path_to_file(this)"><i class="fa fa-arrow-up"></i>
        </div></div><div style="position:absolute;right:10px;top:20px;" onclick="f(this)" name=`+x+`><span  class="fa fa-bars"></span></div>
        <div class="arrow"></div>
        </div><div class="dropdown1" style="overflow:hidden;">
        `+getdata(x,data[x])+`</div></div>`;


        // document.getElementById("wrapper").innerHTML+=`<div class="menu">
        // <div class="title" name=`+x+` onclick="f(this)">`+x+`
        //
        // <input id="input-file" name=`+x+` type="file" oninput="retrieve_path_to_file(this.name)">
        // <span class="fa fa-bars"></span>
        // <div class="arrow"></div>
        // </div>
        // <div class="dropdown">
        // `+getdata(x,data[x])+`</div></div>`;
      }
      // document.body.innerHTML+=`<div class="wrap">
      //   <button class="js-open btn-open is-active">Show modal</button>
      //   <div class="modal js-modal">
      //     <div class="modal-image">
      //       <svg viewBox="0 0 32 32" style="fill:#48DB71"><path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path></svg>
      //     </div>
      //     <h1>Nice job!</h1>
      //     <p>To dismiss click the button below</p>
      //     <button class="js-close">Dismiss</button>
      //   </div>
      // </div>`;
    }


}, function (error) {

});
} else {
  //console.log("not signed in");
  // No user is signed in.
}
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


// getting data for dropdown

// getting data for dropdown
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
  //console.log(teacher_individual_files[x])
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

function send_data_to_flask(file,c,experiment_name){
  //console.log("Inside Send Data")
  //console.log(file);
  var formData = new FormData();
  // //console.log(document.getElementById("document"+experiment_name).files[0])
  // document.getElementByClassName("document"+experiment_name).files[0]
  formData.append('user_file',file,file.name)
  // formData.append('string','value');
  for (var key of formData.entries()) {
     //console.log(key[0] + ', ' + key[1]);
 }
  var request = new XMLHttpRequest();

  // //console.log(formData['user_file']);
  //console.log(formData)
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText)

      path=this.responseText;
      //console.log("Response Text=",this.responseText);

      create_file_object_pdf(path,c);




      // //console.log("pdf_download_url=",pdf_download_url);



    }
  };
  request.open("POST", "http://127.0.0.1:5000/hello");
  request.send(formData);
  // var xhttp;
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     //console.log(this.responseText)
  //     path=this.responseText;
  //     pdf_download_url=create_file_object_pdf(path,c);
  //
  //   }
  // };
  // xhttp=new XMLHttpRequest();
  // xhttp.open("GET", "/home/raj/Desktop/after_conversion/t.pdf", true);
  // xhttp.send();


}
var temp_var="";
function create_file_object_pdf(path,c){


  var getFileBlob = function (url, cb) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.addEventListener('load', function() {
              cb(xhr.response);
          });
          xhr.send();
  };

  var blobToFile = function (blob, name) {
          blob.lastModifiedDate = new Date();
          blob.name = name;
          return blob;
  };

  var getFileObject = function(filePathOrUrl, cb) {
         getFileBlob(filePathOrUrl, function (blob) {
           var slash_index=filePathOrUrl.lastIndexOf("/");
           var name=filePathOrUrl.substring(slash_index+1,filePathOrUrl.length);
            cb(blobToFile(blob, name));
         });
  };

  getFileObject(path, function (fileObject) {
       //console.log(fileObject);
       //console.log(fileObject.name);
       var file=fileObject;
       var ref = firebase.storage();
        var storageRef = firebase.storage().ref('/uploads/');

        // Upload file and metadata to the object 'images/mountains.jpg'
        //console.log("file = "+file);
        //console.log("ref = "+'uploads/SAP/'+user+'/'+ file.name);
        // var c="Business Communication and Ethics"
        var uploadTask = storageRef.child('SAP/'+user+'/Subjects/'+c+'/'+ file.name).put(file);

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
      window.temp_var=downloadURL


      //console.log(window.temp_var);
      // var rf = firebase.database().ref("Department/Information Technology/TE/SAP/"+user+"/Uploads/"+c+"/"+experiment_name+"/"+filename).set(downloadURL);

    });
  });



        //console.log("Upload Complete");

  });



}

function call_ajax(reference){

  var name = $(reference).attr("name");
  var url=$(reference).attr("id");
  //console.log(name,url)
  alert(name,url)
  doc_url=url.split(" ")[0];
  pdf=url.split(" ")[1]
//console.log(doc_url,pdf)
document.getElementById("file_title").innerHTML=name.replace("_",".");
  q="<iframe src='"+pdf+"' width='100%' height='100%'>"
  document.getElementById("file_content").innerHTML=q;

  
  $('#open_file').modal('show');
}


function Sharedoc(file_id){
  var id = $(file_id).attr('name');
  //console.log("id = ",id);
  var ids = document.getElementById(id);
  //console.log(ids);
  var values = document.getElementById(id).value;
  var sharing_id = values.split(',');


  var doc_name=id;
  var doc_url=teacher_individual_doc_list[id];

  for(i=0;i<sharing_id.length;i++){
    sharing_id[i] = sharing_id[i].replace(/[&\/\\#,+()$~%'":*?<>{} ]/g, '');
    //console.log("sharing_id[i]",sharing_id[i]);
    //console.log(doc_name,doc_url);
    var ref2 = new Firebase('https://edify-6c876.firebaseio.com');
    firebase.database().ref("Department/Information Technology/TE/SAP/"+user+"/Uploads/Shared_To/"+sharing_id[i]+"/"+doc_name).set(doc_url);
    firebase.database().ref("Department/Information Technology/TE/SAP/"+sharing_id[i]+"/Uploads/Shared_From/"+user+"/"+doc_name).set(doc_url);
    // ref2.child("Department").child("Information Technology").child("TE").child("SAP").
    // child(user).child("Uploads").child("Shared_To").child(sharing_id[i]).child(doc_name).set(doc_url);

    // ref2.child("Department").child("Information Technology").child("TE").child("SAP").
    // child(sharing_id).child("Uploads").child("Shared_From").child(user).child(doc_name).set(doc_url);

  }

}

// function openmodal(){
//
//   $('.button').click(function(){
//   var buttonId = $(this).attr('id');
//   $('#modal-container').removeAttr('class').addClass(buttonId);
//   $('body').addClass('modal-active');
//     })
//
//   $('#modal-container').click(function(){
//     $(this).addClass('out');
//     $('body').removeClass('modal-active');
//     $('.modal').style.display="none";
//     });
// }

// f() called on clicking dropdown
function f(name) {
  //console.log("hiiiiiiiiiiiiiiii")
  //console.log(name);

  //console.log($(name).attr('name'));
  var counter;
  var n = $(name).attr('name');
  //console.log("name = ",name_of_exp);
  for(i=0;i<name_of_exp.length;i++){
    if(n==name_of_exp[i])
        {
          var ind = name_of_exp[i];
          //console.log("+++++++++++++++",name_of_exp[i]);
          counter=i;
          var pad="";
          //console.log("##################################################");
          //console.log("counter = ",counter);
          //console.log(document.getElementsByClassName('dropdown1'));
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
        addpadding(pad,i+1,name_of_exp.length,ind);
        check=true;
        break;
        }
        //console.log("end of loop");
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

function retrieve_path_to_file(reference){

      //console.log("reference = ",reference);

      //console.log("upload called");
      var name = $(reference).attr("name");
      //console.log("name = ",name);

      //console.log(reference.files.length);

      for(i=0;i<reference.files.length;i++){

          //console.log(reference.files[i]);
          upload(reference.files[i],name);
      }
      //console.log("Sending",reference.files[i]);

      //console.log("End of script");
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
      var underscore_index=file.name.lastIndexOf(".");
      var doc_type=file.name.substring(underscore_index+1,file.name.length);
      alert(doc_type);
      if(doc_type=="docx"){

        //Convert to pdf
        send_data_to_flask(file,c,experiment_name);
        var uploadTask = storageRef.child('SAP/'+user+'/Subjects/'+c+'/'+ file.name).put(file);

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
      //console.log(user,c,experiment_name);

      setTimeout(function(){ //console.log(window.temp_var);
      var rf = firebase.database().ref("Department/Information Technology/TE/SAP/"+user+"/Uploads/"+c+"/"+experiment_name+"/"+filename).set(downloadURL+" "+window.temp_var);
      }, 1500);


    });
  });

      }
      else{

        var uploadTask = storageRef.child('SAP/'+user+'/Subjects/'+c+'/'+ file.name).put(file);

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

      var rf = firebase.database().ref("Department/Information Technology/TE/SAP/"+user+"/Uploads/"+c+"/"+experiment_name+"/"+filename).set(downloadURL);

    });
  });



      }
      //console.log("Upload Complete");

}

function open(){

  // $("#upfile1").click(function(){
  //   $("#document").trigger('click');
  // });
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
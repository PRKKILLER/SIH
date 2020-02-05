

        url = new URL(window.location);
        var subject = url.searchParams.get("subject");

        alert(subject);
        //var subject = "Business Communication And Ethics";// will come from auth
        var types_of_documents = [];
        var name_of_files = {};
        var file_links = {};
        var colors = ["Red","Brown","Amber","Cyan","Indigo","Green","yellow","Orange"];
        var config = {
        apiKey: "AIzaSyAUqEPdNAR9S015OTsA_CBD79kyznEarF0",
        authDomain: "edify-6c876.firebaseapp.com",
        databaseURL: "https://edify-6c876.firebaseio.com",
        projectId: "edify-6c876",
        storageBucket: "edify-6c876.appspot.com",
        messagingSenderId: "15052371556"
        };
        firebase.initializeApp(config);


          firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            sap=user.email;
        		var user=sap.slice(0,sap.length-10);

            var root = new Firebase('https://edify-6c876.firebaseio.com');

            var ref = root.child("Department").child("Information Technology").child("TE").child("Teachers_upload").child(subject);

            ref.once("value", function(snapshot) {

                var data = snapshot.val();
                //console.log("data = ",data);

                for(z in data){

                    //console.log("types_of_documents = ",z); //types_of_documents(eg. Experiments)
                    types_of_documents.push(z);
                    var val=z;
                    name_of_files[val] = new Array();
                    file_links[val] = new Array();


                    for(y in data[z]){
                        //console.log("filename = ",y); // name of file
                        //console.log("link = ",data[z][y]); //file link


                        name_of_files[val].push(y);
                        file_links[val].push(data[z][y]);

                    }
                }

                populate_cards();

            });


          } else {
            // No user is signed in.
          }
        });



          //alert(user);





                  function retrieve_path_to_file(doc_type){



                      for(t in types_of_documents){
                          var m = document.getElementById(types_of_documents[t])
                          //console.log("m = ",m);
                          //console.log(m.files.length);
                          if(m.files.length){
                              var doc = types_of_documents[t];
                              break;
                          }
                      }


                      upload(m.files,doc);


                      }

                      function upload(file_to_upload,document_type){

                          // File or Blob named mountains.jpg
                          //console.log(file_to_upload);
                          var file = file_to_upload;
                          var blob = new Blob(file_to_upload, { type:"mime" });

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
                          var uploadTask = storageRef.child('SAP/'+user+'/'+document_type+'/'+ $(file_to_upload).attr('name')).put(blob);


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

                          var filename = $(file_to_upload).attr('name');
                          filename = filename.replace('.','_');
                          //console.log("filename = ",filename);

                          firebase.database().ref("Department/Information Technology/TE/Teachers_upload/"+subject+"/"+document_type+"/"+filename).set(downloadURL);

                          });
                          });

                          //console.log("Upload Complete");

                      }


        function populate_cards(){

            //console.log("name_of_files = ",name_of_files);
            //console.log("file_links = ",file_links);
        


            //console.log("types_of_documents.length = ",types_of_documents.length);
            for(i=0;i<types_of_documents.length;i++){

                //var types_of_document = types_of_documents[i];
   //             //console.log("type= ",types_of_document);
     //           val=types_of_document;
                //console.log("-----------------------");
       //         //console.log("val is=",val);
                //console.log(types_of_documents[i]);
                var root = document.getElementsByClassName("row active-with-click")[0];
                root.innerHTML+=`<div class="col-md-4 col-sm-6 col-xs-12">
                <article  class="material-card `+colors[i]+`">
                    <h2>
                        <span style="cursor:pointer"onclick="load('`+types_of_documents[i]+`')">`+types_of_documents[i]+`</span>
                        <strong>
                            some small message
                        </strong>
                    </h2>
                    <div class="mc-content">
                        <div class="mc-description">`+getData(types_of_documents[i])+`</div>
                    </div>

                    <div class="image-upload">
                        <label for="`+types_of_documents[i]+`">
                       

                            <a class="mc-btn-action">
                            <div class="wrapper_button">
                            <div class="file-upload">
                              <input type="file" id="`+types_of_documents[i]+`" name="`+types_of_documents[i]+`" oninput="retrieve_path_to_file()"/>
                              <i class="fa fa-arrow-up"></i>
                            
                              </div>
                            </div>
                            <i class="glyphicon glyphicon-plus"></ i>
                            </a>
                        </label>

                      
                    </div>

                </article>
            </div>`;


            //                 root.innerHTML+=`<div class="col-md-4 col-sm-6 col-xs-12">
            //     <article class="material-card `+colors[i]+`">
            //         <h2>
            //             <span>`+types_of_documents[i]+`</span>
            //             <strong>
            //                 some small message
            //             </strong>
            //         </h2>
            //         <div class="mc-content">
            //             <div class="mc-description">`+getData(types_of_documents[i])+`</div>
            //         </div>

            //         <div class="image-upload">
            //             <label for="document">
            //                 <a class="mc-btn-action">
            //                     <i class="glyphicon glyphicon-plus"></ i>
            //                 </a>
            //             </label>

            //             <input type="file" id="document" name="`+types_of_documents[i]+`" oninput="retrieve_path_to_file(`+i+`)"/>
            //         </div>

            //     </article>
            // </div>`;

            //console.log(root.innerHTML);
            }

        }


        function itemclicked(){

            var root = document.getElementsByClassName("row active-with-click")[0];
            //console.log("root = /////////////////////////",root.innerHTML);


            $(".Experiments").click(function(){
                    alert(types_of_documents[t]);
            });

            for(t in types_of_documents){
                // //console.log("--------------",types_of_documents[t]);
                var x = document.getElementsByName(types_of_documents[t])[0];
                // //console.log("+++++++++++++++++++++++++++++++++++++");
                // //console.log(x);

                try{
                    document.getElementsByName(types_of_documents[t])[0].onclick=function(){
                        //console.log("clicked = ",types_of_documents[t]);
                    }
                }
                catch(e){

                }

                // if(x){
                //     alert(t);
                // }
                $(t).click(function(){
                    alert(types_of_documents[t]);
                });
            }
        }

        function getData(type){
            //console.log("getData called");
            var a="";
            //console.log("name = =", name_of_files[type][0]);
            //console.log("name.length = ",name_of_files[type].length);
            for(j=0;j<name_of_files[type].length;j++){
                a+=name_of_files[type][j]+"<br>";
            }
            return a;
        }

var config = {
  apiKey: "AIzaSyAUqEPdNAR9S015OTsA_CBD79kyznEarF0",
  authDomain: "edify-6c876.firebaseapp.com",
  databaseURL: "https://edify-6c876.firebaseio.com",
  projectId: "edify-6c876",
  storageBucket: "edify-6c876.appspot.com",
  messagingSenderId: "15052371556"
};
firebase.initializeApp(config);
ref=new Firebase('https://edify-6c876.firebaseio.com');

// Initialize Firebase
setTimeout(function(){

  alert(firebase.auth().currentUser.email)
},10000);
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    s=user.email;
    loginid=s.slice(0,s.length-10);


  } else {
    // No user is signed in.
    //alert("You need to login first");
  }
  });




// Initialize Firebase
//loginid=60003160021

/* -----------------------------------------------------
  Material Design Buttons
  https://codepen.io/rkchauhan/pen/NNKgJY
  By: Ravikumar Chauhan
  Find me on -
  Twitter: https://twitter.com/rkchauhan01
  Facebook: https://www.facebook.com/ravi032chauhan
  GitHub: https://github.com/rkchauhan
  CodePen: https://codepen.io/rkchauhan
-------------------------------------------------------- */
$(document).ready(function() {
  $('.ripple-effect').rkmd_rippleEffect();
});

(function($) {
  $.fn.rkmd_rippleEffect = function() {
    var btn, self, ripple, size, rippleX, rippleY, eWidth, eHeight;

    btn = $(this).not('[disabled], .disabled');

    btn.on('mousedown', function(e) {
      self = $(this);

      // Disable right click
      if(e.button === 2) {
        return false;
      }

      if(self.find('.ripple').length === 0) {
        self.prepend('<span class="ripple"></span>');
      }
      ripple = self.find('.ripple');
      ripple.removeClass('animated');

      eWidth = self.outerWidth();
      eHeight = self.outerHeight();
      size = Math.max(eWidth, eHeight);
      ripple.css({'width': size, 'height': size});

      rippleX = parseInt(e.pageX - self.offset().left) - (size / 2);
      rippleY = parseInt(e.pageY - self.offset().top) - (size / 2);

      ripple.css({ 'top': rippleY +'px', 'left': rippleX +'px' }).addClass('animated');

      setTimeout(function() {
        ripple.remove();
      }, 800);

    });
  };
}(jQuery));
  //var firebase=require('firebase');


/*
  function initial(){
  databaseref=ref.ref()
  var data=databaseref.child('Department/').child('Information Technology/').child('TE/').child('SAP/');
    var p=60003160001

   console.log("updated",p)
   dt=data.child(p+'/').child("Resume");
   dt.setValue(null)
    //data.child("Resume").once()
   dt
  }*/


Vue.component('toggle-button', {
  template: '\n    <a href="#"\n       role="checkbox"\n       class="button toggle-button"\n       :class="{\'is-selected\': isSelected}"\n       @click="toggle($event)"\n    >\n        <i class="fa fa-check"></i>\n        <span v-html="text"></span>\n    </a>\n  ',



  data: function data() {
    return {
      isSelected: this.selected ? this.selected : false

    };

  },

  props: ['text', 'selected', 'value'],
  methods: {
    toggle: function toggle($event) {

      this.isSelected = !this.isSelected;

      this.$emit('toggle', {
        selected: this.isSelected,
        value: this.value

      });


      $event.preventDefault();
    } },

  watch: {
    selected: function selected(newVal) {

       if(newVal==true ){
        this.isSelected = newVal;
       }

      this.isSelected = newVal;
    } } });



Vue.component('select-list', {
  template: '\n<div class="select-list-wrapper">\n  <header class="select-list-actions is-clearfix">\n      <p class="control" v-if="selectedOptions.length > 0"> \n        <a href="#" role="button" class="button is-link" @click="clear"> Clear selected </a>\n      </p>\n      <p class="control"> \n        <input class="input" v-model="filterText" type="text" placeholder="Filter list" id="input">\n      </p>\n  </header>\n  <div class="select-list" v-if="filteredOptions.length > 0">\n    <toggle-button\n            v-for="option in filteredOptions"\n            :text="option.label"\n            :value="option.value"\n            :selected="option.selected"\n            class="select-item"\n            @toggle="onToggle($event)"\n            ></toggle-button>\n  </div>\n  <div v-else>No items to display</div>\n</div>\n  ',



  data: function data() {
    return {
      filterText: '',
      selectedOptions: this.selected };

  },
  props: ['options', 'selected'],
  methods: {
    onToggle: function onToggle(option) {

      if (option.selected) {

        this.selectedOptions.push(option.value);
      } else {

        this.selectedOptions.splice(this.selectedOptions.indexOf(option.value), 1);
      }

      this.$emit('change', {
        changed: option,
        selected: this.selectedOptions
      });

    },
    clear: function clear() {
      this.selectedOptions = [];
      this.$emit('change', {
        changed: null,
        selected: [] });

    } },

  computed: {
    filteredOptions: function filteredOptions() {var _this = this;
      var visibleOptions = [],
      filterText = this.filterText.trim().length > 0 ? this.filterText.toLowerCase() : null;

      if (filterText) {

        visibleOptions = this.options.filter(function (option) {
          var optWords = option.split(' ');

          return optWords.some(function (word) {
            return word.toLowerCase().indexOf(filterText) === 0;
          });
        });

      } else {

        visibleOptions = this.options;
      }

      return visibleOptions.map(function (option) {
        var label = '';

        if (filterText) {
          var searchStartIndex = option.toLowerCase().indexOf(filterText),
          filterPart = option.substring(searchStartIndex, searchStartIndex + filterText.length);

          label = option.replace(filterPart, '<b>' + filterPart + '</b>');
        } else {
          label = option;
        }

        return {
          value: option,
          label: label,
          selected: _this.selectedOptions.includes(option) };

      });
    } } });



Vue.component('select-dropdown', {
  template: '\n<div class="select-dropdown">\n  <a href="#"\n    role="button"\n    class="button is-primary"\n    @click="toggle($event)"\n  >\n {{buttonText}}\n  </a>\n  <transition name="slide-fade">\n      <div class="select-dropdown-panel card arrow-box" v-show="panelOpen">\n        <select-list\n          ref="selectList"\n          :options="options"\n          :selected="selected"\n          @change="onChange($event)"\n          >\n       \n      </select-list>\n      </div>\n  </transition>\n</div>\n  ',




  data: function data() {
    return {
      panelOpen: true,
      buttonText: this.label + ' ' + this.placeholder };

  },
  props: ['options', 'selected', 'label', 'placeholder'],
  methods: {
    toggle: function toggle() {
      this.panelOpen = !this.panelOpen;
    },
    onChange: function onChange(event) {
       console.log(event.selected)
      setselected(event)

      this.setButtonText(event.selected);
      this.$emit(event);
    },
    setButtonText: function setButtonText(selectedOptions) {

      if (selectedOptions.length === 0) {

        this.buttonText = this.label + ' ' + this.placeholder;
      } else {
        var text = this.placeholder.charAt(0).toUpperCase() + this.placeholder.slice(1) + ': ' + selectedOptions[0];

        if (selectedOptions.length > 1) {
          text += ' & ' + (selectedOptions.length - 1) + ' more';
        }

        this.buttonText = text;
      }
    } } });



new Vue({
  el: '#app',
  template: '\n    <nav class="nav">\n\n  <div class="nav-center">\n    <select-dropdown\n          :options="brands"\n          :selected="selectedBrands"\n          @change="onChange($event)"\n          label="Select"\n          placeholder="Skill:"\n        class="nav-item"\n      >\n      </select-dropdown>\n  </div>\n  ',


  data: {
    brands: ["Machine Learning", "Business Analysis", "Blockchain", "Communication", "Data Analyst", "Web Development","Android Development","Marketing","Management","Time Management","Leadership","Adaptability","Teamwork","Cloud Computing","IOS Development","Graphic Design","Creativity","Self Motivation","SQL","JAVA"],
    selectedBrands: [] },

  methods: {
    onChange: function onChange(changed) {


    } } });
var nm=0;
j=0

    //error checking
function retrieve_path_to_file(){
  var a=document.getElementById("avatar");
  document.getElementById("warning").innerHTML=" "
  var data=ref.child('Department/').child('Information Technology/').child('TE/').child('SAP/').child(loginid+'/').child("Resume");
     data.once('value').then(function(snapshot){

                if(a.files.length=="0"){
                  document.getElementById("warning").innerHTML="Choose A File ";
             }

              else if(arrayofskill.selected==null){
                document.getElementById("warning").innerHTML="Choose A Skill";
              }

              else if(a.files.length >"1" ){
                document.getElementById("warning").innerHTML="Can Upload only one file"
             }

             else if(snapshot.val!=null){

             var r = confirm("You have already uploaded a Resume Click ok to overwrite it!");
               if (r == true) {
               retrieve_path_to_file1()
             }

          }
          else{
            retrieve_path_to_file1()
          }


    });

}


 //retrieve_path_to_file2()




function retrieve_path_to_file1(){



  console.log("inside retrivw file")



  for (i=0;i<arrayofskill.selected.length;i++)
   {

      console.log(arrayofskill.selected[i]);
      console.log(arrayofskill.selected[i] + " is " + "selected" );


           updateDB(arrayofskill.selected[i]);
   }

  //check if file only one file uploaded
  var a=document.getElementById("avatar");
  console.log(a.files.length);


  console.log(a.files.length);


  //updating resume link in database
  var data=ref.child('Department/').child('Information Technology/').child('TE/').child('SAP/').child(loginid+'/');
  //data.child("Resume").once()
  var postData = {
       url : a.files[0].name
    };
    console.log(a.files[0].name)
   var updates = {};
  updates['Resume'] = postData;
  data.update(updates);
  data.on('value',snap => console.log(snap.val()))



 // sending files to upload
      upload(a.files[0]);

  console.log("End of script");

}

function upload(file_to_upload){

  // File or Blob named mountains.jpg
  console.log(file_to_upload);
  var file = file_to_upload;

  // Create the file metadata
  var metadata = {
    contentType: 'file/pdf'
  };

  //var storage=firebase.storage();
  //consle.log("Storage",storage);








  var storageRef = firebase.storage();
  console.log(storageRef)

  var uploadTask = storageRef.ref('resume').child(loginid + '/').child(file.name).put(file, metadata);




  console.log("file upload");




console.log("Upload Complete");
}
var databaseref = new Firebase('https://edify-6c876.firebaseio.com');

var skillref=databaseref.child("Skills")

function updateDB(abbr){



         console.log("################");
         console.log(abbr);
         console.log("inside if");

         var root = databaseref.child("Skills").child(abbr).child("SapId");
         console.log("root = ",root);
         root.once("value",function(snapshot){
          console.log("Here inside snapshot");
         var Origvalue=snapshot.val();

         console.log("original val = ",Origvalue);
         console.log(abbr);

         var newval = Origvalue + "," + loginid ;
         console.log("new value = ",newval) ;

         var postData = {
          "SapId": newval
        };
         var updates = {};
         //updates["SapId"] = postData;
         console.log(abbr);

         skillref.child(abbr).update(postData);


        });

}



 function setselected(nwarray){
  arrayofskill=nwarray;

 }
 $(document).ready(function(){
  $("button").click(function(){
      $("button").addClass("puff-out-center");

  });
});


/*

//init the modal
//init the modal
function openModal1(num) {
  //simulate ajax call to get the modal content
  var htmlFromServer = getHtml(num);

  //append the html to the modal
  $('#modal_content').html(htmlFromServer);
  //init the tabs
  //$('ul.tabs').tabs();
  //open the modal

  $('#modal1').openModal();



  return 0

};


function getHtml(num) {

   if(num=="1"){
    return `<div class="col s12">
    <p>YOU HAVE ALREADY UPLOADED YOUR RESUME!!!</p>
    <a href="#" onclick="retrieve_path_to_file2()" class="btn btn-warning btn-lg">
    <span class="glyphicon glyphicon-unchecked"></span>MOVE Ahead Anyway</a>
    <p>This will overwrite your previous Resume</p>
    <a href="#" onclick="window.location.reload()" class="btn btn-warning btn-lg"><span class="glyphicon glyphicon-unchecked"></span>Try again</a>
    `

  }
  else if(num=="2"){
    return `<div class="col s12">
    <p>CHOOSE AT LEAST ONE  SKILL!!!</p>
    <a href="#" onclick="window.location.reload()" class="btn btn-warning btn-lg">
    <span class="glyphicon glyphicon-unchecked"></span>Try again</a> `
  } else if(num=="3"){
    return `<div class="col s12">
    <p>CAN UPLOAD ONLY ONE FILE!!!</p>
    <a href="#" onclick="window.location.reload()" class="btn btn-warning btn-lg">
    <span class="glyphicon glyphicon-unchecked"></span>Ok</a> `
  } else if(num=="4"){
    return `<div class="col s12">
    <p>CHOOSE A FILE!!!</p>
    <a href="#" onclick="window.location.reload()" class="btn btn-warning btn-lg">
    <span class="glyphicon glyphicon-unchecked"></span>Ok</a> `

  }
  else{
    return `<div class="col s12">
    <p>SOME ERROR OCCURED TRY AGAIN LATER</p>
    <a href="#" onclick="window.location.reload()" class="btn btn-warning btn-lg">
    <span class="glyphicon glyphicon-unchecked"></span>Ok</a> `
  }

};*/

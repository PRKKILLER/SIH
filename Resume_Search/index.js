
// Initialize Firebase
//var firebase=require('firebase');



//loginid=60003160029
arrayofskill=[]
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
  template: '\n<div class="select-list-wrapper">\n  <header class="select-list-actions is-clearfix">\n      <p class="control" v-if="selectedOptions.length > 0"> \n        <a href="#" role="button" class="button is-link" @click="clear"> Clear selected </a>\n      </p>\n      <p class="control"> \n        <input class="input" v-model="filterText" type="text" placeholder="Filter list">\n      </p>\n  </header>\n  <div class="select-list" v-if="filteredOptions.length > 0">\n    <toggle-button\n            v-for="option in filteredOptions"\n            :text="option.label"\n            :value="option.value"\n            :selected="option.selected"\n            class="select-item"\n            @toggle="onToggle($event)"\n            ></toggle-button>\n  </div>\n  <div v-else>No items to display</div>\n</div>\n  ',



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
       //console.log(event.selected)
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
     brands: ["Machine Learning", "Business Analysis", "Blockchain", "Communication", "Data Analyst","Android Development", "Web Development","Marketing","Management","Time Management","Leadership","Adaptability","Teamwork","Cloud Computing","IOS Development","Graphic Design","Creativity","Self Motivation","SQL","JAVA"],

    selectedBrands: []

  },


  methods: {
    onChange: function onChange(changed) {
//console.log(brands[10]);

    } } });



 var array=[];



ref=new Firebase('https://edify-6c876.firebaseio.com');


var i;
function search(){
  
  document.getElementById("warning").innerHTML="";
if(arrayofskill.selected==null){
  document.getElementById("warning").innerHTML="Choose A Skill!!!!";
}
else{
  search1()
}
}

function search1(){
       var array=[];

  for(i=0;i<arrayofskill.selected.length;i++){

     skill=arrayofskill.selected[i];
     sendskill(skill,array);


       }




}


function sendskill(skill,array){

 
var database=ref.child("Skills").child(skill).child("SapId");

       database.once("value").then(function(snapshot){

            var string=String(snapshot.val());



           var  nwstr=string.split(",")

          for(q=0;q<nwstr.length;q++){
            array.push(nwstr[q]);

             }
           //console.log(array)
           retrivefile(array)

          });



        }







noofdownloadurlcall=0
function retrivefile(array)
{

  var z=0;


    var nwarray=removeduplicate(array);
    //console.log("WITHOUT DUPLICATE:",nwarray)
    document.getElementById("list").innerHTML="";

    reference=ref.ref().child("Department/Information Technology/TE/SAP/")

    for(i=0;i<nwarray.length;i++){

        urlref=reference.child(nwarray[i]+"/").child("Resume/url")

        roll=nwarray[i]


        downloadfile(urlref,roll)
       /* element=document.createElement("li");
        list=document.getElementById("list");
        avatar=document.createElement("span");
        sapidofdoc=document.createElement("span");
        avatar.cl
        */





        }
  }
function removeduplicate(array){
  var out=[];
  array.sort();

  for(var i=0,len=array.length-1;i<len;i++){

     if(array[i]!==array[i+1]){
          out.push(array[i]);
      }
  }
  out.push("null")
  out.push(array[i]);
  return(out)
}


noofdownloadurlcallr=0
function downloadfile(urlref,roll){

  urlref.once("value",function(snapshot){
    file=snapshot.val();
      f=addfile(file,roll);


   });

}
function call_ajax(reference,){
  //console.log("in call ajax")
  
  var url=$(reference).attr("id");
  
  pdf=url

  q="<iframe src='"+pdf+"' width='100%' height='100%'>"
  document.getElementById("file_content").innerHTML=q;

  
  $('#open_file').modal('show');
}



 function setselected(nwarray){
  arrayofskill=nwarray;

 }


 noofaddfilecall=1

numoflist=1
function addfile(file,roll){


 var storage=firebase.storage();

 var gsReference=storage.ref().child("resume"+"/"+roll).child("/"+file)
 ////////////////////////////////////////////////ADD DOWNLOAD FILE HERE/////////////////////////////////////////////////////
 gsReference.getDownloadURL().then(function(url)
 {

    f=document.getElementsByClassName("li");
    flag=true;

 if(f.length==0){
  //console.log(numoflist++)
  //console.log(roll,"The first list:")
   var h = document.getElementById("list");
    h.insertAdjacentHTML("beforeend", `<div class="div"><li class="li"style="cursor= pointer;" id=`+url+` onclick='call_ajax(this)' name=`+roll+`>
       <span class="avatar"></span>
      <span class="name">`+roll +`</span>

       </li></div>`)
    //console.log(url)
      return 0


 }
 else{
  for(k=0;k<f.length;k++){

 if(roll==f[k].getAttribute("name")) {

  flag=false;
  break


 }
}
if(flag){

//console.log(roll,"")
var h = document.getElementById("list");
h.insertAdjacentHTML("beforeend", `<div class="div"><li class="li"style="cursor= pointer;" id=`+url+` onclick='call_ajax(this)' name=`+roll+`>
   <span class="avatar"></span>
   <span class="name">`+roll +`</span>

   </li></div>`)
   //console.log(url)
   return 0
 }
 else{
   return false
 }
}

   }).catch(function(error) {
     switch (error.code) {
         case 'storage/object-not-found':
           // File doesn't exist
          
           break;

         case 'storage/unauthorized':
           // User doesn't have permission to access the object
           //console.log("User doesn't have permission to access the object")
           break;

         case 'storage/canceled':
           // User canceled the upload
           //console.log("User canceled the upload")
           break;


         case 'storage/unknown':
           // Unknown error occurred, inspect the server response
           //console.log("Unknown error occurred")
           break;
       }
     // Handle any errors
   });

}

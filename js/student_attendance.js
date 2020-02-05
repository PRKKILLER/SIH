var total_attendance=[]
var rubix=new Array();
var initialize=true;
var x="";
$(document).ready(function(){

  collect_dates();

});



function develop_structure(){


  for(x in total_attendance){

    for(y in total_attendance[x]["Attendance"]){



      var check_current_date=y.split(" ")[0].split("-");
      date=check_current_date[1]+"/"+check_current_date[0]+"/"+check_current_date[2];
      if(rubix[date]!=undefined){
      for(z in total_attendance[x]["Attendance"][y]){


          s=z.split(" ")

          var get_subject_name=""
          for(i=1;i<s.length;i++){

            get_subject_name+=s[i]+" "

          }
          get_subject_name=get_subject_name.slice(0,get_subject_name.length-1)



          slot=s[0]


          rubix[date][x][get_subject_name]=new Array();




          rubix[date][x][get_subject_name][slot]=total_attendance[x]["Attendance"][y][z]






        }
      }
    }

    }

  //console.log(rubix)
  
  }


  function make_firebase_call(){

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("SAP");

    ref.once("value", function(snapshot) {

      total_attendance=snapshot.val();

      develop_structure();
    }, function (error) {

      alert("Kuch toh gadbad hai Daya");

     });

  }

  function collect_dates(){

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("SAP").child("60003160032").child("Attendance");

    ref.once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
         //Here you can access  childSnapshot.key
         z=childSnapshot.key()
         f=z.split(" ")
         k=f[0].split("-")

         formatted_date=k[1]+"/"+k[0]+"/"+k[2];
         ////console.log(z)
         rubix[formatted_date]=new Array();

      });

      collect_sap();
    }, function (error) {

      alert("Kuch toh gadbad hai Daya");

     });

  }
  var no_of_sap=0;
  function collect_sap(){

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("SAP");

    ref.once("value", function(snapshot) {
      no_of_sap=snapshot.numChildren();
      //console.log("---------------------------------------",no_of_sap);
      snapshot.forEach(function(childSnapshot) {
         //Here you can access  childSnapshot.key
         z=childSnapshot.key()


         for(i in rubix){

           rubix[i][z]=new Array();

         }

      });

      make_firebase_call();

    }, function (error) {

      alert("Kuch toh gadbad hai Daya");

     });

  }



  function dropdown_for_subjects(){

    var ref = new Firebase('https://edify-6c876.firebaseio.com');
    ref=ref.child("Department").child("Information Technology").child("TE").child("Subjects");

    ref.once("value", function(snapshot) {

      var subjects=snapshot.val();

      var subjects_dropdown=document.getElementById("subjects_dropdown");

      for(x in subjects){
        subjects_dropdown.innerHTML+='<option value="'+x+'">'+x+'</option>';

      }

    },function(error){

    });
  }



  function format_date(date){


      if(date.getMonth()+1<10){

          x=date.getMonth()+1
          y="0"+x

          if(date.getDate()<10){

              f="0"+date.getDate()

          }
          else{

              f=date.getDate()

          }
          date_obj_to_str=y+"/"+f+"/"+date.getFullYear()

      }
      else{


          if(date.getDate()<10){

              f="0"+date.getDate()

          }
          else{

              f=date.getDate()
          }

          date_obj_to_str=(date.getMonth()+1)+"/"+f+"/"+date.getFullYear()
      }

      return date_obj_to_str;


  }

  function clean_data(arr,date,start_date_obj,end_date_obj){
    //console.log(arr,date,start_date_obj,end_date_obj);
    start_date_to_str=format_date(start_date_obj);


    while(date>=start_date_obj && date<=end_date_obj){
       date_obj_to_str=format_date(date)
       for(sap2 in rubix[date_obj_to_str]){
            //console.log("adding",arr[date_obj_to_str][sap2]);
            //console.log("a",arr[start_date_to_str][sap2]);

            if(arr[start_date_to_str][sap2]==undefined){

                arr[start_date_to_str][sap2]=0;

            }
            arr[start_date_to_str][sap2]+=arr[date_obj_to_str][sap2];

       }
       date.setDate(date.getDate()+1);
    }
    //console.log("Cleaned Data");
    //console.log(arr);


  }
  function reset_table(){

      var t=document.getElementById("table");
      t.innerHTML=`<thead class="text-primary" id="table-head">
      </thead><tbody id="table-body">
      </tbody>`;

  }
  function create_table_header(headers){
    var table_ref=document.getElementById("table-head");
    x="";
    for(var i=0;i<headers.length;i++){
      x+="<th>"+headers[i]+"</th>"

      //table_ref.innerHTML+=x.slice(4,x.length-5);

      //console.log(table_ref.innerHTML)

    }
    table_ref.innerHTML+=x;
  }


  //
  //   $(function() {
  //   $("#slots_dropdown").change(function() {
  //       // alert( $('option:selected', this).text() );
  //       if($('option:selected', this).text()!="All"){
  //       $("#subjects_dropdown").prop("disabled", false);
  //
  //   });
  // });
  //



  function add_table_row(row){
    //console.log(row)
    var table_body_ref=document.getElementById("table-body");
    y="";
    table_body_ref.innerHTML+="<tr>";
    for(var i=0;i<row.length;i++){

      y+="<td>"+row[i]+"</td>";

    }
    

    table_body_ref.innerHTML+=y;
    table_body_ref.innerHTML+="</tr>";


  }
  function apply_filter(){

    //Initializing Variables
    reset_table();
    date_sap_present=new Array();
    date_sap_total=new Array();
    sap_present=new Array();
    sap_present_absent=new Array();
    sub_present=new Array();
    sub_total=new Array();

    sap_subject_present=new Array();
    sap_subject_total=new Array();

    start_date=document.getElementById("start").value;
    end_date=document.getElementById("end").value;
    sap=document.getElementById("sap_id").value;
    // subject=document.getElementById("").value;
    // slot=document.getElementById("").value;

    //sap="60003160055";
    subjects=document.getElementById("subjects_dropdown").value;
    slots=document.getElementById("slots_dropdown").value;

    var headers_not_created=true;
    initialize=true;

    //Step 1 :Format Date as Required (MM/DD/YYYY)

      //Formatting Start date
      split=start_date.split("-");
      formatted_start_date=split[1]+"/"+split[2]+"/"+split[0];
      start_date_obj=new Date(formatted_start_date);

      //Formatting End date
      split=end_date.split("-");
      formatted_end_date=split[1]+"/"+split[2]+"/"+split[0];
      end_date_obj=new Date(formatted_end_date);

    //Step 2: Cases

    //Initialize Date to start_date
    date=new Date(start_date_obj);

    while(date>=start_date_obj && date<=end_date_obj){

      date_obj_to_str=format_date(date)

      if(sap=="All")
      {

        if(subjects == "All")
        {

          if(slots=="All")
          {
            //###########################################################





            date_sap_present[date_obj_to_str]=new Array();
            date_sap_total[date_obj_to_str]=new Array();

            //Columns will be SAP and %

            //Calculate each SAP's each lectures attendance in given date range
            //and show it in percentage

              if(rubix[date_obj_to_str]!=undefined)
              {

                for(sap1 in rubix[date_obj_to_str])
                {

                  date_sap_present[date_obj_to_str][sap1]=0;


                  date_sap_total[date_obj_to_str][sap1]=0;

                  for(sub in rubix[date_obj_to_str][sap1])
                  {

                    for(d in rubix[date_obj_to_str][sap1][sub])
                    {

                      if(rubix[date_obj_to_str][sap1][sub][d]=="P")
                      {

                        date_sap_present[date_obj_to_str][sap1]+=1


                      }

                      date_sap_total[date_obj_to_str][sap1]+=1

                    }

                  }

                }

              }

              if(date.getTime()===end_date_obj.getTime())
              {
                create_table_header(["SAP", "%"]);
                date1=new Date(start_date_obj);
                clean_data(date_sap_present,date1,start_date_obj,end_date_obj);
                date1=new Date(start_date_obj);
                clean_data(date_sap_total,date1,start_date_obj,end_date_obj);

                start_date_to_str=format_date(start_date_obj);
                for(sap3 in date_sap_present[start_date_to_str])
                {

                  sap_present[sap3]=0;


                  sap_present[sap3]=date_sap_present[start_date_to_str][sap3]*100/date_sap_total[start_date_to_str][sap3];
                  add_table_row([sap3,sap_present[sap3]]);
                }


              }
          }
          else
          {

            // Columns will be SAP, Subject and percentage

            //Display each lecture of the selected slot
            // It will show each sap, the subject and P/A
           if(initialize && rubix[date_obj_to_str]!=undefined){


              //console.log(subjects)

              for(sap_id in rubix[date_obj_to_str]){
                sap_subject_present[sap_id]=new Array();
                sap_subject_total[sap_id]=new Array();



              }

              initialize=false;
              //console.log(sap_subject_present,sap_subject_total)
            }


            if(rubix[date_obj_to_str]!=undefined)
            {

              for(sap1 in rubix[date_obj_to_str])
              {




                  for(sub in rubix[date_obj_to_str][sap1])
                  {





                    for(d in rubix[date_obj_to_str][sap1][sub])
                    {

                      if(d==slots){
                        if(rubix[date_obj_to_str][sap1][sub][d]=="P"){

                          sap_subject_present[sap1][sub]==undefined?sap_subject_present[sap1][sub]=1:sap_subject_present[sap1][sub]+=1;


                      }


                        sap_subject_total[sap1][sub]==undefined?sap_subject_total[sap1][sub]=1:sap_subject_total[sap1][sub]+=1;



                      }

                    }
                  }



                }

              }










            //console.log(sap_subject_present,sap_subject_total)

          if(date.getTime()===end_date_obj.getTime())
          {
            head=["SAP","Subject","Percentage"];
            create_table_header(head);
            for(x in sap_subject_total){

              for(y in sap_subject_total[x]){

                //console.log(x,y)
              if(sap_subject_present[x]==undefined){

                //console.log(x,y,0);
                row=[x,y,"0"];
                add_table_row(row);

                //Sap, subject, percentage
              }
              else{


                //console.log(x,y,sap_subject_present[x][y]*100/sap_subject_total[x][y]);
                row=[x,y,sap_subject_present[x][y]*100/sap_subject_total[x][y]];
                add_table_row(row);


              }
            }
          }
}
          }
        }
        else
        {

          //###############################################################################


          //subject is specified

          if(slots=="All")
          {


            if(initialize && rubix[date_obj_to_str]!=undefined){
              sap_present=new Array();
              sap_total=new Array();



              for(sap_id in rubix[date_obj_to_str]){

                sap_present[sap_id]=0;
                sap_total[sap_id]=0;



              }

              initialize=false;
            }

            if(rubix[date_obj_to_str]!=undefined)
            {

              for(sap1 in rubix[date_obj_to_str])
              {



                for(sub in rubix[date_obj_to_str][sap1])
                {
                  if(sub==subjects){

                    for(d in rubix[date_obj_to_str][sap1][sub])
                    {

                      if(rubix[date_obj_to_str][sap1][sub][d]=="P")
                      {


                        sap_present[sap1]+=1


                      }


                      sap_total[sap1]+=1

                    }

                  }


                }

              }

            }

            if(date.getTime()===end_date_obj.getTime())
            {
              head=["SAP","Percentage"];
              create_table_header(head)
              for(sap_id in sap_present){
                add_table_row([sap_id,sap_present[sap_id]*100/sap_total[sap_id]]);
                //console.log("percentage",sap_id,sap_present[sap_id]*100/sap_total[sap_id])
              }

            }



          }
          else
          {
            //#########################################################################

            // Columns will be SAP and P/A

            //console.log("Bhagwan ko maante ho?");
            sap_present_absent[date_obj_to_str]=new Array();

            if(rubix[date_obj_to_str]!=undefined)
            {

              for(sap1 in rubix[date_obj_to_str])
              {

                //date_sap_present[date_obj_to_str][sap1]=0;
                sap_present_absent[date_obj_to_str][sap1]=0;

                //date_sap_total[date_obj_to_str][sap1]=0;

                for(sub in rubix[date_obj_to_str][sap1])
                {
                  if(sub==subjects){
                    //console.log("-------------------Subjects are equal")
                  for(d in rubix[date_obj_to_str][sap1][sub])
                  {
                    //console.log(d)
                    if(d==slots){
                        //console.log("d==slots");
                        sap_present_absent[date_obj_to_str][sap1]=rubix[date_obj_to_str][sap1][sub][d];
                        //console.log(sap_present_absent[date_obj_to_str][sap1]);

                    }

                  }
                }

                }

              }

            }
            if(date.getTime()===end_date_obj.getTime())
            {
              create_table_header(["Date","SAP","Present/Absent"])
              for(d in sap_present_absent){
                if(d.length!=0){
                for(sap1 in sap_present_absent[d]){

                  if(sap_present_absent[d][sap1]==0){
                      add_table_row([d,sap1,"A"])
                  }
                  else{
                      add_table_row([d,sap1,"P"])
                  }

                }
              }

              }

              //console.log("Objects are equal",sap_present_absent);
            }




            //Download CSV
          }

        }

      }
      else
      {

        if(subjects=="All")
        {
            //console.log("slot is",slots);
            //slots="9_30-10_30"
            if(slots=="All")
            {
              // Columns will be Subject and percentage
              // Each Row will correspond to a Subject

              //Calculate each Subject's percentage for given date range for all subjects




                //console.log("Sacred Games");

                if(rubix[date_obj_to_str]!=undefined)
                {

                  for(sap1 in rubix[date_obj_to_str])
                  {

                    if(sap1==sap){

                      for(sub in rubix[date_obj_to_str][sap1])
                      {

                        for(d in rubix[date_obj_to_str][sap1][sub])
                        {

                          if(rubix[date_obj_to_str][sap1][sub][d]=="P")
                          {

                            if(sub_present[sub]==undefined){

                              sub_present[sub]=1;


                            }
                            else{

                              sub_present[sub]+=1;

                            }

                            //console.log("Incrementing here");


                          }
                          if(sub_total[sub]==undefined){

                            sub_total[sub]=1;
                          }
                          else{

                            sub_total[sub]+=1;
                          }


                        }

                      }

                    }


                  }

                }
                //console.log(sub_present,sub_total);
                if(date.getTime()===end_date_obj.getTime())
                {
                  create_table_header(["Subject","Percentage"])
                  for (s in sub_total){

                      if(sub_present[s]==undefined){

                          //console.log("Percentage of",s,0);
                          add_table_row([s,"0"]);

                      }
                      else{

                        //console.log("Percentage of",s,sub_present[s]*100/sub_total[s]);
                        add_table_row([s,sub_present[s]*100/sub_total[s]]);
                      }

                  }
                }
            }
            else
            {

              // Columns will be Subject, Date and P/A

              // Rows will contain lectures which were held on the time slot selected

              if(headers_not_created){
                create_table_header(["Date","Subject","Present/Absent"]);
                headers_not_created=false;
              }
              //console.log("Narcos");
              if(rubix[date_obj_to_str]!=undefined)
              {

                for(sap1 in rubix[date_obj_to_str])
                {
                  if(sap==sap1){

                    for(sub in rubix[date_obj_to_str][sap1])
                    {





                      for(d in rubix[date_obj_to_str][sap1][sub])
                      {
                        if(d==slots){
                        add_table_row([date_obj_to_str,sub,rubix[date_obj_to_str][sap1][sub][d]]);
                        //console.log(date_obj_to_str,sub,rubix[date_obj_to_str][sap1][sub][d]);
                      }


                      }
                    }

                    }



                }

              }

            }

        }
        else
        {
          if(slots == "All")
          {

            // Columns will be date and P/A
            //    OR
            // Columns will be percentage
            if(headers_not_created){

              create_table_header(["Date","Slot","Present/Absent"])
              headers_not_created=false;
            }
            if(rubix[date_obj_to_str]!=undefined)
            {

              for(sap1 in rubix[date_obj_to_str])
              {
                if(sap==sap1){

                  for(sub in rubix[date_obj_to_str][sap1])
                  {
                    if(sub==subjects){




                    for(d in rubix[date_obj_to_str][sap1][sub])
                    {

                      //console.log(date_obj_to_str,d,rubix[date_obj_to_str][sap1][sub][d]);

                      add_table_row([date_obj_to_str,d,rubix[date_obj_to_str][sap1][sub][d]]);

                    }
                  }

                  }

                }

              }

            }

          }
          else{
            if(headers_not_created){

              create_table_header(["Date","Present/Absent"]);
              headers_not_created=false;
            }
            if(rubix[date_obj_to_str]!=undefined)
            {

              for(sap1 in rubix[date_obj_to_str])
              {
                if(sap==sap1){

                  for(sub in rubix[date_obj_to_str][sap1])
                  {
                    if(sub==subjects){




                    for(d in rubix[date_obj_to_str][sap1][sub])
                    {

                      if(d==slots){

                          //console.log(date_obj_to_str,rubix[date_obj_to_str][sap1][sub][d]);
                          add_table_row([date_obj_to_str,rubix[date_obj_to_str][sap1][sub][d]])
                      }

                    }
                  }

                  }

                }

              }

            }




          }


            // Columns will be date and P/A

        }

      }
      //console.log("incrementing date")
      date.setDate(date.getDate()+1)
      //console.log("Date is",format_date(date))
    }


  }

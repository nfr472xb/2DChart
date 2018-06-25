
  var xhr = new XMLHttpRequest();
  xhr.open('get',"./data/10min.json",true);
  
  
  xhr.send();
  
  xhr.onload = function(){
    var str = ''
    var power=[]; 
    var name=[]; 
    var data = JSON.parse(xhr.responseText);
    
    for(var i =0;data.aaData.length>i;i++){               
      if (data.aaData[i][1]=='小計')           
        {
          var read=data.aaData[i][2];
        var n=read.split("(",1);
  
           if(n!='')
           power.push(n[0]);            
          var re=data.aaData[i][0];
        var nx=re.split("<b>");
          var pin = nx[1].split("<")
          name.push(pin[0]);
          
          str+= '<li>'+ data.aaData[i][0] 
            +'</li>淨發電量(千瓩):'+n;
          
        }        
    }
  

   //整合民營
   var addpower = new Array();

   for (var i=0,l=power.length;i<l;i++) 
   addpower.push(+power[i]); 

   addpower[1]= addpower[1] +addpower[3] ;
   addpower[4]= addpower[4] +addpower[5] ;


   var index = addpower.indexOf(addpower[3]);
   if (index > -1) { addpower.splice(index, 1); }

   index = addpower.indexOf(addpower[4]);
   if (index > -1) { addpower.splice(index, 1); }




   //名稱

   var addname = new Array();


   for(i=0;i<name.length;i++)
   {
    addname.push(name[i]);
   }

   index = addname.indexOf(addname[3]);
   if (index > -1) { addname.splice(index, 1); }

   index = addname.indexOf(addname[4]);
   if (index > -1) { addname.splice(index, 1); }


  //民營政府

 var ipp = new Array(2);
 
 ipp [0] = parseInt(power[3])+parseInt(power[5]);

    ipp [1] = 0;
    for(var i=0;i<power.length;i++)
    ipp [1] = ipp [1]+parseInt(power[i]);

ipp [1]  = ipp [1] - ipp [0];

  //可再生/ 不可再生
  var clear = new Array();
  clear[0] = 0;
  clear[1] = 0;
  for (var i=0;i<7;i++)
  clear[0] +=parseInt(power[i]);
  for (var i=7;i<power.length;i++)
  clear[1] +=parseInt(power[i]);

  console.log(clear);
  console.log(power);
  console.log(name);

  // 長條圖

var w = window.innerWidth
if (w<800){
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
type: 'horizontalBar',
data: {
labels: addname,
datasets: [{
  backgroundColor: [
    "#2ecc71",
    "#f97c98",
    "#3498db",
    "#95a5a6",
    "#9b59b6",
    "#f1c40f",
    "#e74c3c",
    "#34495e",
    "#7cd9f9"
  ],
  data: addpower
}]
},
options:{
  legend:{
    display:false
  }
  }
});
}
else {

      var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
type: 'bar',
data: {
labels: addname,
datasets: [{
  backgroundColor: [
    "#2ecc71",
    "#f97c98",
    "#3498db",
    "#95a5a6",
    "#9b59b6",
    "#f1c40f",
    "#e74c3c",
    "#34495e",
    "#7cd9f9"
  ],
  data: addpower
}]
},
options:{
  legend:{
    display:false
  }
  }
});
}

  // 圓餅圖民營

      var ctx = document.getElementById("myChart1").getContext('2d');
var myChart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["民營","政府"],
datasets: [{
  backgroundColor: [
    "#7cd9f9",
    "#3498db"
  ],
  data: ipp
 
}]
}

});

  // 可再生
  var ctx = document.getElementById("myChart2").getContext('2d');
var myChart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["不可再生","可再生"],
datasets: [{
  backgroundColor: [
    "#f97c98",
    "#A5D576"
  ],
  data: clear
 
}]
}

});

};  
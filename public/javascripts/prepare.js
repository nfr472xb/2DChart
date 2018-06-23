var xhr = new XMLHttpRequest();
xhr.open('get',"./data/prepare.json",true);
  

xhr.send();



function getDate() {
  var data = JSON.parse(xhr.responseText);
  var d = ''
  var i=0
  d = document.getElementById('date').value;
  d = d.replace(/-/g, "/");
  var str = ''
    for(i;i<data.length;i++) {
      if(data[i]['日期'] == d) {
        str+= '<h2>備轉容量(萬瓩):'+data[i]['備轉容量(萬瓩)']+'</h2>';
        str+= '<h2>備轉容量率(%):'+data[i]['備轉容量率(%)']+'</h2>';
      }
    }
  document.querySelector('.list').innerHTML = str;
}

xhr.onload = function(){
  var str = [];
  var str2 = [];
  var str3 = []
  
  var data = JSON.parse(xhr.responseText);
  var i = data.length;
  var k = i-30;
  var g = i-30;
  var h = i-30;
   for(var h;i>h;h+=7){
     //str = '<li>'+ data[k].日期 +'</li>';
     str.push(data[h]['日期']);
   }
  for(var k;i>k;k++){
    str2.push(data[k]['備轉容量(萬瓩)']);
  }
  for(var g;i>g;g++){
    str3.push(data[g]['備轉容量率(%)']);
  }
  //console.log(str)
  var ctx = document.getElementById("myChart1").getContext('2d');
  ctx.height = 300;
var myChart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: str,
    datasets: [{

      borderColor:["#f1c40f"],
      data: str2
    }]
  },
  options:{
    responsive: true,
    maintainAspectRatio: false,
    legend:{
      display:false
    }
    }
});
  var ctx2 = document.getElementById("myChart2").getContext('2d');
var myChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: str,
    datasets: [{
      borderColor:["#f1c40f"],
      data: str3
    }]
  },
  options:{
    responsive: true,
    maintainAspectRatio: false,
    legend:{
      display:false
    }
    }
  
});
};





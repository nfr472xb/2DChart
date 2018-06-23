$(document).ready(function() {
    var density = {
      "臺北市": 16,
      "嘉義市": 1.1,
      "新竹市": 2.3,
      "基隆市": 1.3,
      "新北市": 15.6,
      "桃園市": 9.1,
      "臺中市": 12.7,
      "彰化縣": 4.7,
      "高雄市": 11.6,
      "臺南市": 7.6,
      "金門縣": 0.5,
      "澎湖縣": 0.3,
      "雲林縣": 2.6,
      "連江縣": 0.1,
      "新竹縣": 2.2,
      "苗栗縣": 1.8,
      "屏東縣": 3.5,
      "嘉義縣": 1.7,
      "宜蘭縣": 1.8,
      "南投縣": 1.7,
      "花蓮縣": 1.3,
      "臺東縣": 0.8
    };
     d3.json("../data/county.json", function(topodata) {
      var features = topojson.feature(topodata, topodata.objects.county).features;
      var color = d3.scale.linear().domain([0,20]).range(["#e7e7e7","#00d8ff"]);
      var fisheye = d3.fisheye.circular().radius(100).distortion(2);
      var prj = function(v) {
        var ret = d3.geo.mercator().center([122,23.25]).scale(6000)(v);
        var ret = fisheye({x:ret[0],y:ret[1]});
        return [ret.x, ret.y];
      };
      var path = d3.geo.path().projection(prj);
      for(idx=features.length - 1;idx>=0;idx--) features[idx].density = density[features[idx].properties.C_Name];
      d3.select("svg").selectAll("path").data(features).enter().append("path");
      function update() {
        d3.select("svg").selectAll("path").attr({
          "d": path,
          "fill": function (d) { return color(d.density); }
        }).on("mouseover", function(d) {
          $("#name").text(d.properties.C_Name);
          $("#density").text(d.density+"%");
  
        });
      }
   
      update();
    });
  });
  



var xhr = new XMLHttpRequest();
xhr.open('get',"../data/category.json",true);


xhr.send();
console.log(xhr.responseText);

var data ;

xhr.onload = function(){

data = JSON.parse(xhr.responseText);
console.log(data)

}


function getOption()
  {
  var x=document.getElementById("mySelect")
  console.log(x.options[x.selectedIndex].text)
  
  var name  ;
  // 取得select值存入 name ex台中市
    
    name = (x.options[x.selectedIndex].text);
    
  var all = new Array();
  for(var i =0;data.length>i;i++){
            if(data[i].des == name)
            {
              for(a=0;a<4;a++)
              {
               
                all.push(data[i].data[a])
              }
              
            }
  }
  

  // 圖表

  new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: ['住宅部門','服務業','機關','農林漁牧'],
      datasets: [
        {
          label: "取值",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: all
        }, {
          label: "平均",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [0.4993,0.3954,0.072,0.0334]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Distribution in % of world population'
      }
    }
});


 
  
  



  
console.log(all)

  }







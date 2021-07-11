var d=0;
function my1(){
    if (d%2 == 0){
        var x = document.querySelector('.he');
      x.className = "he1";
      d++;
    } 
    else {
        var x = document.querySelector('.he1');
      x.className = "he";
      d++;
    }
}
  function changeNavbarColor(){
     if(window.scrollY >= 80){
      document.querySelector('ul').style.backgroundColor = "white"
     }
     else{
      document.querySelector('ul').style.backgroundColor = "transparent"
    }
  };
  window.addEventListener('scroll', changeNavbarColor);
  function hideloader() {
    var q= document.querySelector('.start');
    q.style.display = "none";
    var q= document.querySelector('.main');
    q.style.display = "block";
  }


const api_url =
	"https://api.covid19india.org/data.json";

var data = []
async function getapi(url) {
	var response = await fetch(url);
	data = await response.json();
  console.log(data)
  if (response) {
		hideloader();
    table();
	}
}
getapi(api_url);


  var xValues = [],yValues = [],barColors=[];
  function graph(){
    var temp = data.tested
  for(var i=0; i<temp.length;i++){
    if(temp[i].firstdoseadministered ){
      xValues.push(temp[i].updatetimestamp);
      yValues.push(temp[i].firstdoseadministered);
      barColors.push("red")
    }
  }
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }],
        xAxes: [{
            ticks: {
                display: false 
            }
        }]
      }
      }
      });
  temp = temp[temp.length -1]
   xValues = ["over45years1stdose", "over45years2nddosence", "over60years1stdose", "over60years2nddose"];
   yValues = [temp.over45years1stdose,temp.over45years2nddose,temp.over60years1stdose, temp.over60years2nddose];
   barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
  ];

  new Chart("myChart1", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    }
  });
}
function table(){
  let tab = 
        `<tr>
          <th>Name of the state</th>
          <th>Vaccinated atleast one dose</th>
          <th>Fully vaccinated</th>
         </tr>`;
    
    for (let r of data.statewise) {
    tab += `<tr> 
    <td>${r.state} </td>
    <td>${r.recovered}</td>
    <td>${r.active}</td> 
    </tr>`;
    }
    document.getElementById("states").innerHTML = tab;
    graph()
}
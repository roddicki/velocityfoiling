function timeNow() {
	var date = new Date();
	currentHours = date.getHours();
	currentHours = ("0" + currentHours).slice(-2);
	return currentHours + ":00";
}

function getWindData(callback){
	console.log('getWindHistory');
	//make array of nulls
	var windValues = [];
	//var hourValues = [];
	var gustValues = [];
	var newHourValues = [8, "", "", "", 9, "", "", "", 10, "", "", "", 11, "", "", "", 12, "", "", "", 13, "", "", "", 14, "", "", "", 15, "", "", "", 16, "", "", "", 17, "", "", "", 18, "", "", "", 19, "", "", "", 20, "", "", ""];
	// for (var i = 0; i < 24; i++) {
	// 	result.push(null);
	// };
	//get json file
	$.getJSON('https://roddickinson.net/cheddar/cron/wind-history.json', function(data, status){
			var history = data.windHistory;
			var maxWind = 0;
			var maxHr = 0;
			var minsInterval = 15;
			//loop through array and replace null with WIND data
			var windTotal = 0;
			var windItems = 0;
			var gust = 0;
			//hour range
			var startHr = 7;
			var endHr = 21;
			var startTime = history[0].OBSERVED;
			var t = new Date(history[0].OBSERVED);
			var currHr = t.getHours();
			var counter = 0;
			console.log("startTime=" +startTime+ " newHr=" +currHr);
			for (var i = 0; i < history.length; i++) {
				//console.log("\n\n"+i+"\n\n");
				var d = new Date(history[i].OBSERVED);
				//console.log(d.getMinutes()+ "mins " +d.getHours()+ "hrs " +history[i].WIND+ "knts");
				//create average
				windItems++;
				//get max gust
				windTotal += parseInt(history[i].WIND);
				if (parseInt(history[i].WIND) > gust) {
					gust = parseInt(history[i].WIND);
				};

				//reset at new hour
				if (d.getHours() != currHr && d.getHours() > startHr && d.getHours() < endHr) {
					//console.log("new hour");
					currHr = d.getHours();
					//console.log(Math.round(windTotal/windItems)+ " ave hr="+ d.getHours());
					windValues.push(Math.round(windTotal/windItems) );
					gustValues.push(gust);
					//hourValues.push(d.getHours());
					//splice / add to hours
					newHourValues.splice(counter, 1, d.getHours());
					maxHr = d.getHours();
					windTotal = 0;
					windItems = 0;
					gust = 0;
					minsInterval = 15;
					counter++;
				}
				//reset every 15mins of data
				//if starttime is less than current time
				else if (d.getMinutes() >= minsInterval && d.getHours() > startHr && d.getHours() < endHr) {
				//else if (startTime+(1000*60*15) < history[i].OBSERVED && d.getHours() > startHr && d.getHours() < endHr) {
					//reset startTime
					startTime = history[i].OBSERVED;
					//console.log("\n\n" +Math.round(windTotal/windItems)+ " hr="+ d.getHours()+ " mins=" +d.getMinutes());
					windValues.push(Math.round(windTotal/windItems));
					gustValues.push(gust);
					//hourValues.push("");
					//splice / add to hours
					newHourValues.splice(counter, 1, "");
					windTotal = 0;
					windItems = 0;
					gust = 0;
					minsInterval += 15;
					counter++;
				};

				//maxWind
				if (parseInt(history[i].WIND) > maxWind) {
					maxWind = parseInt(history[i].WIND);
				};

				// hr = hr.split(",");
				// var d = new Date(history[i].OBSERVED);
				// result.splice(parseInt(hr[1])+1, 1, parseInt(history[i].WIND) );
				
			};

			console.log(windValues);
			//console.log(hourValues);
			console.log(gustValues);
			console.log(newHourValues);
			//build wind chart
			if (typeof callback === "function") {}
				callback(windValues, newHourValues, gustValues, maxWind);
			}					  
	);
}


function buildWindChart(windData, hourData, gustData, maxWind) {
	setCarouselHeight();
	if(maxWind < 14){
		maxWind = 14;
	} else {
		maxWind += 2;
	};
	var el = document.getElementById('windChart');
	//el.width = screen.width/2;
	var ctx = el.getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',
	
	    // The data for our dataset
	    data: {
	        labels : hourData,
	        datasets: [{
	            label: "My First dataset",
	            spanGaps: true,
	            cubicInterpolationMode: "monotone",
				pointRadius: 0,
				borderWidth: 3,
				pointBackgroundColor: "rgb(0, 0, 0)",
				backgroundColor: "rgba(0, 0, 0, 0.25)",
	            borderColor: "rgb(0, 0, 100)",
	            data: windData,
	        }, 
	        {
	            label: "My Second dataset",
	            spanGaps: true,
	            cubicInterpolationMode: "monotone",
	            fill: false,
				pointRadius: 0,
				borderWidth: 2,
				pointBackgroundColor: "rgb(255, 0, 0)",
				//backgroundColor: "rgb(255, 0, 0)",
	            borderColor: "rgb(255, 0, 0)",
	            data: gustData,
	        }]
	    },
	
	    // Configuration options go here
	    options: {
	    	annotation: {
				
			},
	    	legend: {
		        display: false
		    },
		    tooltips: {
		         enabled: false
		    },
	    	responsive: true,
			maintainAspectRatio: true,
			animation : false,
			scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true,
		                max: maxWind,
		                fontSize:15,
		                callback: function(label, index, labels) {
                        	return label+' kts';
                    	},
		            },
		            gridLines: {
                		display:true,
                		drawBorder: true,
                		zeroLineWidth: 1,
                		zeroLineColor: "rgb(0,0,0)",
           			},
		        }],
		        xAxes: [{
		            ticks: {
		                fontSize:15,
		                autoSkip: false,
		                maxRotation: 90,
	                    minRotation: 90,
	                    callback: function(label, index, labels) {
	                    	if (label != "") {
	                    		return label+':00';
	                    	};	
                    	},
		            },
		            /*scaleLabel: {
	                    display: true,
	                    labelString: 'Wind Report (knots)',
	                    fontSize:18,	
	                    fontColor: "rgb(0,0,0)",
	                },*/
		            gridLines: {
                		display:true,
                		drawBorder: true,
                		zeroLineWidth: 1,
                		zeroLineColor: "rgb(0,0,0)",
           			},
		        }],
		    },
	    }
	});
}


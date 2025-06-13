


function calcWeather(cloud, rain, is_day) {
	//  clear-skies.png, few-clouds.png, broken-clouds.png, overcast.png, rain.png
	console.log(cloud);
	let name = "";
	if (is_day == 0) {
		console.log("its night");
		name = "night";
		return name;
	}
	else if(rain > 0.1 && cloud < 80){
		name = "sun-showers";
		return name;
	}
	else if(rain > 0.5){
		name = "rain";
		return name;
	}
	else if(cloud > 80) {
		name = "overcast";
		return name;
	}
	else if(cloud > 40) {
		name = "broken-clouds";
		return name;
	}
	else if(cloud > 20) {
		name = "few-clouds";
		return name;
	}
	else if(cloud <= 20) {
		name = "clear-skies";
		return name;
	}
}

function displayWeather(name) {
 	//set background image or no data
 	if (name == undefined) {
 		document.querySelector('#weather-icon').removeAttribute('style');
 		document.querySelector('#weather-icon').innerHTML = "No&nbsp;Data";
 	} else {
 		document.querySelector('#weather-icon').innerHTML = "";
 		document.querySelector('#weather-icon').setAttribute('style', 'background-image:url("resources/img/'+name+'.png")');
 	};
	
}




function getWeather() {
	$.getJSON('https://api.open-meteo.com/v1/forecast?latitude=51.27962262925627&longitude=-2.80062&current=cloud_cover,rain,is_day&timezone=Europe%2FLondon', function(data) {
		// create weather icon name
	    let weatherName = calcWeather(data.current.cloud_cover, data.current.rain, data.current.is_day);
	    displayWeather(weatherName);
	});
}


getWeather();

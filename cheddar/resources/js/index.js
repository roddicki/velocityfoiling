


//localStorage.clear();

// remove modal avatar background image and caption to ensure they are reset and not cached
document.querySelector('.modal-content .background-image').style.backgroundImage = "none";
document.querySelector('.modal-content #modal-avatar-caption').innerHTML = "";
// set global speed to ensure it is  reset and not cached
let gSpeed = 0;


//toast fired
function toastFired(){
	//console.log('toast',localStorage.getItem('toast-viewed'));
	if ( localStorage.getItem('toast-viewed') == 'true' ) {
		console.log('toast fired');
		return true;
	};
}

//toast fired
function setStorage(){
	localStorage.setItem('toast-viewed', true);
}


//detect if fullscreen web app
function isRunningStandalone() {
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return true;
	} else if (window.navigator.standalone){
		return true;
	} else {
		//document.querySelector('#installApp').toggle();
		return false
	};
}

//show prompt to install app
function addToHomescreen() {
	/*if (!isRunningStandalone() && isIOS() && isSafari() && !toastFired()) {
		console.log('not standalone and is ios');
		document.querySelector('#installApp').toggle();
		setStorage();
	};*/
}

function temp(degrees) {
	if (degrees != null && degrees != undefined) {
		document.querySelector('#tempblock').innerHTML = degrees + "&#176c";
		document.querySelector('#tempblock').style.lineHeight = "40px";
	} else {
		document.querySelector('#tempblock').innerHTML = "no data";
		document.querySelector('#tempblock').style.lineHeight = "16px";
	}
	
}



function setTempColor(temp) {
	var tempColors = ["#BEDBF5", "#BEDBF5","#A7CFF7","#92DAFB","#92E0FB","#81DDF8","#82ECF8","#6FF7F6","#6FF9D5","#6FFAB3","#4EF97E","#4EFA52","#B4F948","#CFF948","#DCF848","#ECF848","#F0FE31","#F8E931","#FAD721","#FACB21","#F8BF1B","#F7AD1A","#F7A71A","#F78F1A","#F97414","#F95C14","#F94B14","#F83914","#F81714","#F80014","#F8002F","#F8002F","#F8002F","#F8002F","#F8002F"];
	if (temp == undefined) {
		document.getElementById('tempblock').style.backgroundColor = "transparent";
	} else {
		document.getElementById('tempblock').style.backgroundColor = tempColors[parseInt(temp)];
	};
}

/*set bg color, avatar and caption based on wind speed*/
/*display silhouette avatar on modal and slide*/
function setBgColor(speed, aveSpeed) {
	let color = "#7398f6"; //initial color
	//speed = 34;
	console.log(aveSpeed + " aveSpeed");
	/*splash screen */
	let avatar = "";
	let caption = "";
	if (speed >= 0 && speed <= 3) {
		color = "#7398f6";
		avatar = "cup-no-wind.svg";
		caption = "Hardly a breath, go paddling";
	} else if (speed >= 4 && speed <= 6) {
		color = "#73c9f6";
		avatar = "cup-no-wind.svg";
		caption = "Hardly a breath, go paddling";
	} else if (speed >= 7 && speed <= 10) {
		color = "#73f6dc";
		avatar = "cup-its-coming.svg";
		caption = "It's coming... Get the canoe!";
	} else if (speed >= 11 && speed <= 12) {
		color = "#7cf49e";
		avatar = "cup-its-here.svg";
		caption = "It's here, pack up the paddle!";
	} else if (speed >= 13 && speed <= 14) {
		color = "#7cf49e";
		avatar = "cup-lets-go.svg";
		caption = "Yes, it's here!";
	} else if (speed >= 15 && speed <= 16) {
		color = "#7cf49e";
		avatar = "cup-f5.svg";
		caption = "Yes, it's here!";
	} else if (speed >= 17 && speed <= 19) {
		color = "#fcf77b";
		avatar = "cup-f6.svg";
		caption = "Let's go! Speeeed!";
	} else if (speed >= 20 && speed <= 21) {
		color = "#fcf77b";
		avatar = "cup-styling.svg";
		caption = "Get stylin'!";
	} else if (speed >= 22 && speed <= 27) {
		color = "#fcd37b";
		avatar = "cup-downwinding.svg";
		caption = "The Holy Grail";
	} else if (speed >= 28 && speed <= 33) {
		color = "#fdb065";
		avatar = "cup-f6.svg";
		caption = "Nuking! Speeeed!";
	} else if (speed >= 34 && speed <= 40) {
		color = "#fb8e53";
		avatar = "cup-lets-jump.svg";
		caption = "Off the dial!";
	} else if (speed >= 41 && speed <= 47) {
		color = "#fb6436";
		avatar = "cup-off-the-screen.svg";
		caption = "Howling";
	} else if (speed >= 48 && speed <= 55) {
		color = "#fc2f20";
		avatar = "cup-drowning.svg";
		caption = "SOS";
	} else if (speed >= 56 && speed <= 63) {
		color = "#fc2087";
		avatar = "cup-drowning.svg";
		caption = "SOS";
	} else {
		color = "#7398f6";
		avatar = "cup-drowning.svg";
		caption = "SOS";
	}
	let bgStyle = 'background-color:' +color+ ' !important';
	document.querySelector('.page__background').setAttribute('style', bgStyle);
	document.querySelector('#titleblock').setAttribute('style', bgStyle); 
	/*footer #update*/
	document.querySelector('.footer #update').setAttribute('style', bgStyle);
	/*modal*/
	document.querySelector('.modal-header').setAttribute('style', bgStyle);
	document.querySelector('.modal-body').setAttribute('style', bgStyle);
	document.querySelector('.modal-content .background-image').setAttribute('style', 'background-image:url("resources/img/'+avatar+'")');
	document.querySelector('.modal-content #modal-avatar-caption').innerHTML = caption;
	document.querySelector('.modal-content #modal-wind-caption').innerHTML = speed + " knots";
	/*cup slide*/
	document.querySelector('.avatar-container .background-image').setAttribute('style', 'background-image:url("resources/img/'+avatar+'")');
	document.querySelector('.avatar-container #avatar-caption').innerHTML = caption;
	document.querySelector('.avatar-container #wind-caption').innerHTML = speed + " knots";
}

function displayModalContent() {
	/*display modal-body*/
	const modal = document.getElementById("fullscreenModal");
	const modalBody = document.querySelector('.modal-body');
	modalBody.classList.remove('invisible');
	/*fade out after 1s - fade length 1s */
	setTimeout(() => {
	    modal.classList.add("hide"); // Trigger fade-out effect
	    setModalViewedTime();
	    setTimeout(() => {
	        modal.style.display = "none"; // Hide completely after fade-out
	    }, 1000);
    }, 3000);
}

function hideModalContent() {
	const modal = document.getElementById("fullscreenModal");
	modal.classList.add("hide");
	modal.style.display = "none";
}

// set storage for modal viewed
function setModalViewedTime() {
	localStorage.setItem('modal-viewed', Date.now());
}

// calculate if the modal was viewed more than 12hrs ago
function showModal() {
	const millisecondsIn3Hours = 3 * 60 * 60 * 1000;
	let modalViewedTime = parseInt(localStorage.getItem('modal-viewed'));
	let timeElapsed = Date.now() - modalViewedTime;
	console.log(Date.now() + " " + modalViewedTime);
	// if modal viewed more than 12 hrs ago show again
	if(timeElapsed > millisecondsIn3Hours){
		console.log("show modal");
		return true;
	} else {
		/*console.log("don't show modal");
		return false;*/
		console.log("show modal");
		return true;
	}
}


function setArrowDirection(deg) {
	document.getElementById('arrow').setAttribute('style', '-ms-transform: rotate('+deg+'deg); -webkit-transform: rotate('+deg+'deg); transform: rotate('+deg+'deg);')
}


var params = {
    // Request parameters
    "duration": "1",
};



function setCarouselHeight() {
	console.log('setCarouselHeight');
	var carouselHeight = window.innerHeight-64;
	var carouselRatio = carouselHeight/window.innerWidth;
	var windChartWidth = document.querySelector('#windChart').width;
	document.querySelector('#windChart').setAttribute('height',windChartWidth*carouselRatio);
}


function displayLastUpdate(lastUpdate) {
	var ts = new Date(lastUpdate);
	document.getElementById("now").innerHTML = "Conditions on: " + ts.toDateString()+ " " + ts.getHours()+ ":" +ts.getMinutes();	  
}

function displayWindDirection(direction) {
	var compass = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
	CompassDirection = compass[Math.round(direction / 22.5) % 16];
	document.getElementById("bearing").innerHTML = CompassDirection;
}

function displayTemp(temp, tempUnits) {
	document.getElementById("tempblock").innerHTML = temp  + tempUnits;
}


function displayWindSpeed(speed, units) {
	document.getElementById("value").innerHTML = speed;
	document.getElementById("units").innerHTML = units;
}

function displayGust(gust, time){
	var ts = new Date(time);
	var mins = parseInt( ts.getMinutes() );
	var zero ="";
	if (mins < 10) {
		zero = "0";
	};
	document.getElementById("gust").innerHTML = "Highest gust " +gust+ " knots at " + ts.getHours()+ ":" +zero+ts.getMinutes();	
}

function displayUpdateTime(lastReceived) {
	var d = Date.now();
	var lastUpdate = Math.round(( (d-lastReceived) /1000)/60);
	var updateMsg;
	if (lastUpdate < 1) {
		updateMsg = "Updated less than a minute ago";
	} else if (lastUpdate == 1){
		updateMsg = "Updated "+ lastUpdate+ " min ago";
	} else {
		updateMsg = "Updated "+ lastUpdate+ " mins ago";
	}
	document.getElementById("update").innerHTML = updateMsg;
}

function displayTenMinData(data, currentWind){
	var loWind, hiWind;
	if (currentWind < data.loWind && data.loWind != null) {
		loWind = currentWind;
	} else {
		loWind = data.loWind;
	};

	if (currentWind > data.hiWind && data.hiWind != null) {
		hiWind = currentWind;
	} else {
		hiWind = data.hiWind;
	};

	if (data.loWind != null) {
		document.getElementById("lo-wind").innerHTML = "<span>"+ loWind + "</span><span class='small'>Kts<span>";
	} else {
		document.getElementById("lo-wind").innerHTML = "";
	};
	if (data.hiWind != null) {
		document.getElementById("hi-wind").innerHTML = "<span>"+ hiWind + "</span><span class='small'>Kts<span>";
	} else {
		document.getElementById("hi-wind").innerHTML = "";
	};
	if (data.aveWind != null) {
		document.getElementById("ave-wind").innerHTML = "<span>"+ data.aveWind + "</span><span class=\"small\">Kts<span>";
	} else {
		document.getElementById("ave-wind").innerHTML = "";
	};
}

function CalcTenMinAve(data) {
	console.log("CalcTenMinAve: ", data);
	var calculatedData = {};
	var hiWind = 0;
	var loWind = 1000; 
	var aveWind = 0;
	//saved timestamps
	var aveWindItems = 0;
	//get current timestamp - 10 mins
	var d = Date.now();
	var TenMinsAgo = d - 600000; //ten mins
	//reverse json array
	var itemsToIterate = data.slice(0).reverse();
	//get average, hi and lo
	for (var i = 0, len = itemsToIterate.length; i < len; i++) {
		if (itemsToIterate[i].OBSERVED > TenMinsAgo) {
			//console.log(itemsToIterate[i].WIND + "knts " + itemsToIterate[i].OBSERVEDDATE);
			var wind = parseInt(itemsToIterate[i].WIND);
			aveWindItems ++;
			aveWind += wind;
			if (wind > hiWind) {
				hiWind = wind;
			};
			if (wind < loWind) {
				loWind = wind;
			};
		} else {
			break;
		};
	}
	//if no results are returned
	if (aveWindItems == 0) {
		hiWind = null;
		loWind = null;
		aveWind = null;
	} else {
		aveWind = Math.round(aveWind/aveWindItems);
	};
	calculatedData.loWind = loWind;
	calculatedData.hiWind = hiWind;
	calculatedData.aveWind = aveWind;
	return calculatedData;
}


function init(data) {
  	$.getJSON('https://roddickinson.net/cheddar/sse-json.php', function(data) {
		//console.log("returned from sse-json.php" , data);
		$.ajaxSetup({ cache:false });
		gSpeed = data.wind;
		let tenMinAve = CalcTenMinAve(data.windHistory);
		setBgColor(gSpeed, tenMinAve.aveWind);
		let currentWind = parseInt(data.wind);
		displayTenMinData(tenMinAve, currentWind );
	    displayLastUpdate(data.lastReceived); 
	  	displayWindSpeed(data.wind, "kts");
	  	displayGust(data.gust, data.gustAt);
	  	displayWindDirection(data.windDirection);
	  	setArrowDirection(data.windDirection);
	  	displayTemp(data.temperature, "&deg;C");
	  	setTempColor(parseInt(data.temperature));
	  	displayUpdateTime(data.lastReceived);
	  	getWindData(buildWindChart);
	  	if (showModal()) {
			displayModalContent();
		}
		else {
			hideModalContent();
		}
		addToHomescreen();
	});
}

document.querySelector(".modal .btn-close").addEventListener("click", function (e) {
	hideModalContent();
});



setCarouselHeight();
/*getWindData(buildWindChart);*/
init();

setInterval(function(){
	init();
},1000 * 60 * 3);




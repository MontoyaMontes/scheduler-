const inputVal = document.getElementsByClassName('inputVal')[0];
const addTaskBtn = document.getElementsByClassName('addButton')[0];


addTaskBtn.addEventListener('click', function (e){
		if(inputVal.value.trim()!=0){  
		    let localItems = JSON.parse( localStorage.getItem('localItem'))
		    if(localItems === null){
		         taskList = []
		    }else{
		        taskList = localItems;
		    }
		    taskList.push(inputVal.value)
		    localStorage.setItem('localItem', JSON.stringify(taskList));

		}
		    inputVal.value = "";
		    showItem()
})

function showItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []

    }else{
        taskList = localItems;
    }

    // Add item to TODO list
	let items = '';

	let itemShow = document.querySelector('.todoLists');
	taskList.forEach((data, index )=> {
	    items += `
	    <div class="inputvalue">
	    <button class="deleteTask" onClick="deleteItem(${index})"><i class="fas fa-times"></i></button>
	    <p class="pText">${data}</p>
	    </div>
	    `
	})
	itemShow.innerHTML = items;
}
showItem()

function deleteItem(index){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showItem()
}

function clearTask(){    
	localStorage.clear()
	showItem()
}

/** SCHEDULE */



/** CLOCK */

var weekday = ['Domingo', 'Lunes', 'Martes',
            'Miércoles', 'Jueves', 'Viernes', 'Sabado'];

class DigitalClock {
	constructor(element) {
		this.element = element;
	}

	start() {
		setInterval(()=>{
			this.update();
		}, 500)
	}

	update() {
		const parts = this.getParts();
		const dayFormatted = weekday[parts.day];
		const minuteFormatted = parts.minutes.toString().padStart(2,'0');
		const timeFormatted = parts.hour.toString().padStart(2,'0')+':'+minuteFormatted;
		const amPm = parts.isAm ? "AM" : "PM";

		this.element.querySelector(".clock-day").textContent = dayFormatted;
		this.element.querySelector(".clock-time").textContent = timeFormatted;
		this.element.querySelector(".clock-ampm").textContent = amPm;
	}

	getParts(){
		const now = new Date();

		return{
			day: now.getDay(),
			hour: now.getHours() % 12 || 12,
			minutes: now.getMinutes(),
			isAm: now.getHours() < 12
		};
	}
}

const clockElement = document.querySelector(".clock");
const clockObject = new DigitalClock(clockElement);

clockObject.start();

/** ZOOM GENERATOR */

const zoomCode = document.getElementsByClassName('zoomCode')[0];
const zoomPass = document.getElementsByClassName('zoomPass')[0];
const zoomName = document.getElementsByClassName('zoomName')[0];

const zoomGenerator = document.getElementsByClassName('zoomInput')[0];

const generateButton = document.getElementsByClassName('generateButton')[0];
 
generateButton.addEventListener('click', function (e){
		var zoomLink = '';
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			zoomLink += 'zoomus';
		}else{
			zoomLink += 'zoommtg';
		}
		zoomLink += '://zoom.us/join?confno=';
		if(zoomCode.value.trim() != 0){
			zoomLink += zoomCode.value.trim();
			if(zoomPass.value.trim() != 0){
				zoomLink += '&pwd=' + zoomPass.value.trim();
			}
			if(zoomName.value.trim() != 0){
				zoomLink += '&uname='+zoomName.value.trim();
			}
		}
		console.log(zoomLink);
		document.querySelector(".zoomLink").textContent = zoomLink;
})
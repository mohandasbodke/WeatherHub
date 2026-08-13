let url = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "620cfa7fcd527cad40b06c700e7dedc5";

let input = document.querySelector("input");
let btn = document.querySelector("button");
let cityElement=document.querySelector(".city");
let cuntryElement=document.querySelector(".cuntry")
let tempElement=document.querySelector(".tem")
let descriptionElement=document.querySelector(".description");
let feels_likeElement=document.querySelector(".feelDeg")
let timeElement=document.querySelector(".tme")
let dateElement=document.querySelector(".dateDay");

let tempraElement=document.querySelector(".tempra");
let windSpeedElement=document.querySelector(".windSpeed");
let humidityElement=document.querySelector(".humidity");
let visibilityElement=document.querySelector(".visibility");
let addressElement=document.querySelector(".addressCity");


btn.addEventListener("click", function () {

    let city = input.value;

    axios.get(url, {
        params: {
            q: city,
            appid: apiKey,
            units: "metric"
        }
    })
    .then((response) => {
        console.dir(response.data);
		let country = response.data.sys.country;
		let cityName = response.data.name;
		let temp=response.data.main.temp;
		let description=response.data.weather[0].description;
		let feels_like=response.data.main.feels_like;
		let visibility=response.data.visibility;
		let wind=response.data.wind.speed;
		let humidity=response.data.main.humidity;



		

		console.log("City:", cityName);
		console.log("Country:", country);
		console.log("temprature:", temp);
		console.log("description:", description);
		console.log("feels_like:",feels_like);
		console.log("visibility:",visibility);
		console.log("wind:",wind);
		console.log("humidity:",humidity);
		
		cityElement.innerText=cityName;
		
		tempElement.innerText=temp;
		descriptionElement.innerText=description;
		feels_likeElement.innerText=feels_like;
		tempraElement.innerText=`${temp}'C`;
		windSpeedElement.innerText=`${wind}km/hr`;
		humidityElement.innerText=`${humidity}%`;
		visibilityElement.innerText=`${visibility/1000}Km`;
		
		
				
				
		//date and time
		let now=new Date();
		let hours = now.getHours();
		let minutes = now.getMinutes();
		let date=now.getDay();
		let month=now.getMonth();
		let year=now.getFullYear();
		let ampm;
		if(hours>12){
			ampm="AM";
		}else{
			ampm="PM";
		}
		

		timeElement.innerText=`${hours}:${minutes} ${ampm}`;
		dateElement.innerText=`${date}-${month}-${year}`;
		
		console.log(hours);
		console.log(minutes);
		console.log(date);
		console.log(month);
		console.log(year);
		
		axios.get("https://nominatim.openstreetmap.org/search", {
		    params: {
		        q: city,
		        format: "json",
		        addressdetails: 1
		    }
		})
		.then((response)=>{
			let address = response.data[0].address;

			    console.log("City:", address.city);
			    console.log("State:", address.state);
			    console.log("Country:", address.country);
				
				
				addressElement.innerText=` ${address.city} ${address.state} ${address.country} `;	
				
				
		})
		
		
		
		
		
		input.value = "";
    })
    .catch((error) => {
        console.log(error);
        input.value = "";
		alert(`${city} is not valid city`)
    });
});
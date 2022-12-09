/* Global Variables */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const appId = "caff73215369d913dec8fe3f30a23ddf";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// get the weather from the api 
const getWeatherData = async (url) => {
    const request = await fetch(url);
    try {
        const data = await request.json()
        return data
    }
    catch (error) {
        console.log("error", error);
    }
};

//post the data to the server and store it there
const postProjectData = async (url, data) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// add event listner to listen to the click of the submit button

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    //get the user enters 
    const zipCode = document.getElementById('zip').value
    const felling = document.getElementById('feelings').value;

    if (zipCode) {
        //get the temp from the api by sending the zipCode as params
        getWeatherData(apiUrl + "zip=" + zipCode + ",us&appid=" + appId + "&units=imperial")
            .then(function (data) {
                // store data to the server
                postProjectData('http://localhost:3000/sendprojectdata', { temperature: data.main.temp, date: newDate, felling })
                    .then(
                        //get stored fata from server and update the UI
                        updateUI()
                    )
            })
    }


}



const updateUI = async () => {
    const request = await fetch("http://localhost:3000/getprojectdata");
    try {
        const data = await request.json()
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = Math.round(data.temperature)+ ' degrees';
        document.getElementById('content').innerHTML = data.felling;
    }
    catch (error) {
        console.log("error", error);
    }
};
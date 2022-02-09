setTimeout(() => {
    document.querySelector("#loading").style.visibility = "hidden"
}, 1000)

let date = document.querySelector("input[type=date]");
let birthHour = document.querySelector("#hour");
let birthMinute = document.querySelector("#minute");
let birthSecond = document.querySelector("#second");

date.addEventListener("change", showAge);

let details = document.querySelectorAll(".precise input")
details.forEach(info => {
    info.addEventListener("change", (e) => {
        let min = +info.getAttribute("min")
        let max = +info.getAttribute("max")

        if (e.target.value > min && e.target.value < max) showAge();   
        else info.value = "";
    })
})

function showAge(){
    document.body.style.backgroundImage = "url('./img/images.jfif')";
    let birthday = new Date(date.value)

    let countDown = document.querySelector(".countdown")
    let precise = document.querySelector(".precise")
    let image = document.querySelector("img")

    countDown.style.display = "flex"
    precise.style.display = "block"
    image.style.display = "none"

    
    setInterval(() => {
        
        birthday = new Date(date.value)
        let currentDate = new Date();

        let years = currentDate.getFullYear() - birthday.getFullYear();
        let months = currentDate.getMonth() - birthday.getMonth();
        let days = currentDate.getDate() - birthday.getDate();
        let hours = currentDate.getHours() - (+birthHour.value || birthday.getHours());
        let minutes = currentDate.getMinutes() - (+birthMinute.value || birthday.getHours());
        let seconds = currentDate.getSeconds() - (+birthSecond.value || birthday.getSeconds());

        if (seconds < 0) { minutes--; seconds += 60; }
        if (minutes < 0) { hours--; minutes += 60; }
        if (hours < 0) { days--; hours += 24; }
        if (days < 0) { months--; days += 31; }
        if (months < 0) { years--; months += 12; }

        let showYear = document.querySelector("#years");
        let showMonth = document.querySelector("#months");
        let showDay = document.querySelector("#days");
        let showHour = document.querySelector("#hours");
        let showMinute = document.querySelector("#minutes");
        let showSecond = document.querySelector("#seconds");

        showYear.innerText = (years+"").padStart(2, "0")
        showMonth.innerText = (months+"").padStart(2, "0")        
        showDay.innerText = (days+"").padStart(2, "0")        
        showHour.innerText = (hours+"").padStart(2, "0")        
        showMinute.innerText = (minutes+"").padStart(2, "0")
        showSecond.innerText = (seconds+"").padStart(2, "0")
    }, 1000)

    if (new Date() - birthday < 0) {
        alert("Please enter a valid date!");
        date.value = ""
    }
}

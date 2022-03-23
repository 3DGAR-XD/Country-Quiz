let puntos = 0;
const api = "https://restcountries.com/v3.1/all";

async function getData() {
	try{
		const response = await fetch(api);
		// console.log(response);
		if(!response.ok) {
			document.querySelector(".home").classList.add("d-none");
			document.querySelector(".status").classList.remove("d-none");
			document.getElementById("errorCode").innerHTML += response.status;
			if(400 <= parseInt(response.status) && parseInt(response.status) < 500) document.getElementById("errorDescription").innerHTML += "No se han encontrado los datos";
			else if(500 <= parseInt(response.status) && parseInt(response.status) < 600) document.getElementById("errorDescription").innerHTML += "Hay un problema en el servidor";
		}
		const data = await response.json();
		// document.querySelector(".home").classList.remove("d-none");
		const country = data[Math.floor(Math.random() * data.length)]; // get a random country
		if (typeof country.capital === "undefined") country.capital = "No tiene capital";
		// console.log(data);
		// Generador de país y relleno de opciones
		const randomize = Math.floor(Math.random() * 5);
		document.querySelectorAll(".capital")[randomize].innerHTML = country.capital;
		document.querySelectorAll(".capital").forEach((option) => {
			if (option.textContent === "") {
				const opt = option;
				opt.innerHTML = data[Math.floor(Math.random() * data.length)].capital;
			}
		});
		document.querySelectorAll(".timezones")[randomize].innerHTML = country.timezones[0];
		document.querySelectorAll(".timezones").forEach((option) => {
			if (option.textContent === "") {
				const opt = option;
				opt.innerHTML = data[Math.floor(Math.random() * data.length)].timezones[0];
			}
		});
		document.querySelectorAll(".tld")[randomize].innerHTML = country.tld[0];
		document.querySelectorAll(".tld").forEach((option) => {
			if (option.textContent === "") {
				const opt = option;
				opt.innerHTML = data[Math.floor(Math.random() * data.length)].tld[0];
			}
		});
		document.querySelectorAll(".population")[randomize].innerHTML = `${country.population} personas`;
		document.querySelectorAll(".population").forEach((option) => {
			if (option.textContent === "") {
				const opt = option;
				opt.innerHTML = `${data[Math.floor(Math.random() * data.length)].population} personas`;
			}
		});
		document.querySelectorAll(".independent")[0].innerHTML = "No";
		document.querySelectorAll(".independent")[1].innerHTML = "Sí";
		// Validación de respuestas
		document.querySelector("#capital button").addEventListener("click", () => {
			document.querySelector("#capital button").disabled = true;
			document.querySelector("#capital select").disabled = true;
			if (document.querySelector("#capital select").value == country.capital) {
				puntos += 1;
				document.querySelector("#capital select").style.backgroundColor = "#00d912";
			} else document.querySelector("#capital select").style.backgroundColor = "#e30000";
		}, false);
		document.querySelector("#timezones button").addEventListener("click", () => {
			document.querySelector("#timezones button").disabled = true;
			document.querySelector("#timezones select").disabled = true;
			if (document.querySelector("#timezones select").value === country.timezones[0]) {
				puntos += 1;
				document.querySelector("#timezones select").style.backgroundColor = "#00d912";
			} else document.querySelector("#timezones select").style.backgroundColor = "#e30000";
		}, false);
		document.querySelector("#tld button").addEventListener("click", () => {
			document.querySelector("#tld button").disabled = true;
			document.querySelector("#tld select").disabled = true;
			if (document.querySelector("#tld select").value === country.tld[0]) {
				puntos += 1;
				document.querySelector("#tld select").style.backgroundColor = "#00d912";
			} else document.querySelector("#tld select").style.backgroundColor = "#e30000";
		}, false);
		document.querySelector("#population button").addEventListener("click", () => {
			document.querySelector("#population button").disabled = true;
			document.querySelector("#population select").disabled = true;
			if (document.querySelector("#population select").value === `${country.population} personas`) {
				puntos += 1;
				document.querySelector("#population select").style.backgroundColor = "#00d912";
			} else document.querySelector("#population select").style.backgroundColor = "#e30000";
		}, false);
		document.querySelector("#independent button").addEventListener("click", () => {
			document.querySelector("#independent button").disabled = true;
			document.querySelector("#independent select").disabled = true;
			if (document.querySelector("#independent select").value === "Sí" && country.independent === true) {
			puntos += 1;
			document.querySelector("#independent select").style.backgroundColor = "#00d912";
			} else document.querySelector("#independent select").style.backgroundColor = "#e30000";
		});
		document.getElementById("generar").addEventListener("click", () => {
			document.getElementById("generar").classList.add("disabled");
			document.getElementById("jugar").classList.remove("disabled");
			document.querySelector(".country").innerHTML += country.translations.spa.common;
			document.querySelectorAll("label").forEach((label) => {
				const labelText = label;
				labelText.innerHTML += country.translations.spa.common;
			});
			document.querySelector("#independent>label").innerHTML += " es un país independiente"; // show the country name
			document.querySelector("#timezones>label").innerHTML += " (Es posible que haya más de una respuesta correcta)";
		}, false);
		document.getElementById("jugar").addEventListener("click", () => {
			document.querySelector(".home").classList.add("d-none");
			document.querySelector(".game").classList.remove("d-none");
		}, false);
		document.querySelector(".end").addEventListener("click", () => {
			document.querySelector(".game").classList.add("d-none");
			document.querySelector(".result").classList.remove("d-none");
			document.getElementById("score").style.fontWeight = "bold";
			if (puntos === 1) document.getElementById("score").innerHTML = `${puntos} punto`;
			else document.getElementById("score").innerHTML = `${puntos} puntos`;
		}, false);
	}
	catch (error) {
		console.trace(error);
		alert(error.message);
	}
}
window.onload = getData();

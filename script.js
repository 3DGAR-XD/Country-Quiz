let puntos = 0;
const api = "https://restcountries.com/v3.1/all";
async function getData() {
	try {
		const response = await fetch(api);
		console.log(response);
		if(!response.ok) {
			if (400 <= parseInt(response.status) && parseInt(response.status) < 500) throw new Error (`No se han encontrado los datos ${response.status}`);
			else if (500 <= parseInt(response.status) && parseInt(response.status) < 600)  throw new Error (`Hay un problema en el servidor ${response.status}`);
		}
		const data = await response.json();

		document.querySelector(".home").classList.remove("d-none");
		document.body.style.backgroundImage = "url(./bg.jpg)";
		document.body.style.backgroundColor = "#eee";
		document.body.style.backgroundPositionX = `${Math.round(Math.random()*100)}%`;
                document.body.style.backgroundPositionY = `${Math.round(Math.random()*100)}%`;

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
		document.querySelector(".home").classList.add("d-none");
		document.querySelector(".game").classList.add("d-none");
		document.querySelector(".result").classList.add("d-none");
		document.querySelector(".status").classList.remove("d-none");
		console.error(error);
		if (error.message === "Failed to fetch") window.location.reload(true);
		if (error.message.startsWith(`Hay un problema en el servidor`)) {
			document.querySelector("img").src = "./server.png";
			document.querySelector("img").alt = "No hay conexion en el servidor";
			document.getElementById("errorCode").innerHTML += error.message.substring(31, 34);
			document.getElementById("errorDescription").innerHTML += error.message.substring(0, 31);
		}
		else if (error.message.startsWith(`No se han encontrado los datos`)) {
			document.querySelector("img").src = "./connection.png";
			document.querySelector("img").alt = "No hay conexion a internet";
			document.getElementById("errorCode").innerHTML += error.message.substring(31, 34);
			document.getElementById("errorDescription").innerHTML += error.message.substring(0,31);
		}
	}
}
getData();

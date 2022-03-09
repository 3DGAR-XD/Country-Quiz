/* eslint-disable prefer-destructuring */
let puntos = 0;

const api = "https://restcountries.com/v3.1/all";
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    const country = data[Math.floor(Math.random() * data.length)]; // get a random country
    document.querySelector("button.generar").addEventListener("click", () => {
      document.querySelector("button.generar").classList.add("disabled");
      document.querySelector("button.jugar").classList.remove("disabled");
      document.querySelector("strong").innerHTML += country.translations.spa.common;
      document.querySelectorAll("label").forEach((label) => {
        const labelText = label;
        labelText.innerHTML += country.translations.spa.common;
      });
      document.querySelector("#independent label").innerHTML += " es un país independiente"; // show the country name
      document.querySelector("#timezones label").innerHTML += " (Es posible que haya más de una respuesta correcta)";
      // Generador de país y relleno de opciones
      const randomize = Math.floor(Math.random() * 5);
      if (document.getElementsByClassName("capital")) {
        document.querySelectorAll(".capital")[randomize].innerHTML = country.capital;
        document.querySelectorAll(".capital").forEach((option) => {
          if (option.textContent === "") {
            const opt = option;
            opt.innerHTML = data[Math.floor(Math.random() * data.length)].capital;
          }
        });
      } if (document.getElementsByClassName("timezones")) {
        document.querySelectorAll(".timezones")[randomize].innerHTML = country.timezones[0];
        document.querySelectorAll(".timezones").forEach((option) => {
          if (option.textContent === "") {
            const opt = option;
            opt.innerHTML = data[Math.floor(Math.random() * data.length)].timezones[0];
          }
        });
      } if (document.getElementsByClassName("tld")) {
        document.querySelectorAll(".tld")[randomize].innerHTML = country.tld[0];
        document.querySelectorAll(".tld").forEach((option) => {
          if (option.textContent === "") {
            const opt = option;
            opt.innerHTML = data[Math.floor(Math.random() * data.length)].tld[0];
          }
        });
      } if (document.getElementsByClassName("population")) {
        document.querySelectorAll(".population")[randomize].innerHTML = `${country.population} personas`;
        document.querySelectorAll(".population").forEach((option) => {
          if (option.textContent === "") {
            const opt = option;
            opt.innerHTML = `${data[Math.floor(Math.random() * data.length)].population} personas`;
          }
        });
      } if (document.getElementsByClassName("independent")) {
        document.querySelectorAll(".independent")[0].innerHTML = "No";
        document.querySelectorAll(".independent")[1].innerHTML = "Sí";
      }
      // Validación de respuestas
      document.querySelector("#capital button").addEventListener("click", () => {
        if (document.querySelector("#capital select").value == country.capital) {
          puntos += 1;
          document.querySelector("#capital select").style.backgroundColor = "#00d912";
        } else { document.querySelector("#capital select").style.backgroundColor = "#e30000"; }
        document.querySelector("#capital button").disabled = true;
      });
      document.querySelector("#timezones button").addEventListener("click", () => {
        if (document.querySelector("#timezones select").value === country.timezones[0]) {
          puntos += 1;
          document.querySelector("#timezones select").style.backgroundColor = "#00d912";
        } else { document.querySelector("#timezones select").style.backgroundColor = "#e30000"; }
        document.querySelector("#timezones button").disabled = true;
      });
      document.querySelector("#tld button").addEventListener("click", () => {
        if (document.querySelector("#tld select").value === country.tld[0]) {
          puntos += 1;
          document.querySelector("#tld select").style.backgroundColor = "#00d912";
        } else { document.querySelector("#tld select").style.backgroundColor = "#e30000"; }
        document.querySelector("#tld button").disabled = true;
      });
      document.querySelector("#population button").addEventListener("click", () => {
        if (document.querySelector("#population select").value === `${country.population} personas`) {
          puntos += 1;
          document.querySelector("#population select").style.backgroundColor = "#00d912";
        } else { document.querySelector("#population select").style.backgroundColor = "#e30000"; }
        document.querySelector("#population button").disabled = true;
      });
      document.querySelector("#independent button").addEventListener("click", () => {
        if (document.querySelector("#independent select").value === "Sí" && country.independent === true) {
          puntos += 1;
          document.querySelector("#independent select").style.backgroundColor = "#00d912";
        } else { document.querySelector("#independent select").style.backgroundColor = "#e30000"; }
        document.querySelector("#independent button").disabled = true;
      });
    });
    document.querySelector("button.jugar").addEventListener("click", () => {
      document.querySelector(".home").classList.add("d-none");
      document.querySelector(".game").classList.remove("d-none");
    }, !1);
    document.querySelector("[type=submit]").addEventListener("click", () => {
      document.querySelector(".game").classList.add("d-none");
      document.querySelector(".result").classList.remove("d-none");
      document.getElementById("score").style.fontWeight = "bold";
      if (puntos === 1) document.getElementById("score").innerHTML = `${puntos} punto`;
      else document.getElementById("score").innerHTML = `${puntos} puntos`;
    }, !1);
  });

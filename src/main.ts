import "bootstrap/scss/bootstrap.scss";
let puntos = 0;
const api = "https://restcountries.com/v3.1/all";
(async function getData(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      if (400 <= response.status && response.status < 500)
        throw new Error(`No se han encontrado los datos ${response.status}`);
      else if (500 <= response.status && response.status < 600)
        throw new Error(`Hay un problema en el servidor ${response.status}`);
    }
    const data = await response.json();
    const home = document.querySelector(".home");
    const game = document.querySelector(".game");
    if (home) home.classList.remove("d-none");
    document.body.style.backgroundImage = "url('./bg.jpg')";
    document.body.style.backgroundColor = "#eee";
    document.body.style.backgroundPositionX = `${Math.round(
      Math.random() * 100
    )}%`;
    document.body.style.backgroundPositionY = `${Math.round(
      Math.random() * 100
    )}%`;

    const country = data[Math.floor(Math.random() * data.length)]; // get a random country
    if (typeof country.capital === "undefined")
      country.capital = "No tiene capital";
    // console.log(data);
    // Generador de país y relleno de opciones
    const randomize = Math.floor(Math.random() * 5);
    document.querySelectorAll(".capital")[randomize].innerHTML =
      country.capital;
    document.querySelectorAll(".capital").forEach((option) => {
      if (option.textContent === "") {
        const opt = option;
        opt.innerHTML = data[Math.floor(Math.random() * data.length)].capital;
      }
    });
    document.querySelectorAll(".timezones")[randomize].innerHTML =
      country.timezones[0];
    document.querySelectorAll(".timezones").forEach((option) => {
      if (option.textContent === "") {
        const opt = option;
        opt.innerHTML =
          data[Math.floor(Math.random() * data.length)].timezones[0];
      }
    });
    document.querySelectorAll(".tld")[randomize].innerHTML = country.tld[0];
    document.querySelectorAll(".tld").forEach((option) => {
      if (option.textContent === "") {
        const opt = option;
        opt.innerHTML = data[Math.floor(Math.random() * data.length)].tld[0];
      }
    });
    document.querySelectorAll(".population")[
      randomize
    ].innerHTML = `${country.population} personas`;
    document.querySelectorAll(".population").forEach((option) => {
      if (option.textContent === "") {
        const opt = option;
        opt.innerHTML = `${
          data[Math.floor(Math.random() * data.length)].population
        } personas`;
      }
    });
    document.querySelectorAll(".independent")[0].innerHTML = "No";
    document.querySelectorAll(".independent")[1].innerHTML = "Sí";
    // Validación de respuestas
    const capButton = document.querySelector(
      "#capital button"
    ) as HTMLButtonElement;
    if (capButton)
      capButton.addEventListener(
        "click",
        () => {
          const capSelect = document.querySelector(
            "#capital select"
          ) as HTMLSelectElement;
          capButton.disabled = true;
          capSelect.disabled = true;
          if (capSelect.value == country.capital) {
            puntos += 1;
            capSelect.style.backgroundColor = "#00d912";
          } else capSelect.style.backgroundColor = "#e30000";
        },
        false
      );
    const timezonesButton = document.querySelector(
      "#timezones button"
    ) as HTMLButtonElement;
    timezonesButton.addEventListener(
      "click",
      () => {
        timezonesButton.disabled = true;
        const timezonesSelect = document.querySelector(
          "#timezones select"
        ) as HTMLSelectElement;
        timezonesSelect.disabled = true;
        if (timezonesSelect.value === country.timezones[0]) {
          puntos += 1;
          timezonesSelect.style.backgroundColor = "#00d912";
        } else timezonesSelect.style.backgroundColor = "#e30000";
      },
      false
    );
    const domainButton = document.querySelector(
      "#tld button"
    ) as HTMLButtonElement;
    domainButton.addEventListener(
      "click",
      () => {
        const domainSelect = document.querySelector(
          "#tld select"
        ) as HTMLSelectElement;
        domainButton.disabled = true;
        domainSelect.disabled = true;
        if (domainSelect.value === country.tld[0]) {
          puntos += 1;
          domainSelect.style.backgroundColor = "#00d912";
        } else domainSelect.style.backgroundColor = "#e30000";
      },
      false
    );
    const populationButton = document.querySelector(
      "#population button"
    ) as HTMLButtonElement;
    populationButton.addEventListener(
      "click",
      () => {
        const populationSelect = document.querySelector(
          "#population select"
        ) as HTMLSelectElement;
        populationButton.disabled = true;
        populationSelect.disabled = true;
        if (populationSelect.value === `${country.population} personas`) {
          puntos += 1;
          populationSelect.style.backgroundColor = "#00d912";
        } else populationSelect.style.backgroundColor = "#e30000";
      },
      false
    );
    const independentButton = document.querySelector(
      "#independent button"
    ) as HTMLButtonElement;

    independentButton.addEventListener("click", () => {
      const independentSelect = document.querySelector(
        "#independent select"
      ) as HTMLSelectElement;
      independentButton.disabled = true;
      independentSelect.disabled = true;
      if (independentSelect.value === "Sí" && country.independent === true) {
        puntos += 1;
        independentSelect.style.backgroundColor = "#00d912";
      } else independentSelect.style.backgroundColor = "#e30000";
    });
    const generate = document.getElementById("generar") as HTMLButtonElement;
    const play = document.getElementById("jugar") as HTMLButtonElement;
    generate.addEventListener(
      "click",
      () => {
        generate.classList.add("disabled");
        play.classList.remove("disabled");
        const countryTag =  document.querySelector(".country") as HTMLElement
        countryTag.innerHTML +=
          country.translations.spa.common;
        document.querySelectorAll("label").forEach((label) => {
          const labelText = label;
          labelText.innerHTML += country.translations.spa.common;
        });
        const independentLabel = document.querySelector("#independent>label") as HTMLLabelElement
        independentLabel.innerHTML +=
          " es un país independiente"; // show the country name
        const timezonesLabel = document.querySelector("#timezones>label") as HTMLLabelElement
        timezonesLabel.innerHTML +=
          " (Es posible que haya más de una respuesta correcta)";
      },
      false
    );
    play.addEventListener(
      "click",
      () => {
        if (home)home.classList.add("d-none");
        if(game)game.classList.remove("d-none");
      },
      false
    );
    const end = document.querySelector(".end") as HTMLElement
    end.addEventListener(
      "click",
      () => {
        if(game)game.classList.add("d-none");
        const result = document.querySelector(".result") as HTMLElement
        result.classList.remove("d-none");
        const score = document.getElementById("score") as HTMLElement
        score.style.fontWeight = "bold";
        if (puntos === 1)
          score.innerHTML = `${puntos} punto`;
        else score.innerHTML = `${puntos} puntos`;
      },
      false
    );
  } catch (error:any) {
    const home = document.querySelector(".home") as HTMLElement
    home.classList.add("d-none");
    const game = document.querySelector(".game") as HTMLElement
    const result = document.querySelector(".result") as HTMLElement
    const status = document.querySelector(".status") as HTMLElement
    const img = document.querySelector("img") as HTMLImageElement
    const errorCode = document.getElementById("errorCode") as HTMLElement
    const errorDescription = document.getElementById("errorDescription") as HTMLElement
    game.classList.add("d-none");
    result.classList.add("d-none");
    status.classList.remove("d-none");
    if (error.message === "Failed to fetch") window.location.reload();
    if (error.message.startsWith(`Hay un problema en el servidor`)) {
      img.src = "./server.png";
      img.alt = "No hay conexion en el servidor";
      errorCode.innerHTML += error.message.substring(
        31,
        34
      );
      errorDescription.innerHTML +=
        error.message.substring(0, 31);
    } else if (error.message.startsWith(`No se han encontrado los datos`)) {
      img.src = "./connection.png";
      img.alt = "No hay conexion a internet";
      errorCode.innerHTML += error.message.substring(
        31,
        34
      );
      errorDescription.innerHTML +=
        error.message.substring(0, 31);
    }
  }
})(api);

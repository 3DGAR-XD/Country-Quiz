# Country Quiz

This is a country test.
In this game you cannot choose the country you want to play with, to make it more complex, the country is chosen **randomly** and asked about its characteristics.

I used API `fetch` to fetch the data, `response.json()` to convert the promise to json file, I randomized with `Math.random()` the choice of countries and answers and in an `option` put the correct answer.

The `Verificar` button checks the value of the `select` and compares it with that of the API.

- The score is shown in the `span` at the end of the quiz

The API that I used for this game is this [Rest Countries v3.1 All](https://restcountries.com/v3.1/all)
## Notes
- I am upgrading this project using TypeScript and Vite :)
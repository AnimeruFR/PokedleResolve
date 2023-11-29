let submitButton = document.getElementById("submitButton");
let listeZone;

submitButton.addEventListener("click", async function () {
    let color = document.getElementById("colorValue").value;
    let p = document.getElementById("p");
    p.innerHTML = color;

    for (let i = 1; i < 152; i++) {
        await test(i);
    }
});

async function test(indice) {
    try {
        let responseJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${indice}`).then(response => response.json());
        let weight = responseJson.weight);
        console.log(responseJson.name);
        console.log("taille = " + responseJson.height);
        let liveArea = await test2(responseJson)
        let color = await test3(responseJson);
    } catch (error) {
        console.error(error);
    }
}

async function test2(file) {
    try {
        let area = [];
        let responseJson2 = await fetch(file.location_area_encounters).then(response => response.json());

        for (let elt of responseJson2) {
            area.push(elt.location_area.name);
        }

        listeZone = area;
        console.log('Process completed');
        return listeZone;
    } catch (error) {
        console.error(error);
    }
}

async function test3(file) {
    try {
        let responseJson3 = await fetch(file.species.url).then(response => response.json());
        console.log(responseJson3.color.name);
    } catch (error) {
        console.error(error);
    }
}

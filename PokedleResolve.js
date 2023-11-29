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
        let type1 = responseJson.types[0].type.name
        if(responseJson.types[1] != undefined){
            let type2 = responseJson.types[1].type.name
        } else {
            let type2 = "Nothing"
        }
        let liveArea = await askLiving(responseJson)
        let color = await askColor(responseJson);
        //stade d'évolution
        let weight = responseJson.weight;
        let height = responseJson.height;
        console.log(responseJson)
        //console.log(responseJson.name);
    } catch (error) {
        console.error(error);
    }
}

async function askLiving(file) {
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

async function askColor(file) {
    try {
        let responseJson3 = await fetch(file.species.url).then(response => response.json());
        console.log(responseJson3.color.name);
    } catch (error) {
        console.error(error);
    }
}

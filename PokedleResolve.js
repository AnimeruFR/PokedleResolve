let submitButton = document.getElementById("submitButton");
let listeZone;
let liste_info = []
let liste_of_possible = []

submitButton.addEventListener("click", async function () {
    let type1Value = document.getElementById("type1Value").value;
    let type2Value = document.getElementById("type2Value").value;
    let colorValue = document.getElementById("colorValue").value;
    let weightValue = document.getElementById("weightValue").value;
    let heightValue = document.getElementById("heightValue").value;

    let p = document.getElementById("p");
    let list_of_all = []

    for (let i = 1; i < 152; i++) {
        await test(i)
    }

    list_of_all = await test(151)

    if(type1Value != "" && type2Value != "" && colorValue != "" && weightValue != "" && heightValue != ""){
        for(let elt of list_of_all){
            if(elt[1] == type1Value && elt[2] == type2Value && elt[4] == colorValue && elt[5] == weightValue && elt[6] == heightValue){
                liste_of_possible.push(elt[0])
            }
        }
    }

    if(liste_of_possible.length == 0){
        alert("No response found")
    }
    p.innerHTML = liste_of_possible
});

async function test(indice) {
    try {
        let responseJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${indice}`).then(response => response.json());
        let type1 = responseJson.types[0].type.name
        let type2 = "Nothing"
        if(responseJson.types[1] != undefined){
            type2 = responseJson.types[1].type.name
        }
        let liveArea = await askLiving(responseJson)
        let color = await askColor(responseJson);
        let weight = responseJson.weight;
        let height = responseJson.height;
        let name = responseJson.name

        liste_info[indice-1] = [name,type1,type2,liveArea,color,weight,height]

        return liste_info
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
        return responseJson3.color.name;
    } catch (error) {
        console.error(error);
    }
}

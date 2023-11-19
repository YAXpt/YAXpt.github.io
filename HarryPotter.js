const API_URL = 'https://wizard-world-api.herokuapp.com';

window.onload = async () => {

    const dataWiz = await getWizards();
    var element = document.getElementById('personatges');
    var id=0;
    for (const wizard of dataWiz) {
        const newElement = document.createElement('ul');
        if(wizard.firstName !== null)
            newElement.innerHTML = `<li><h3> ${wizard.firstName} ${wizard.lastName} </h3></li>`;
        else
            newElement.innerHTML = `<li><h3> ${wizard.lastName} </h3></li>`;
        newElement.innerHTML += `<button onclick="destacarPers('${wizard.firstName}', '${wizard.lastName}')">Destacar</button><h4>Elixirs:</h4>`
        for (const elixir of wizard.elixirs) {
            newElement.innerHTML += `${elixir.name}<ul id="${id}"><button onclick="mostrarIngredients('${elixir.id}', '${id}')">Mostra ingredients</button></ul>`;
            id++;
        }
        element.appendChild(newElement);
    }

    const dataHou = await getHouses();
    for (const houses of dataHou) {
        const element2 = document.getElementById(houses.name);
        element2.innerHTML += `<div class="cases"><h3>${houses.name}</h3>
        <p>Fundador: ${houses.founder}</p>
        <p>Elemento: ${houses.element}</p>
        <p>Animal: ${houses.animal}</p>
        <p>Fantasma: ${houses.ghost}</p>
        <p>Sala comú: ${houses.commonRoom}</p></div>
        <button onclick="destacarCasa('${houses.name}')">Destacar</button>`;
    }
};



async function getHouses() {
    const respuesta = await fetch(`${API_URL}/Houses`);
    const data = await respuesta.json();
    return data;
}

async function getWizards() {
    const respuesta = await fetch(`${API_URL}/Wizards`);
    const data = await respuesta.json();
    return data;
}

async function mostrarIngredients(idElixir, id){
    var ubicacion = document.getElementById(id);
    const respuesta = await fetch(`${API_URL}/Elixirs/${idElixir}`);
    const data = await respuesta.json();

    ubicacion.innerHTML = '';
    if (data.ingredients.length !== 0){
        ubicacion.innerHTML += `<button onclick="amagarIngredients('${idElixir}', '${id}')">Amaga ingredients</button>`;
        for (const ingredient of data.ingredients){
            ubicacion.innerHTML += `<li>${ingredient.name}</li>`; 
        }
    }
    else {
        ubicacion.innerHTML += `<button onclick="amagarIngredients('${idElixir}', '${id}')">
                            Amaga ingredients</button><p>No hi ha ingredients coneguts</p>`;
    }
    

}

function amagarIngredients(idElixir, id){
    var ubicacion = document.getElementById(id);
    ubicacion.innerHTML = '';
    ubicacion.innerHTML += `<button onclick="mostrarIngredients('${idElixir}', '${id}')">Mostra ingredients</button>`;
}

function destacarPers(nom, cognom){
    var ubicacion = document.getElementById('persFlotant');
    debugger;
    if(nom == "null")
        ubicacion.innerHTML = `Personatge destacat: ${cognom}<button onclick="treureDeDestacats('persFlotant')">X</button>`;
    else
        ubicacion.innerHTML = `Personatge destacat: ${nom} ${cognom}<button onclick="treureDeDestacats('persFlotant')">X</button>`;
}

function destacarCasa(nomCasa){
    var ubicacion = document.getElementById('casaFlotant');
    ubicacion.innerHTML = `Casa destacada: ${nomCasa} <button onclick="treureDeDestacats('casaFlotant')">X</button>`;
}

function treureDeDestacats(id){
    var ubicacion = document.getElementById(id);
    ubicacion.innerHTML = '';
}
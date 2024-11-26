const pokemonPage = document.querySelector('#pokemonPage')
const pokedex = document.querySelector('#pokedex')
const pName = document.querySelector('#pName')
const pNumber = document.querySelector('#pNumber')
const api = 'https://pokeapi.co/api/v2/'

async function getPokemonsSpecies(id, info, gender) {
    const response = await fetch(`${api}pokemon-species/${id}`)
    
    if (info == 'egg_groups') {
        const data = await response.json().then(dataSpecie => dataSpecie.egg_groups.map(eggs => eggs.name).join(', '))

        return `${data}`
    } else if (info == 'specie'){
        const data = await response.json().then(genera => genera.genera[7].genus)
        return `${data}`.split(' ')[0]
    } else {
        const data = await response.json().then(gender => gender.gender_rate)
        
        if (gender == 'male') {
            switch (data) {
                case 1:
                    return '87,5%'
                case 2:
                    return '75%'
                case 3:
                    return '50%'
                case 4:
                    return '25%'
                case 5:
                    return '0%'
                case 0:
                    return '100%'
            }
        } else {
            switch (data) {
                case 1:
                    return '12,5%'
                case 2:
                    return '25%'
                case 3:
                    return '50%'
                case 4:
                    return '75%'
                case 5:
                    return '100%'
                case 0:
                    return '0%'
            }
        }
    }
}

function closeDetail(){
        pokedex.removeAttribute('hidden')

        pokemonPage.setAttribute('hidden', '')
        pokemonPage.innerHTML = ""
}

function showTab(tab) {
    const info = document.querySelector("#info-table")
    const move = document.querySelector("#move-table")
    const sele = document.querySelector(tab)

    info.setAttribute("hidden","")
    move.setAttribute("hidden","")

    sele.removeAttribute("hidden")

}

async function getPokemon(pokemon) {
    const response = await fetch(`${api}pokemon/${pokemon}`)
    const data = await response.json()

    if (!pokedex.hasAttribute('hidden')) {
        pokedex.setAttribute('hidden', '')
        pokemonPage.removeAttribute('hidden')

        pokemonPage.innerHTML = `
            <section class="content-stats ${data.types[0].type.name}" id="pokemonInfo">
                <div class="pokemon-top">
                    <span class="material-symbols-outlined" onclick="closeDetail()">arrow_back</span>
                    <!--span class="material-symbols-outlined">favorite</span-->
                </div>

                <div class="pokemon-name name">
                    <span>${data.name[0].toUpperCase() + data.name.substring(1)}</span>
                    <span>#${data.id}</span>
                </div>

                <div class="details">
                    <ol class="types">
                    ${data.types.map((type) => `<li class="type">${type.type.name}</li>`).join('')}
                    </ol>
                </div>

                <div class="pokemon-image">        
                    <img src="${data.sprites.other.home.front_default}" alt="${data.name}">
                </div>
            </section>

            <div class="pokemon-stats" id="pokemonStats">
                <nav>
                    <ul>
                        <li class="active" onclick="showTab('#info-table')">About</li>
                        <li onclick="showTab('#move-table')">Moves</li>
                    </ul>
                </nav>

                <div id="info-table">
                    <table>
                        <tr>
                            <td class="item">Species</td>
                            <td class="description">${await getPokemonsSpecies(data.id, 'specie')}</td>
                        </tr>
                        <tr>
                            <td class="item">Height</td>
                            <td class="description">${data.height/10} m</td>
                        </tr>
                        <tr>
                            <td class="item">Weight</td>
                            <td class="description">${data.weight/10} Kg</td>
                        </tr>
                        <tr>
                            <td class="item">Abilities</td>
                            <td class="description">${data.abilities.map((ability) => ability.ability.name).join(', ')}</td>
                        </tr>
                        <th>Breeding</th>
                            <tr>
                                <td class="item">Gender</td>
                                <td class="description gender">
                                    <span class="material-symbols-outlined male">
                                        male
                                    </span> ${await getPokemonsSpecies(data.id, ' ', 'male')}
                                    <span class="material-symbols-outlined female">
                                        female
                                    </span> ${await getPokemonsSpecies(data.id, ' ', 'female')}
                                </td>
                            </tr>
                            <tr>
                                <td class="item">Egg Groups</td>
                                <td class="description">${await getPokemonsSpecies(data.id,   'egg_groups')}</td>
                            </tr>
                    </table>
                </div>
                <div id="move-table" hidden>
                    <table>
                        <tr>
                            <td class="description">${data.moves.map((move) => move.move.name).join(', ')}</td>
                        </tr>
                    </table>
                </div>

            </div>
            `
    } 
}
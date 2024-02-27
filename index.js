
// initialize localStorage and load data
if (localStorage.getItem('data') == null) {
    console.log('resetting data')
    const data = {
        Raid: [300, 9],
        SicklyRolyPoly: [300, 5],
        RolyPoly: [300,5],
        Moth: [300,5],
        Mosquito: [300,5],
        TigerMosquito: [300,5],
        Bombardier: [300,5],
        OrbWeaverJr: [300,5],
        InfectedGnat: [300,5],
        InfectedWolfSpider: [300,5],
        WaterFlea: [300,5],
        SpinyWaterFlea: [300,5],
        FireSoldierAnt: [300,5],
        LadybirdLarva: [300,5],
        Ladybird: [300,5],
        TermiteKing: [300,5],
        GreenShieldBug: [300,5],
        BlackWidow: [300,5],
        BlackWidowling: [300,5],
        WaspDrone: [300,5],
        Scarab: [300,5]
    } 
    localStorage.setItem('data', JSON.stringify(data))
}
const data = JSON.parse(localStorage.getItem('data'))


// select buttons
const saveButton = document.getElementById('save-button')
const resetButton = document.getElementById('reset-button')

// put a listener on the buttons
saveButton.addEventListener('click', SaveData)
// resetButton.addEventListener('click', LoadData) // can't preventDefault the way this is currently written

// make a function that loads everything, and call it on page load
LoadData()
function LoadData(){
    CreateEmptyTable()
    for (var creatureName of Object.keys(data)) {
        const table = document.querySelector('table')
        const newRow = document.createElement('tr')
        
        const label = document.createElement('td')
        const lastKilled = document.createElement('td')
        const respawnTime = document.createElement('td')
        const killDay = document.createElement('td')
        const deleteButton = document.createElement('button')

        label.innerText = creatureName
        lastKilled.innerHTML = `<input type="number" name="" id="${creatureName}-lastkill" value="${data[creatureName][0]}" min="1" max="9999"  style="width:80px">`
        respawnTime.innerHTML = `<input type="number" name="" id="${creatureName}-respawn" value="${data[creatureName][1]}" min="1" max="9" style="width:100px">`
        killDay.innerHTML = `<input type="text" id="${creatureName}-kill" value="${data[creatureName][0] + data[creatureName][1]}" style="width:70px">`
        deleteButton.innerText = 'Card Dropped'
        deleteButton.setAttribute('id', `${creatureName}-delete`)
        deleteButton.addEventListener('click', DeleteRow)
        
        newRow.appendChild(label)
        newRow.appendChild(lastKilled)
        newRow.appendChild(respawnTime)
        newRow.appendChild(killDay)
        newRow.appendChild(deleteButton)
        table.appendChild(newRow)
        
        // console.log(creatureName)
    }
}

// make a function that saves everything, it's called by the listener
function SaveData(e) {
    e.preventDefault()
    // id the kill day boxes with the creature name
    // then grab the contents by iterating through the data object for id's
    for (var creatureName of Object.keys(data)) {
        const day = CheckDay(Number(document.getElementById(`${creatureName}-lastkill`).value), creatureName)
        const respawn = Number(document.getElementById(`${creatureName}-respawn`).value)
        
        const list = [day, respawn]
        
        data[creatureName] = list
    }
    // save the data
    localStorage.setItem('data', JSON.stringify(data))


    // delete the contents of the table and re-create it with the new data
    // don't bother trying to find which row you need to replace
    // and we happen to already have a function that does exactly this job!
    LoadData()
}

function CheckDay(day, creatureName) {
    // console.log(`CheckDay for ${creatureName}: ${day}`)
    if (day == 0) {
        // console.log('returning data')
        return data[creatureName][0]
    }
    else {
        // console.log('returning day')
        return day
    }
}

function DeleteRow(e) {
    e.preventDefault()
    const creatureName = e.currentTarget.id.split('-')[0]
    // console.log(`target: ${creatureName}`)
    delete data[creatureName]
    // localStorage.setItem('data', data)
    LoadData()
}

function CreateEmptyTable() {
    const table = document.querySelector('table')
    table.innerHTML = `
    <tr>
        <th>Creature</th>
        <th>Last Killed</th>
        <th>Respawn Time</th>
        <th>Kill Day</th>
    </tr>
    `
}
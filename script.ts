const board = document.querySelector('.board') as HTMLDivElement;
const player  = document.querySelector('.player') as HTMLDivElement;
const money = document.querySelector('.money') as HTMLElement;
const rollDice = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
const buyProperty = document.querySelector('.buy-property') as HTMLButtonElement;
const diceResult = document.querySelector('.dice-result') as HTMLElement;

let moneyTotal = 500;

let pos: number = 1;

const arr: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
    39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13,
    38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14,
    37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15,
    36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
    35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17,
    34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
    33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
    32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,

]

interface propertiesInterface {
    id: number,
    name: string,
    type: string,
    description?: string,
    color?: string,
    price?: number,
    rent?: number[],
    amount?: number;
    houseCost?: number,
    hotelCost?: number,
    rentMultiplier?: number[]
}

let properties: propertiesInterface[] = [
    {
        "id": 1,
        "name": "GO",
        "type": "special",
        "description": "Collect $200 when you pass."
    },
    {
        "id": 2,
        "name": "Mediterranean Avenue",
        "type": "property",
        "color": "brown",
        "price": 60,
        "rent": [2, 10, 30, 90, 160, 250],
        "houseCost": 50,
        "hotelCost": 50
    },
    {
        "id": 3,
        "name": "Community Chest",
        "type": "special",
        "description": "Draw a Community Chest card."
    },
    {
        "id": 4,
        "name": "Baltic Avenue",
        "type": "property",
        "color": "brown",
        "price": 60,
        "rent": [4, 20, 60, 180, 320, 450],
        "houseCost": 50,
        "hotelCost": 50
    },
    {
        "id": 5,
        "name": "Income Tax",
        "type": "tax",
        "amount": 200
    },
    {
        "id": 6,
        "name": "Reading Railroad",
        "type": "railroad",
        "price": 200,
        "rent": [25, 50, 100, 200]
    },
    {
        "id": 7,
        "name": "Oriental Avenue",
        "type": "property",
        "color": "lightblue",
        "price": 100,
        "rent": [6, 30, 90, 270, 400, 550],
        "houseCost": 50,
        "hotelCost": 50
    },
    {
        "id": 8,
        "name": "Chance",
        "type": "special",
        "description": "Draw a Chance card."
    },
    {
        "id": 9,
        "name": "Vermont Avenue",
        "type": "property",
        "color": "lightblue",
        "price": 100,
        "rent": [6, 30, 90, 270, 400, 550],
        "houseCost": 50,
        "hotelCost": 50
    },
    {
        "id": 10,
        "name": "Connecticut Avenue",
        "type": "property",
        "color": "lightblue",
        "price": 120,
        "rent": [8, 40, 100, 300, 450, 600],
        "houseCost": 50,
        "hotelCost": 50
    },
    {
        "id": 11,
        "name": "Jail",
        "type": "special",
        "description": "Just visiting or in jail."
    },
    {
        "id": 12,
        "name": "St. Charles Place",
        "type": "property",
        "color": "pink",
        "price": 140,
        "rent": [10, 50, 150, 450, 625, 750],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 13,
        "name": "Electric Company",
        "type": "utility",
        "price": 150,
        "rentMultiplier": [4, 10]
    },
    {
        "id": 14,
        "name": "States Avenue",
        "type": "property",
        "color": "pink",
        "price": 140,
        "rent": [10, 50, 150, 450, 625, 750],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 15,
        "name": "Virginia Avenue",
        "type": "property",
        "color": "pink",
        "price": 160,
        "rent": [12, 60, 180, 500, 700, 900],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 16,
        "name": "St. James Place",
        "type": "property",
        "color": "orange",
        "price": 180,
        "rent": [14, 70, 200, 550, 750, 950],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 17,
        "name": "Tennessee Avenue",
        "type": "property",
        "color": "orange",
        "price": 180,
        "rent": [14, 70, 200, 550, 750, 950],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 18,
        "name": "New York Avenue",
        "type": "property",
        "color": "orange",
        "price": 200,
        "rent": [16, 80, 220, 600, 800, 1000],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 19,
        "name": "Free Parking",
        "type": "special",
        "description": "No action."
    },
    {
        "id": 20,
        "name": "Kentucky Avenue",
        "type": "property",
        "color": "red",
        "price": 220,
        "rent": [18, 90, 250, 700, 875, 1050],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 21,
        "name": "Indiana Avenue",
        "type": "property",
        "color": "red",
        "price": 220,
        "rent": [18, 90, 250, 700, 875, 1050],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 22,
        "name": "Illinois Avenue",
        "type": "property",
        "color": "red",
        "price": 240,
        "rent": [20, 100, 300, 750, 925, 1100],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 23,
        "name": "B&O Railroad",
        "type": "railroad",
        "price": 200,
        "rent": [25, 50, 100, 200]
    },
    {
        "id": 24,
        "name": "Atlantic Avenue",
        "type": "property",
        "color": "yellow",
        "price": 260,
        "rent": [22, 110, 330, 800, 975, 1150],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 25,
        "name": "Ventnor Avenue",
        "type": "property",
        "color": "yellow",
        "price": 260,
        "rent": [22, 110, 330, 800, 975, 1150],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 26,
        "name": "Water Works",
        "type": "utility",
        "price": 150,
        "rentMultiplier": [4, 10]
    },
    {
        "id": 27,
        "name": "Marvin Gardens",
        "type": "property",
        "color": "yellow",
        "price": 280,
        "rent": [24, 120, 360, 850, 1025, 1200],
        "houseCost": 150,
        "hotelCost": 150
    },
    {
        "id": 28,
        "name": "Go to Jail",
        "type": "special",
        "description": "Move directly to Jail. Do not pass GO, do not collect $200."
    },
    {
        "id": 29,
        "name": "Pacific Avenue",
        "type": "property",
        "color": "green",
        "price": 300,
        "rent": [26, 130, 390, 900, 1100, 1275],
        "houseCost": 200,
        "hotelCost": 200
    },
    {
        "id": 30,
        "name": "North Carolina Avenue",
        "type": "property",
        "color": "green",
        "price": 300,
        "rent": [26, 130, 390, 900, 1100, 1275],
        "houseCost": 200,
        "hotelCost": 200
    },
    {
        "id": 31,
        "name": "Pennsylvania Avenue",
        "type": "property",
        "color": "green",
        "price": 320,
        "rent": [28, 150, 450, 1000, 1200, 1400],
        "houseCost": 200,
        "hotelCost": 200
    },
    {
        "id": 32,
        "name": "Short Line",
        "type": "railroad",
        "price": 200,
        "rent": [25, 50, 100, 200]
    },
    {
        "id": 33,
        "name": "Park Place",
        "type": "property",
        "color": "darkblue",
        "price": 350,
        "rent": [35, 175, 500, 1100, 1300, 1500],
        "houseCost": 200,
        "hotelCost": 200
    },
    {
        "id": 34,
        "name": "Luxury Tax",
        "type": "tax",
        "amount": 100
    },
    {
        "id": 35,
        "name": "Boardwalk",
        "type": "property",
        "color": "darkblue",
        "price": 400,
        "rent": [50, 200, 600, 1400, 1700, 2000],
        "houseCost": 200,
        "hotelCost": 200
    },
    {
        "id": 36,
        "name": "St. Charles Place",
        "type": "property",
        "color": "pink",
        "price": 140,
        "rent": [10, 50, 150, 450, 625, 750],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 37,
        "name": "Electric Company",
        "type": "utility",
        "price": 150,
        "rentMultiplier": [4, 10]
    },
    {
        "id": 38,
        "name": "States Avenue",
        "type": "property",
        "color": "pink",
        "price": 140,
        "rent": [10, 50, 150, 450, 625, 750],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 39,
        "name": "Virginia Avenue",
        "type": "property",
        "color": "pink",
        "price": 160,
        "rent": [12, 60, 180, 500, 700, 900],
        "houseCost": 100,
        "hotelCost": 100
    },
    {
        "id": 40,
        "name": "Free Parking",
        "type": "special",
        "description": "No action."
    },
]


// properties.map(item => {
//
//     let propertyHtml = `<div class="property">`;
//
//     propertyHtml += `<div class="property-color ${item.color || ''}">${item.name}</div>`;
//
//     if (item.price !== undefined) {
//         propertyHtml += `<h3>$ ${item.price}</h3>`;
//     }
//     if (item.rent !== undefined) {
//         propertyHtml += `<h4>Rent: ${item.rent[0]}</h4>`;
//     }
//     if (item.description !== undefined) {
//         propertyHtml += `<h4>${item.description}</h4>`;
//     }
//     if (item.houseCost !== undefined) {
//         propertyHtml += `<h4>House Cost: $${item.houseCost}</h4>`;
//     }
//     if (item.hotelCost !== undefined) {
//         propertyHtml += `<h4>Hotel Cost: $${item.hotelCost}</h4>`;
//     }
//     if (item.rentMultiplier !== undefined) {
//         propertyHtml += `<h4>Rent Multiplier: ${item.rentMultiplier[0]}</h4>`;
//     }
//     if (item.amount !== undefined) {
//         propertyHtml += `<h4>Amount: $${item.amount}</h4>`;
//     }
//     propertyHtml += `</div>`;
//     board.innerHTML += propertyHtml;
// });

function updateBoard() {
    board.innerHTML = ""
    arr.map(item => {
        board.innerHTML += `
   <div class="${item ? 'property': ""}">
            ${item === pos ? '<div class="player"></div>' : ""}
        </div>`
    })

}
updateBoard()

rollDice[0].onclick = () => {
    diceRoll()
}

rollDice[1].onclick = () => {
    console.log("anything")
}

function diceRoll() {
    const rnd = Math.floor(Math.random() * 12)
    if (rnd < 2) {
        return
    }
    pos += rnd

    if(pos > 40) {
        moneyTotal += 200;
        money.innerHTML = String(moneyTotal);
        pos -= 40
    }
    updateBoard()
    diceResult.innerHTML = `You have rolled: ${rnd}`

}

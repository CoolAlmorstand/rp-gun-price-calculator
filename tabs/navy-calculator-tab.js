import { DeckCard } from "./deck-card-component.js"

const template = document.createElement("template")
template.innerHTML = `
    <style>
        :host {
            scrollbar-width: none; 
            -ms-overflow-style: none;
            font-size: 16px;
            margin-top: 20px;
            width: 100%;
            max-width: 450px;
            height: auto;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
        }
        .main-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            box-sizing: border-box;
            border-radius: 15px;
            gap: 30px;
            /*border: 1px solid #3498db;*/
            background-color: white;
        }
        
        .labels-container {
            overflow-x: auto;
            overflow-y; hidden;
            scrollbar-width: none; 
            -ms-overflow-style: none;
            width: 49%;
            row-gap: 10px;
            background-color: transparent;
            display: flex;
            white-space: no-wrap;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between
        }
        
        .labels-container span {
            white-space: nowrap;
        }
        
        .input-container {
            overflow-x: auto;
            overflow-y; hidden;
            scrollbar-width: none; 
            -ms-overflow-style: none;
            width: 49%;
            row-gap: 10px;
            background-color: transparent;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between
        }
        
        .input-group span {
            font-size: 14px;
            white-space: nowrap;
        }
        
        input {
            width: 100px;
        }
        
        select {
            width: 108px;
        }
        
        .bottom-bar {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        
        .calculate-button {
            margin-top: 10px;
            width: 80px;
            height: 30px;
            border-radius: 10px;
            background-color: white;
            border: 1px solid #3498db;
        }
        
        .deck-container {
            border: 3px solid #e1e6eb;
            border-radius: 25px 25px 15px 15px;
            margin-top: 30px;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            background-color: #f5f7fa;
        }
        
        .deck-container-top-bar {
            margin-top: -3px;
            padding: 5px 20px 5px 20px;
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            border-radius: 12px 12px 0 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background-color: #e1e6eb;
            border: 1px solid #cfd8e0;
            /*background-color: blue;*/
        }
        
        .deck-cards-container {
            margin-bottom: 20px;
            width: 100%;
            height: 250px;
            overflow-y: auto;
            overflow-x: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            scrollbar-width: none; 
            -ms-overflow-style: none; 
        }
        
        .deck-container-top-bar span {
            margin: 0;
            font-size: 16px;
            font-weight: 405;
            white-space: nowrap;
            color: #2c3e50;
        }
        
        .plus-button {
            font-size: 30px !important;
        }
    </style>
    
    <div class="main-container">
    
        <div class="labels-container">
            <span> class: </span>
            <span> length (feet): </span>
            <span> beam (feet): </span>
            <span> weight (tons): </span>
            <span> crew size (humans): </span>
            <span> rig type </span>
            <span> service years </span>
        </div>
        
        <div class="input-container">
        
            <select id="class-input">
                <option value="1"> Sloop </option>
                <option value="2"> Corvette </option>
                <option value="3"> Frigate </option>
                <option value="4"> 4th Rate </option>
                <option value="5"> 3th Rate </option>
                <option value="6"> 2nd Rate </option>
                <option value="7"> 1st Rate </option>
            </select>
        
            <input id="length-input">
            <input id="beam-input">
            <input id="weight-input">
            <input id="crew-size-input">
            
            <select id="rig-type-input">
                <option value="1"> Sloop </option>
                <option value="2"> Brig </option>
                <option value="3"> Ship Rigged </option>
            </select>
            
            <input id="service-years-input">
        </div>
    </div>
    
    <div class="deck-container" id="deck-container">
        <div class="deck-container-top-bar">
            <span> decks </span>
            <span class="plus-button" id="plus-button"> + </span>
        </div>
        
        <div class="deck-cards-container" id="deck-cards-container">
            
        </div>
    </div>
    
    <div class="bottom-bar">
        <button class="calculate-button" id="calculate-button"> Calculate </button>
        <div id="result-rp"></div>
        <div id="result-time"></div>
        <div id="result-tech-cost"></div>
        <div id="result-production-cost"></div>
    </div>
`

export class NavyCalculatorTab extends HTMLElement {
    
    constructor() {
        super();
    
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        this.decks = []
        this.deckCardsContainer = this.shadowRoot.getElementById("deck-cards-container")
        this.addDeckButton = this.shadowRoot.getElementById("plus-button")
        this.calculateButton = this.shadowRoot.getElementById("calculate-button");
        this.resultRp = this.shadowRoot.getElementById("result-rp");
        this.resultTime = this.shadowRoot.getElementById("result-time");
        this.resultTechCost = this.shadowRoot.getElementById("result-tech-cost");
        this.resultProductionCost = this.shadowRoot.getElementById("result-production-cost")
        this.classInput = this.shadowRoot.getElementById("class-input");
        this.lengthInput = this.shadowRoot.getElementById("length-input");
        this.beamInput = this.shadowRoot.getElementById("beam-input")
        this.weightInput = this.shadowRoot.getElementById("weight-input");
        this.crewSizeInput = this.shadowRoot.getElementById("crew-size-input")
        this.rigTypeInput = this.shadowRoot.getElementById("rig-type-input");
        this.serviceYearsInput = this.shadowRoot.getElementById("service-years-input")
}
    
    connectedCallback() {
        this.calculateButton.addEventListener("click", () => this.calculateReasearch() )
        this.addDeckButton.addEventListener("click", () => this.addDeck() )
    }
    

    removeObjectFromArray(array, objectToRemove) {
        const index = array.indexOf(objectToRemove);
        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }
    
    
    addDeck() {
        const deck = new DeckCard()
        this.decks.push(deck)
        this.deckCardsContainer.appendChild(deck)
        
        deck.addEventListener("remove-deck", () => {
            deck.remove()
            this.removeObjectFromArray(this.decks, deck)
        })
    }
   
    
    getPopulationFactor(population){

        if(population < 50000000) {
            return 0.85
        }
        
        else if(population < 100000000){
            return 0.75
        }
        else if(population < 300000000){
           return 0.25
        }
        
        else {
            return 0.15
        }
    }
    
    getPopulationFactor(population) {

        if(population < 50000000) {
            return 0.85
        }
        
        else if(population < 100000000){
            return 0.75
        }
        else if(population < 300000000){
           return 0.25
        }
        
        else {
            return 0.15
        }
    }
    
    
    getBoardSideWeight(){
        let boardSideWeight = 0
        for(let deck of this.decks){
            boardSideWeight += deck.broadSideWeight
        }
        
        return boardSideWeight
    }
    
    getNumberOfUniqueGun(){
        
        let uniqueGuns = 0
        const seenGuns = []
        
        for(let deck of this.decks) {
            for(let gun of deck.guns){
                
                const gunWeight = gun.gunWeight
                if(!seenGuns.includes(gunWeight) ){
                    seenGuns.push(gunWeight)
                    uniqueGuns += 1
                }
            }
        }
        
        return uniqueGuns
    }
    
    calculateReasearch() {
        
        //window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=QmXP4sKNg3uzEkxt"
        
        const population = parseInt( localStorage.getItem("RP:calculator:population") )
        const students = parseInt( localStorage.getItem("RP:calculator:students") )
        const maxStudents = parseInt( localStorage.getItem("RP:calculator:max-students") )
        
        const populationFactor = this.getPopulationFactor(population)
        const studentRatio = students / maxStudents
        
        const classCostFactor = parseInt(this.classInput.value)
        
        const lengthRp = ( parseFloat(this.lengthInput.value) / 10 ) * 1.5
        const beamRp = parseFloat(this.beamInput.value) / 10 
        const weightRp = ( parseFloat(this.weightInput.value) / 100 ) * 2
        const crewSizeRp = (parseFloat(this.crewSizeInput.value) / 100 ) * 2
        const rigTypeRp = parseInt(this.rigTypeInput.value)
        const serviceYearsRp = ( parseFloat(this.serviceYearsInput.value) / 10 ) * 0.5
        
        const broadSideWeightRp = ( this.getBoardSideWeight() / 10 ) * 2.5
        const gunTypeRp = this.getNumberOfUniqueGun() * 1.5
        const deckRp = this.decks.length * 2
        
        const totalRP = lengthRp + beamRp + weightRp + crewSizeRp + rigTypeRp + serviceYearsRp + broadSideWeightRp + gunTypeRp + deckRp;
        
        const totalTimeCost = totalRP / ( ( students * 0.01 ) * (populationFactor + studentRatio) )
        const techCost = ( ( totalRP / 2 ) + (totalTimeCost * 2) ) / 20
        const productionCost = ( ( totalRP * 200 ) + ( totalTimeCost * 500 ) + ( classCostFactor * 2000) ) / 1000
        
        this.resultRp.innerHTML = `Total Rp: ${totalRP}`
        this.resultTime.innerHTML = `Research Time: ${totalTimeCost.toFixed(2)} years`
        this.resultTechCost.innerHTML = `Research Cost: ${techCost.toFixed(3)}m`
        this.resultProductionCost.innerHTML = `ProductionCost Cost: ${productionCost.toFixed(3)}k`
    }
}

customElements.define("navy-calculator-tab", NavyCalculatorTab)
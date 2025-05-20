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
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
            border-radius: 15px;
            /*border: 1px solid #3498db;*/
            background-color: white;
        }
        
        .input-group {
            margin-left: 5px;
            width: 100%;
            max-width: 300px;
            height: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 15px;
            background-color: transparent;
            align-items: center;
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
        
        .calculate-button {
            margin-top: 10px;
            width: 80px;
            height: 30px;
            border-radius: 10px;
            background-color: white;
            border: 1px solid #3498db;
        }
    </style>
    
    <div class="main-container">
        <div class="input-group">
            <span> caliber (inch): </span>
            <input id="caliber-input">
        </div>
        
        <div class="input-group">
            <span> effective range (yards): </span>
            <input id="effective-range-input">
        </div>
        
        <div class="input-group">
            <span> fire rate (RPM): </span>
            <input id="fire-rate-input">
        </div>  
        
        <div class="input-group">
            <span> reload speed (seconds): </span>
            <input id="reload-speed-input">
        </div>  
        
        <div class="input-group">
            <span> weight (lbs): </span>
            <input id="weight-input">
        </div>  
        
        <div class="input-group">
            <span> ease of use: </span>
            <select id="ease-of-use-input">
                <option value="1">Complex</option>
                <option value="2">Medium</option>
                <option value="3">Simple</option>
            </select>
        </div>  
        
        <div class="input-group">
            <span> durability: </span>
            <select id="durability-input">
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>
        </div>  
        
        <div class="input-group">
            <span> accuracy: </span>
            <select id="accuracy-input">
                <option value="1">Low</option>
                <option value="2">Moderate</option>
                <option value="2.5">Moderate-High</option>
                <option value="3">High</option>
            </select>
        </div>  
        
        <button class="calculate-button" id="calculate-button"> Calculate </button>
        
        <div id="result-rp"></div>
        <div id="result-time"></div>
        <div id="result-cost"></div>
    </div>
`

export class GunCalculatorTab extends HTMLElement {
    
    constructor() {
        super();
    
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        this.caliberInput = this.shadowRoot.getElementById("caliber-input");
        this.effectiveRangeInput = this.shadowRoot.getElementById("effective-range-input");
        this.fireRateInput = this.shadowRoot.getElementById("fire-rate-input");
        this.reloadSpeedInput = this.shadowRoot.getElementById("reload-speed-input");
        this.weightInput = this.shadowRoot.getElementById("weight-input");
        this.easeOfUseInput = this.shadowRoot.getElementById("ease-of-use-input");
        this.durabilityInput = this.shadowRoot.getElementById("durability-input");
        this.accuracyInput = this.shadowRoot.getElementById("accuracy-input");
        this.calculateButton = this.shadowRoot.getElementById("calculate-button");
        
        this.resultRp = this.shadowRoot.getElementById("result-rp")
        this.resultTime = this.shadowRoot.getElementById("result-time")
        this.resultCost = this.shadowRoot.getElementById("result-cost")
}
    
    connectedCallback() {
        this.calculateButton.addEventListener("click", () => this.calculateReasearch() )
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
    
    calculateReasearch() {
        
        const population = parseInt( localStorage.getItem("RP:calculator:population") )
        const students = parseInt( localStorage.getItem("RP:calculator:students") )
        const maxStudents = parseInt( localStorage.getItem("RP:calculator:max-students") )
        
        const populationFactor = this.getPopulationFactor(population)
        const studentRatio = students / maxStudents
        
        const caliberRp = ( ( parseFloat(this.caliberInput.value) ) / 10 ) * 2
        const rangeRp = ( parseFloat( this.effectiveRangeInput.value ) / 10 ) * 2
        const rofRP = parseFloat( this.fireRateInput.value ) * 3
        const weightRP = ( 20 - parseFloat(this.weightInput.value) ) * 1.5
        const easeRP = parseFloat(this.easeOfUseInput.value) * 2
        const reloadRP = ( 30 / parseFloat( this.reloadSpeedInput.value) ) * 2
        const durabilityRP = parseFloat(this.durabilityInput.value) * 2
        const accuracyRP = parseFloat(this.accuracyInput.value) * 2
        
        const totalRP = (
            caliberRp + rangeRp + rofRP + weightRP +
            easeRP + reloadRP + durabilityRP + accuracyRP
        )
        
        const totalTimeCost = totalRP / ( ( students * 0.01 ) * (populationFactor + studentRatio) )
        const totalCost = ( ( totalRP / 2 ) + (totalTimeCost * 2) ) / 20
        
        this.resultRp.innerHTML = `Total Rp: ${totalRP}`
        this.resultTime.innerHTML = `Research Time: ${totalTimeCost.toFixed(2)} years`
        this.resultCost.innerHTML = `Research Cost: ${totalCost.toFixed(3)}m`
    }
}

customElements.define("gun-calculator-tab", GunCalculatorTab)
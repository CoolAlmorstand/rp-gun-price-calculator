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
        
        .projectile-type-container {
            width: 120px;
            height: 25px;
            background-color: transparent;
            display: flex;
            box-sizing: border-box;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
        }
        
        .double-input-container {
            display: flex;
            box-sizing: border-box;
            flex-direction: row;
            justify-content: space-between;
            background-color: transparent;
            overflow-x: auto;
            width: 120px;
        }
        
        .double-input-container input {
            width: 49px;
        }
        
        label {
            
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 8px;
        }
        
        label input {
            margin: 0;
            width: 18px;
        }
    </style>
    
    <div class="main-container">
    
        <div class="labels-container">
            <span> caliber (inch): </span>
            <span> barrel length (meters): </span>
            <span> total weight (lbs): </span>
            <span> crew size (humans): </span>
            <span> transport type </span>
            <span> projectile types </span>
            <span> effective range (yards): </span>
            <span> max range (yards): </span>
            <span> cannister range (yards): </span>
            <span> rate of fire (RPM): </span>
        </div>
        
        <div class="input-container">
            <input id="caliber-input">
            <input id="barrel-length-input">
            <input id="total-weight-input">
            <input id="crew-size-input">

            <select id="transport-type-input">
                <option value="1"> Ox </option>
                <option value="2">Horse Drawn</option>
                <option value="3">Wheeled</option>
            </select>
            
            <div class="projectile-type-container" id="projectile-type-input">
                <label><input type="checkbox" value="shell"> Shell</label>
                <label><input type="checkbox" value="shot"> Shot</label>
                <label><input type="checkbox" value="cannister"> Cannister</label>
            </div>
            
            <div class="double-input-container">
                <input id="effective-range-min-range-input" placeholder="min">
                <input id="effective-range-max-range-input" placeholder="max">
            </div>
            
            <div class="double-input-container">
                <input id="top-range-min-range-input" placeholder="min">
                <input id="top-range-max-range-input" placeholder="max">
            </div>
            
            <div class="double-input-container">
                <input id="cannister-range-min-range-input" placeholder="min">
                <input id="cannister-range-max-range-input" placeholder="max">
            </div>
            
            <input id="rare-of-firet-input">
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

export class ArtilleryCalculatorTab extends HTMLElement {
    
    constructor() {
        super();
    
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        // Button and result elements
        this.calculateButton = this.shadowRoot.getElementById("calculate-button");
        this.resultRp = this.shadowRoot.getElementById("result-rp");
        this.resultTime = this.shadowRoot.getElementById("result-time");
        this.resultTechCost = this.shadowRoot.getElementById("result-tech-cost");
        this.resultProductionCost = this.shadowRoot.getElementById("result-production-cost")
    
        // Input field references
        this.caliberInput = this.shadowRoot.getElementById("caliber-input");
        this.barrelLengthInput = this.shadowRoot.getElementById("barrel-length-input");
        this.totalWeightInput = this.shadowRoot.getElementById("total-weight-input");
        this.crewSizeInput = this.shadowRoot.getElementById("crew-size-input")
        this.transportTypeInput = this.shadowRoot.getElementById("transport-type-input");
    
        // Save parent of checkbox group
        this.projectileTypeContainer = this.shadowRoot.getElementById("projectile-type-input");
    
        // Range inputs
        this.effectiveRangeMinInput = this.shadowRoot.getElementById("effective-range-min-range-input");
        this.effectiveRangeMaxInput = this.shadowRoot.getElementById("effective-range-max-range-input");
        this.topRangeMinInput = this.shadowRoot.getElementById("top-range-min-range-input");
        this.topRangeMaxInput = this.shadowRoot.getElementById("top-range-max-range-input");
        this.cannisterRangeMinInput = this.shadowRoot.getElementById("cannister-range-min-range-input");
        this.cannisterRangeMaxInput = this.shadowRoot.getElementById("cannister-range-max-range-input");

        this.fireRateInput = this.shadowRoot.getElementById("rare-of-firet-input");
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
    
    getProjectileTypeValue() {
        
        const checkboxes = this.shadowRoot.querySelectorAll('#projectile-type-input input[type="checkbox"]');
        let count = 0;
        checkboxes.forEach(box => {
            if (box.checked) count++;
        });
        return count;
    }
    
    calculateReasearch() {
                
        const population = parseInt( localStorage.getItem("RP:calculator:population") )
        const students = parseInt( localStorage.getItem("RP:calculator:students") )
        const maxStudents = parseInt( localStorage.getItem("RP:calculator:max-students") )
        
        const populationFactor = this.getPopulationFactor(population)
        const studentRatio = students / maxStudents
        
        const caliberRp = ( ( parseFloat(this.caliberInput.value) ) / 10 ) * 2
        const barrelLengthRp = parseFloat(this.barrelLengthInput.value)
        const totalWeightRp = ( parseFloat(this.totalWeightInput.value) / 100 ) * 1.5
        const crewSizeRp = parseFloat( this.crewSizeInput.value )
        const transportTypeRp = parseFloat( this.transportTypeInput.value)
        const projectileTypeRp = this.getProjectileTypeValue() * 2
        const rateOfFireRp = parseFloat(this.fireRateInput.value) * 3
        
        const effectiveRangeRp = (
            (
                 ( ( parseFloat(this.topRangeMinInput.value) + parseFloat(this.effectiveRangeMaxInput.value) ) / 2 )
            / 100 ) * 2
        )
        
        const maxRangeRp = (
           ( ( parseFloat(this.effectiveRangeMinInput.value) + parseFloat(this.topRangeMaxInput.value) ) / 2 ) 
           / 100
        )
        
        const cannisterRangeRp = (
            (
                 ( ( parseFloat(this.cannisterRangeMinInput.value) + parseFloat(this.cannisterRangeMaxInput.value) ) / 2 )
            / 100 ) * 0.5
        )
        
        const totalRP = (
            caliberRp + barrelLengthRp + totalWeightRp + crewSizeRp + transportTypeRp + 
            projectileTypeRp + rateOfFireRp + effectiveRangeRp + maxRangeRp + cannisterRangeRp
        )
        
        const totalTimeCost = totalRP / ( ( students * 0.01 ) * (populationFactor + studentRatio) )
        const techCost = ( ( totalRP / 2 ) + (totalTimeCost * 2) ) / 20
        const productionCost = ( ( totalRP * 3.5 ) + ( totalTimeCost * 0.5 ) ) / 1000
        
        
        this.resultRp.innerHTML = `Total Rp: ${totalRP}`
        this.resultTime.innerHTML = `Research Time: ${totalTimeCost.toFixed(2)} years`
        this.resultTechCost.innerHTML = `Research Cost: ${techCost.toFixed(3)}m`
        this.resultProductionCost.innerHTML = `ProductionCost Cost: ${productionCost.toFixed(3)}k`
    }
}

customElements.define("artillery-calculator-tab", ArtilleryCalculatorTab)
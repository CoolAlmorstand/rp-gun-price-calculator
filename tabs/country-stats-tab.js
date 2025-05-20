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
            width: 80%;
            max-width: 250px;
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
    </style>
    
    <div class="main-container">
        <div class="input-group">
            <span> population: </span>
            <input id="population-input" data-value="population" >
        </div>
        
        <div class="input-group">
            <span> students: </span>
            <input id="students-input" data-value="students" >
        </div>
        
        <div class="input-group">
            <span> max-students: </span>
            <input id="max-students-input" data-value="max-students">
        </div>  
    </div>
`

export class CountryStatsTab extends HTMLElement {
    
    constructor() {
        super()
        
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        
        this.populationInput = this.shadowRoot.getElementById("population-input")
        this.studentsInput = this.shadowRoot.getElementById("students-input")
        this.maxStudentsPopulationInput = this.shadowRoot.getElementById("max-students-input")
    }
    
    connectedCallback() {
    
        const population = parseInt( localStorage.getItem("RP:calculator:population") )
        const students = parseInt( localStorage.getItem("RP:calculator:students") )
        const maxStudents = parseInt( localStorage.getItem("RP:calculator:max-students") )
        
        if(population) { this.populationInput.value = population }
        if(students) { this.studentsInput.value = students }
        if(maxStudents) { this.maxStudentsPopulationInput.value = maxStudents }
        
        this.populationInput.addEventListener("input", (event) => this.inputChange(event))
        this.studentsInput.addEventListener("input", (event) => this.inputChange(event))
        this.maxStudentsPopulationInput.addEventListener("input", (event) => this.inputChange(event))
    }
    
    inputChange(event){
        
        const newValue = parseInt(event.target.value)
        const valueId = event.target.dataset.value
        
        console.log(valueId, newValue)
        localStorage.setItem(`RP:calculator:${valueId}`, newValue)
   }
}

customElements.define("country-stats-tab", CountryStatsTab)
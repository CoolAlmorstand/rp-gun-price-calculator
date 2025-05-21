const template = document.createElement("template")

template.innerHTML = `

    <style>
        :host {
            font-size: 16px;
            width: 100%;
            height: 80px;
            display: flex;
            flex-shrink: 0;
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            overflow: auto;
            background-color: #e1e6eb;
        }
        
        .main-container {
            display: flex;
            width: 100%;
            height: 50px;
            padding: 0 10px 0 10px;
            box-sizing: border-box;
            flex-direction: row;
            align-items: center;
            background-color: transparent;
            justify-content: space-between;
        }
        
        .input-group {
            height: 100%;
            width: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            background-color: transparent;
        }
        
        .input-group input {
            width: 50px;
            height: 15px
        }
        
        .input-group span {
            font-size: 12px;
        }
        
        .remove-button {
            background-color: transparent;
            border: 1px solid red;
            color: red;
            margin-top: -44px;
            height: 20px;
            width: 20px
        }
    </style>
    <div class="main-container">
        <div class="input-group">
            <input id="weight" type="number" min="0" step="0.00001" >
            <span> weight </span>
        </div>
        <div class="input-group">
            <input id="amount" type="number" min="0" step="0.00001">
            <span> amount </span>
        </div>
        <button class="remove-button" id="remove-button"> × </button>
    </div>
`
export class GunCard extends HTMLElement {
    
    constructor(){
        
        super()
        
        this.attachShadow( { mode : "open" } )
        this.shadowRoot.appendChild(template.content.cloneNode("true") )
        
        this.broadSideWeight = null
        this.gunWeight = null
        this.removeButton = this.shadowRoot.getElementById("remove-button")
        this.weightInput = this.shadowRoot.getElementById("weight")
        this.amountInput = this.shadowRoot.getElementById("amount")
    }
    
    removeGun(){
        this.dispatchEvent(new CustomEvent('remove-gun', {
            bubbles: true,
            composed: true,
            detail: { element: this }
        }))
    }
    
    connectedCallback() {
        this.weightInput.addEventListener("input", () => {
            this.updateBroadSideWeight()
            this.gunWeight = parseFloat(this.weightInput.value)
        })
        this.amountInput.addEventListener("input", () => this.updateBroadSideWeight() )
        this.removeButton.addEventListener("click", () => this.removeGun() )
    }
    
    
    updateBroadSideWeight(){
        this.broadSideWeight = parseFloat(this.weightInput.value) * parseFloat(this.amountInput.value)
        
        this.dispatchEvent(new CustomEvent('broad-side-weight-update', {
            bubbles: true,
            composed: true,
            detail: { element: this }
        }))
    }
}

customElements.define("gun-card", GunCard)
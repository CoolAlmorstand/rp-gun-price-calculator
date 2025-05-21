
import { GunCard } from "./gun-card-component.js"
const template = document.createElement("template")

template.innerHTML = `

    <style>
        :host {
            font-size: 16px;
            border-radius: 10px;
            border: 1px solid black;
            width: 95%;
            flex-shrink: 0;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            overflow: auto;
            background-color: white;
        }
        
        .main-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .top-bar {
            width: 100%;
            height: 25px;
            border-bottom: 1px solid black;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .top-bar span {
            margin-left: 8px;
            font-size: 12px;
            font-weight: 405;
            white-space: nowrap;
            color: #2c3e50;
        }
        
        .add-gun-button {
        
            margin-left: 10px;
            margin-top: 10px;
            background-color: transparent;
            border: 1px solid black;
            font-size: 12px;
            color: black;
            width: 60px;
            height: 20px;
        }
        .delete-button {
            margin-right: 10px;
            background-color: transparent;
            border: 1px solid red;
            font-size: 12px;
            color: red;
            width: 60px;
            height: 20px;
        }
        
        .guns-container {
            margin-top: 10px;
            margin-bottom: 20px;
            padding: 0 10px 0 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            height: 120px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none; 
            -ms-overflow-style: none;
            background-color: transparent;
        }
        
    </style>
    
    
    
    <div class="main-container">
        <div class="top-bar">
            <span id="broad-side-weight-text"> broad-side weight: </span>
            <button class="delete-button" id="delete-button"> - remove </button>
        </div>
        
        <button class="add-gun-button" id="add-gun-button"> add gun </button>
        <div class="guns-container" id="guns-container">
        
        </div>
    </div>
`


export class DeckCard extends HTMLElement {
    
    constructor(){
        
        super()
        
        this.attachShadow( { mode : "open" } )
        this.shadowRoot.appendChild(template.content.cloneNode("true") )
        this.broadSideWeight = 0
        this.broadSideWeightText = this.shadowRoot.getElementById("broad-side-weight-text")
        this.guns = []
        this.gunsContainer = this.shadowRoot.getElementById("guns-container")
        this.addGunButton = this.shadowRoot.getElementById("add-gun-button")
        this.removeDeckButton = this.shadowRoot.getElementById("delete-button")
    }
    
    connectedCallback() {
        this.addGunButton.addEventListener("click", () => this.addGun() )
        this.removeDeckButton.addEventListener("click", () => this.removeDeck() )
    }
    
    removeDeck(){
        this.dispatchEvent(new CustomEvent('remove-deck', {
            bubbles: true,
            composed: true,
            detail: { element: this }
        }))
    }
    
    removeObjectFromArray(array, objectToRemove) {
        const index = array.indexOf(objectToRemove);
        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }
    
    addGun(){
        const gun = new GunCard()
        this.gunsContainer.appendChild(gun)
        this.guns.push(gun)
        gun.addEventListener("remove-gun", () => {
            gun.remove()
            this.removeObjectFromArray(this.guns, gun)
            this.getTotalBroadSideWeight()
        })
        
        gun.addEventListener("broad-side-weight-update", () => this.getTotalBroadSideWeight() )
    }
    
    getTotalBroadSideWeight() {
    
        let broadSideWeight = 0
        for(let gun of this.guns){
            broadSideWeight += gun.broadSideWeight
        }
        
        this.broadSideWeight = broadSideWeight
        this.broadSideWeightText.textContent = `broad-side weight: ${broadSideWeight} `
    }
        
        
}

customElements.define("deck-card", DeckCard)

import { CountryStatsTab } from "../tabs/country-stats-tab.js"
import { GunCalculatorTab } from "../tabs/gun-calculator-tab.js"
import { ArtilleryCalculatorTab } from "../tabs/artillery-calculator-tab.js"
import { NavyCalculatorTab } from "../tabs/navy-calculator-tab.js"
const tabsContainer = document.getElementById("tabs-container")

const countryStatsTab = new CountryStatsTab()
const gunCalculatorTab = new GunCalculatorTab()
const artilleryCalculatorTab = new ArtilleryCalculatorTab()
const navyCalculatorTab = new NavyCalculatorTab()

function getTabButtons() {
    
    const tabButtons = {}
    for(let button of document.getElementById("tabs-buttons-container").children) {
        tabButtons[button.dataset.value] = button
    }
    return tabButtons
}

const tabButtons = getTabButtons() 

class TabButtons {
    
    static selectedButton = null
    static tabButtons = tabButtons

    static initialize(){
        
        for(let tab in tabButtons) {
            
            const button = tabButtons[tab]
            button.addEventListener("click", () => this.buttonClick(button) )
        }
    }
    
    static buttonClick(button) {

        //highlight button 
        button.style.borderBottom = `1px solid #3498db`
        button.style.color = "#3498db"
        
        //remove higligt of previously selected button
        if(this.selectedButton){
            this.selectedButton.style.borderBottom = "none"
            this.selectedButton.style.color = "black"
        }
        this.selectedButton = button

        if(button.dataset.value == "countryStats") {
            tabsContainer.replaceChildren(countryStatsTab)
        }
        
        else if(button.dataset.value == "gun"){
            tabsContainer.replaceChildren(gunCalculatorTab)
        }
        
        else if(button.dataset.value == "artillery"){
            tabsContainer.replaceChildren(artilleryCalculatorTab)
        }
        
        else if(button.dataset.value == "navy"){
            tabsContainer.replaceChildren(navyCalculatorTab)
        }
    }
}

TabButtons.initialize()
TabButtons.buttonClick(tabButtons.countryStats)
# Design document
## Minimum Viable Product (MVP)
* Kaart van de Verenigde Staten met klikbare staten (visualisatie 1).
* Kaart visualiseert verschillende variabelen (liefst alle mogelijke variabelen uit de data).
* Alle variabelen zijn ook per staat zichtbaar, in een aparte visualisatie (visualisatie 2).
* Alle variabelen zijn zichtbaar voor heel de Verenigde Staten op dezelfde manier als bij punt drie.
* Voor elke variabele (behalve Gun Ownership) is het mogelijk om data te bekijken over een aantal jaren.
* Veranderen van jaartal gaat door middel van een slider in zowel de eerste als de tweede visualisatie.
* Het vergelijken van twee staten of meerdere staten is mogelijk, de visualisatie van deze vergelijking gebeurt op dezelfde manier als bij visualisatie 2.

## Mogelijke extra implementatie
* Het combineren van twee variabelen (bijvoorbeeld hoeveelheid wapens gecombineerd met het aantal doden door wapens).

## Methods
* `drawMap(data) // Tekent de kaart met als parameter de data`
* `drawChart(data) // Tekent de tweede visualisatie met als parameter de data`
* `drawComparison(data, states) // Tekent visualisatie voor het vergelijken van twee staten`
* `chooseStates() // Choose which states to compare`
* `getData(var, state) // Haalt de data op die hoort bij de geselecteerde variabele en eventuele staat`
* `goTo(state(s)) // Brengt de gebruiker naar de tweede visualisatie `
* `onMouseOver(this) // Laat een popup zien bij een mouseover event`

## Sketches
![](doc/advancedSketch.png "Advanced sketch")

## API's/Frameworks
* CSS/HTML
* Javascript --> D3 (+ topojson)
* XMLHttpRequest



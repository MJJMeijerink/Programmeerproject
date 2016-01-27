# Final Report

##### Jan Jaap Meijerink - 10560459

## De applicatie
Het doel van deze applicatie is het visualiseren van misdaad in de Verenigde Staten van Amerika. Een van de secundaire doelen is het kunnen vergelijken van de twee of meer staten zodat de gebruiker zich op een makkelijke manier een duidelijker beeld kan vormen van het misdaadlandschap in Amerika. Een ander secundair doel is het vinden van mogelijke verbanden tussen misdaad en bepaalde demografische gegevens. Bijvoorbeeld de werkloosheid of het politieke landschap in een staat. Tenslotte is er nog het tijdsaspect, alle misdaad data is verzameld voor de jaren 1960 - 2012, het doel was om de data zo te visualiseren dat trends in de data makkelijk te spotten zouden zijn.

Deze doelen heb ik geprobeerd te bereiken door middel van drie verschillende visualisaties. Ten eerste de kaart van de Amerikaanse staten, deze wordt ingekleurd voor de gekozen variabele en het gekozen jaartal. Op deze manier is voor dat jaar en voor die variabele het verschil tussen staten duidelijk te zien. Ten tweede de lijngrafiek, die komt tevoorschijn als er op een staat geklikt wordt. Deze grafiek geeft voor de gekozen variabele en staat de data weer voor alle jaren dat deze data beschikbaar was. Hierdoor zijn trends in de data duidelijk te zien. Ten derde de staafgrafiek, deze verschijnt bij het vergelijken van twee of meer staten. De staafgrafiek geeft voor de gekozen variabele, het gekozen jaartal en de gekozen staten de data weer. Dit maakt het makkelijk om verschillende staten met elkaar te vergelijken. En om data voor zowel de staafgrafiek als de kaart makkelijk per jaar te bekijken is er een HTML input range slider waarmee jaartallen geselecteerd kunnen worden. Deze is extra makkelijk te bedienen door de pijltjesknoppen op het scherm.

## Ontwerpspecificaties
Dit is een state diagram dat in het kort de basisfunctionaliteit van mijn visualisatie laat zien.
![State diagram](/doc/Diagram.png)

### Functies

#### Basisfuncties
 * `ready();` <br> Deze functie wordt aangeroepen op body.onload en zorgt ervoor dat javascript pas uitgevoerd wordt als de pagina geladen is. In deze functie staan de volgende belangrijke functies:
  * `XMLHttpRequest();` <br> Gebruikt om de data te laden.
  * `dataLoaded();` <br> Code in deze functie wordt pas uitgevoerd als de data is geladen. Deze functie bevat een aantal event listeners.
 * `goTo(variables, state, data, slider);` <br> Deze functie controleert de overgang van de kaart naar de kaart + de grafiek. Afhankelijke van de twee parameter besluit deze functie of er een lijngrafiek of een staafgrafiek getekent moet worden. De functie heeft 4 parameters:
  * `variables` <br> Een lijst met alle variabelen (unemployment, violent crime etc.), wordt gebruikt om te controleren welke variabele geselecteerd is.
  * `state` <br> Een of (in het geval van een comparison) meerdere staten die geselecteerd zijn om te visualiseren in de grafiek.
  * `data` <br> De variabele waarin alle data is opgeslagen.
  * `slider` <br> Het slider element uit de HTML, dit bevat alle gegevens van de slider. Met deze variabele kunnen we bepalen voor welk jaar de data gevisualiseerd moet worden.
 * `back();` <br> Als de grafiek zichtbaar is kan deze weer onzichtbaar gemaakt worden door op het kruisje rechtsboven de grafiek te drukken, deze functie maakt de grafiek onzichtbaar.
 * `getData(data, variable);` <br> Wordt gebruikt voor het ophalen van de juiste data voor het tekenen van de kaart. De parameters spreken voor zich.
 * `drawMap(variable, data, slider, legend, parent)` <br> Deze functie tekent de kaart. Hij gebruikt de volgende variabelen:
  * `variabele` <br> De variabele die getekend moet worden op de kaart.
  * `data` <br> Variabele waarin de data is opgeslagen.
  * `slider` <br> Variabele waarin het slider element is opgeslagen, hieruit kunnen we opmaken voor welk jaar we de kaart moeten inkleuren.
  * `legend` <br> De legenda die in `ready();` al klaargezet wordt.
  * `parent` <br> Het parent element van de legenda.
 * `makeChart(variable, state, d);` <br> Deze functie tekent de lijngrafiek. De parameters spreken voor zich, `variable` is de variabele die moet worden gevisualiseerd, `state` is de staat die gevisualiseerd moet worden en `d` staat voor 'data' en wordt gebruikt om de juiste data uit op te halen.
 * `makeComparison(variable, state, d, slider);` <br> Tekent de staafgrafiek voor het vergelijken van twee of meer staten. De parameters zijn hetzelfde verhaal als bij `makeChart();`, alleen is hier het jaartal ook van belang, dus het slider element is ook een parameter.
 * `update(barChart, slider, d, variable);` <br> Deze functie update de staafgrafiek als het jaartal verandert, dit is sneller dan het opnieuw teken van de grafiek. De parameters:
  * `barChart` <br> De variabele waarin de barChart gegevens worden opgeslagen als deze gemaakt wordt. Dit hebben we nodig om gegevens te kunnen veranderen en om `barChart.update();` te kunnen aanroepen.
  * `slider` <br> De slider variabele om te zien voor welk jaar we data nodig hebben.
  * `d` <br> De variabele waarin de data is opgeslagen.
  * `variable` <br> De variabele waarvoor de data moet worden opgehaald.
 * `navigateSlider(direction);` <br> Deze functie geeft functionaliteit aan de pijltjesknoppen om de slider mee te besturen. Direction geeft aan welke van de twee knoppen is ingedrukt.

#### Event listeners
 * `selectAll.onclick` <br> Dit is de functie die ervoor zorgt dat de checkbox die alle andere checkboxes aanvinkt werkt.
 * `d3.selectAll('.radButton').on('click', function () {...});` <br> Dit zorgt ervoor dat er wat gebeurt als een radiobutton wordt aangeklikt. In deze event listener worden `drawMap();` en (als de staafgrafiek of de lijngrafiek zichtbaar zijn) `goTo();` of `back();` aangeroepen.
 * `slider.onchange` <br> Als de slider wordt gebruikt zorgt deze functie ervoor dat de kaart geupdate wordt en de staafgrafiek als die actief is. In deze event listener worden dus `drawMap();` en `update();` aangeroepen.
 * `d3.selectAll('.state')` <br> Dit selecteert alle staten, voor elke staat is er een aantal eventlisteners:
  * `.on('mouseover', function(){...})` <br> De mouseover functie zorgt ervoor dat de grens van de staat een grotere stroke-width krijgt. Ook zorgt deze functie ervoor dat het betreffende element niet overlapt wordt door andere staten (anders wordt de grens maar half weergegeven op sommige plaatsen). Daarnaast maakt deze functie de tooltip zichtbaar.
  * `.on('mouseout', function(){...})` <br> Als de muis de staat weer verlaat moet de stroke-width weer terug naar normaal.
  * `.on('mousemove', function() {...})` <br> Zolang de muis over een staat gepositioneerd is moet er een tooltip weergegeven die de exacte data voor de staat weergeeft. Dat doet deze functie.
  * `on('click', function() {...});` <br> Als er op een staat geklikt wordt moet de lijngrafiek worden weergegeven, deze functie roept dus `goTo();` aan.
 * `d3.selectAll('.label').on('mouseover', function () {...});` <br> Deze functie is voor het 'compare states' venster, als de muis over een staat in dat venster gepositioneerd is, dan moet die staat op gehighlight worden op de kaart.
 * `d3.select('#submitButton').on('click', function() {...});` <br> Deze functie roept `goTo();` aan als er twee of meer staten geselecteerd zijn en er op de 'compare' knop is gedrukt.

## Moeilijkheden en bijzonderheden

#### De layout
Een belangrijk onderdeel van de visualisatie is de interface, zoals te zien in mijn design document was mijn oorspronkelijke plan om de grafieken onder de kaart te plaatsen. De gebruiker zou dan naar beneden moeten scrollen om die grafiek te zien. Op aanraden van medestudenten heb ik toen naar een manier gezocht om de grafiek op dezelfde pagina te houden als de kaart. De uitdaging hierbij om ervoor te zorgen dat dit niet ten koste ging van de duidelijkheid van de visualisaties. Uiteindelijk heb ik dit opgelost door de kaart te verkleinen als er een grafiek zichtbaar is. Dat zorgt voor genoeg ruimte voor de grafiek en zo kan de gebruiker dus zowel de grafiek als de kaart zien.

#### De data
Het twee probleem dat ik tegenkwam was de data zelf. Data was verzameld voor alle staten van Amerika, dat houdt in dat er ook data voor het District of Columbia en Puerto Rico (in het geval van Puerto Rico alleen voor de werkloosheid). Het probleem is dat DC een erg klein en stedelijk district is. Met als gevolg dat het lijkt alsof er veel meer misdaad is in DC dan in andere staten, wat niet het geval hoeft te zijn, aangezien DC niet te vergelijken is met andere staten. Daarnaast komt Puerto Rico niet op mijn kaart voor. Om die redenen heb ik besloten data voor deze twee staten uit mijn visualisatie te laten.

#### De legenda
Het maken van de legenda was lastig omdat het kleiner maken van de legenda niet mogelijk was (omdat d3 niet altijd percentages accepteert). Om die reden heb ik ervoor gekozen de legende niet even breed te maken als de kaart, in plaats daarvan heeft de legende een vaste pixelbreedte. Gelukkig  maakt dit niet uit bij het verkleinen van het beeld, de legenda is namelijk niet breed genoeg om andere elementen op het beeld in de weg te zitten. Wel kan de legenda er om deze redenen wat klein uitzien op schermen met hogere resoluties.

#### De grafieken
Mijn oorspronkelijke idee was om de grafieken ook met d3 te maken. Uiteindelijk heb ik dat niet gedaan, omdat het me teveel tijd zou kosten en er teveel mis kon gaan. In plaats daarvan heb ik besloten Chart.js te gebruiken. Een plugin om stijlvolle grafieken mee te maken. Ook hierbij liep ik nog tegen een aantal problemen aan, omdat de Cook PVI variabele in mijn visualisatie een aantal unieke eigenschappen heeft. Labels zijn bijvoorbeeld niet puur numeriek maar bijvoorbeeld: 'D+5'. Hierdoor moest ik veel extra code schrijven om ervoor te zorgen dat Chart.js goede grafieken maakt voor de Cook PVI variabele. 

Wat betreft de keuze voor een lijn- en staafgrafiek voor de visualisatie; de lijngrafiek is gekozen omdat de gebruiker op die manier makkelijk trends in de tijd kan zien en de staafgrafiek is gekozen omdat het verschil tussen twee of meer staten op die manier goed zichtbaar is.

var greenTop = document.getElementById("greenTop")
var circle = document.getElementById("circle")
var dinnerTableDiv = document.getElementById("dinnerTableDiv")

function loadBody() {
    setTimeout(startAnimation, 500)
}


function startAnimation() {
    greenTop.className = "greenTop"
    setTimeout(continueAnimation, 300)
}

function continueAnimation() {
    circle.className = "circle", 5000
    setTimeout(stopAnimation, 800)
}

function stopAnimation() {
    dinnerTableDiv.className = "dinnerTableDiv"
}

var inlogPagina = document.getElementById("inlogPaginaDiv")
var registreerPagina = document.getElementById("registreerPaginaDiv")

inlogPagina.style.display = 'block'
registreerPagina.style.display = 'none'

function changePage() {
    if (inlogPagina.style.display == 'none') {
        inlogPagina.style.display = 'block'
        registreerPagina.style.display = 'none'
    } else if (inlogPagina.style.display == 'block') {
        inlogPagina.style.display = 'none'
        registreerPagina.style.display = 'block'
    }
}

function datumChange() {
    var dateInput = document.getElementById("date")
    dateInput.style.color = "black"
}
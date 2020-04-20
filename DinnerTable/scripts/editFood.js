function checkNumber(element) {
    if (parseInt(element.value) > 10) {
        element.value = "10"
    } else if (parseInt(element.value) < 1) {
        element.value = "1"
    } else if (parseInt(element.value) >= 1 && parseInt(element.value) <= 10) {
        return
    } else {
        element.value = ""
    }
}

document.querySelectorAll('.numberScale').forEach(item => {
    item.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            item.blur()
        }
    })
});

var editFoodDiv = document.getElementById("editFoodDiv")

function cancel() {
    editFoodDiv.className = "editFoodDivDown"
}

function saveChanges() {
    var datumArray = [];

    var editGerecht = document.getElementById("gerecht").value
    var editHealthy = document.getElementById("health").value
    var editTasty = document.getElementById("taste").value
    var editDatum = document.getElementById("date").value
    var editNotitie = document.getElementById("notes").value
    var editKeuken = document.getElementById("keuken").value

    function loadDatumArray() {
        db.collection("gebruikers").doc("Ai1ogLVEz1sQuFxpkWYd").get()
            .then(function(doc) {
                doc.data().gerechten[editGerecht].datum.forEach(sortDates)

                datumArray.sort().reverse()
                datumArray.forEach(formatDates)
                editDatum = new Date(editDatum)
                datumArray[0] = editDatum

                function sortDates(value) {
                    datumArray.push(value.seconds * 1000)
                }

                function formatDates(value, index) {
                    datumArray[index] = new Date(value)
                }

                uploadData();
            });
    }



    let newObj = {
        datum: datumArray,
        naam: editGerecht,
        healthy: editHealthy,
        tasty: editTasty,
        notitie: editNotitie,
        keuken: editKeuken
    }


    let gerechten = {
        [editGerecht]: newObj
    }


    loadDatumArray();

    function uploadData() {
        db.collection("gebruikers").doc("Ai1ogLVEz1sQuFxpkWYd").set({
            gerechten
        }, { merge: true })
    }
    editFoodDiv.className = "editFoodDivDown"
}
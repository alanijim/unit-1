function initialize() {
    addColumns(cityPop); // Pass the cityPop array as an argument
    addEvents(); // Call addEvents to attach event listeners
    debugAjax(); // Fetch and display GeoJSON data
}
// City population data
var cityPop = [
    {
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Milwaukee',
        population: 594833
    },
    {
        city: 'Green Bay',
        population: 104057
    },
    {
        city: 'Superior',
        population: 27244
    }
];

function addColumns(cityPop) {
    // Create a table element
    var table = document.createElement("table"); 

    // Create a header row
    var headerRow = document.createElement("tr");
    headerRow.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th><th>City Size</th>');
    table.appendChild(headerRow);
    // Iterate through the cityPop array and create rows for each city
    cityPop.forEach(function (cityData) {
        var row = document.createElement("tr");
        var citySize;
        if (cityData.population < 100000) {
            citySize = 'Small';
        } else if (cityData.population < 500000) {
            citySize = 'Medium';
        } else {
            citySize = 'Large';
        }

        // Insert data for each city into the row
        row.insertAdjacentHTML('beforeend', '<td>' + cityData.city + '</td>');
        row.insertAdjacentHTML('beforeend', '<td>' + cityData.population + '</td>');
        row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        // Append the row to the table
        table.appendChild(row);
    });
    // Append the table to the #mydiv element
    document.querySelector("#mydiv").appendChild(table);
}

function addEvents() {
    document.querySelector("table").addEventListener("mouseover", function () {
        var color = "rgb(";

        for (var i = 0; i < 3; i++) {
            var random = Math.round(Math.random() * 255);
            color += random;
            if (i < 2) {
                color += ",";
            } else {
                color += ")";
            }
        }
        // Set the background color of the table
        document.querySelector("table").style.backgroundColor = color;
    });

    function clickme() {
        alert('Hey, you clicked me!');
    }
    document.querySelector("table").addEventListener("click", clickme);
}
// Fetch and display GeoJSON data
function debugCallback(response) {
    response.text().then(function(data) {
        document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + data);
    });
}

function debugAjax() {
    var myData;
// fetching geojson data
    fetch("data/MegaCities.geojson")
        .then(function(response) {
            debugCallback(response);
        });

    document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: Loading...');
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);
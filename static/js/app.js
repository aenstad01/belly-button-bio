// note: parts of this code are taken from Office Hours on 9/29 and 10/1

function DrawBargraph(sampleId) {
    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(x => x.id == sampleId);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        }

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }


        Plotly.newPlot("bar", [barData], barLayout);
    });
}



function DrawBubblechart(sampleId) {
    d3.json("samples.json").then((data) => {

    });
    
}


function ShowMetadata(sampleId) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(x => x.id == sampleId);
        var results = resultArray[0];
        var panel = d3.select("#sample-metadata");

        console.log(panel);
        panel.html("");

        Object.entries(results).forEach( ([key, value]) => {
            var textToShow = `${key}: ${value}`;
            panel.append("h6").text(textToShow);

        });
    });
}


function optionChanged(newSampleId){
    console.log(`User selected ${newSampleId}`)
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);

}



// Initialize the page
function initDashboard() {
    
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach( (sampleId) => {
            selector.append("option").text(sampleId).property("value", sampleId);
        });

        // Get the first sample ID
        var sampleId = sampleNames[0];
        console.log("starting sample: ", sampleId);

        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);


    });
}

initDashboard();
// note: parts of this code are taken from Office Hours on 9/29 and 10/1

function DrawBargraph(sampleId) {


}

function DrawBubblechart(sampleId) {


}


function ShowMetadata(sampleId) {


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
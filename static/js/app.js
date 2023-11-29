// Define the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the data once
d3.json(url).then(function(data) {
    // Call the init function and pass the data
    init(data);
});

// Function to initialize the visualization
function init(data) {
    let dropdownMenu = d3.select("#selDataset");

    let names = data.names;

    names.forEach((id) => {
        dropdownMenu.append("option")
            .text(id)
            .property("value", id);
    });

    dropdownMenu.on("change", function () {
        let selectedSample = dropdownMenu.property("value");
        buildMetadata(data, selectedSample);
        buildBubble(data, selectedSample);
    });

    let first_sample = names[0];
    buildMetadata(data, first_sample);
    buildBubble(data, first_sample);
}

// Function to build metadata
function buildMetadata(data, sample) {
    let metadata = data.metadata;
    let value = metadata.find(result => result.id == sample);

    let metadataDisplay = d3.select("#sample-metadata");
    metadataDisplay.html("");

    Object.entries(value).forEach(([key, value]) => {
        metadataDisplay.append("h5").text(`${key}: ${value}`);
    });
}

// Function to build bar chart
function buildBar(data, sample) {
    let allSamples = data.samples;
    let value = allSamples.find(result => result.id == sample);

    let trace = {
        x: value.sample_values.slice(0, 10).reverse(),
        y: value.otu_ids.slice(0, 10).reverse(),
        text: value.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    };

    let layout = {
        title: "Top 10 OTUs Found"
    };

    Plotly.newPlot("bar", [trace], layout);
}

// Function to build bubble chart
function buildBubble(data, sample) {
    let allSamples = data.samples;
    let value = allSamples.find(result => result.id == sample);

    let trace = {
        x: value.otu_ids,
        y: value.sample_values,
        text: value.otu_labels,
        mode: "markers",
        marker: {
            size: value.sample_values,
            color: value.otu_ids,
            colorscale: "Earth"
        }
    };

    let layout = {
        title: "Top 10 OTUs Present"
    };

    Plotly.newPlot("bubble", [trace], layout);
}
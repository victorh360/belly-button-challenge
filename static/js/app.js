const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
});

function init() {
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names = data.names;

        names.forEach((id) => {
            dropdownMenu.append("option")
                .text(id)
                .property("value", id);
        });

        dropdownMenu.on("change", function () {
            let selectedSample = dropdownMenu.property("value");
            buildMetadata(selectedSample);
            buildBar(selectedSample);
            buildBubble(selectedSample);
        });

        let first_sample = names[0];
        buildMetadata(first_sample);
        buildBar(first_sample);
        buildBubble(first_sample);
    });
}

function buildMetadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {

            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

init();
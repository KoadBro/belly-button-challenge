// Function to render data for a given sample ID
function render(data, id) {
    // Filter data based on the selected ID
    let sample = data.samples.find(sample => sample.id === id);
    let metadata = data.metadata.find(sample => sample.id === +id);

    // Display metadata in the panel body
    let metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html(""); // Clear the div
    Object.entries(metadata).forEach(([key, value]) => {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });

    // Bar chart
    let barData = [{
        x: sample.sample_values.slice(0, 10).reverse(),
        y: sample.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
        text: sample.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    Plotly.newPlot('bar', barData);

    // Bubble chart
    let bubbleData = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Earth'
        }
    }];

    Plotly.newPlot('bubble', bubbleData);
}

// Function to handle the dropdown change event
function optionChanged(selectedID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        render(data, selectedID);
    });
}

// On initial load, populate the dropdown and render the first sample
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Populate the dropdown with IDs
    data.names.forEach((id) => {
        d3.select("#selDataset").append("option").text(id);
    });

    // Initial render
    render(data, data.names[0]);
});

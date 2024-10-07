// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      console.log(data); // log the entire data object
      console.log(Plotly); // log the Plotly object

    // get the metadata field
    let metadata = data.metadata;
    console.log(metadata); // log the metadata field

    // Filter the metadata for the object with the desired sample number
let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
d3.select("#sample-metadata").html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(resultArray[0]).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
let sampleData = data.samples;

    // Filter the samples for the object with the desired sample number
let filteredData = sampleData.filter(sampleObj => sampleObj.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
let otu_ids = filteredData[0].otu_ids;
let otu_labels = filteredData[0].otu_labels;
let sample_values = filteredData[0].sample_values;

    // Build a Bubble Chart
let bubbleData = [{
  x: otu_ids,
  y: sample_values,
  mode: 'markers',
  marker: {
    size: sample_values,
    color: otu_ids,
    colorscale: 'Earth'
  }
}];
let layout = {
  title: 'Bacteria Cultures per Sample',
  xaxis: { title: 'OTU ID' },
  yaxis: { title: 'Number of Bacteria' },
  showlegend: false
};

console.log(bubbleData, layout);
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, layout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
let barData = [{
  x: sample_values.slice(0, 10).reverse(),
  y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
  text: otu_labels.slice(0, 10).reverse(),
  type: 'bar',
  orientation: 'h'
}];

let barLayout = {
  title: 'Top 10 Bacteria Cultures Found',
  xaxis: { title: 'Number of Bacteria' },
  yaxis: { title: 'OTU ID' }
};


    // Render the Bar Chart
Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  console.log('init function called'); // log that the init function was called

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
Object.entries(names).forEach(([key, value]) => {
      d3.select("#selDataset").append("option").text(value).property("value", value);
    });


    // Get the first sample from the list
let firstName = names[0];
    // Build charts and metadata panel with the first sample
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);
}

// Initialize the dashboard
init();
console.log('JavaScript file loaded');

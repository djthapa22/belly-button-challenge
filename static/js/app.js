//  Using the url/link instead of .json file
const link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Creating the function for initial load/ drop down setup
function init(){
    // Using D3 to selecting tag from dropdown
    let dropdMenu= d3.select("#selDataset");
    // Retreiving json data and logging it
    d3.json(link).then((data)=> {
        console.log(`Data:${data}`)
        //  Setting up data array for name ids
        let names= data.names;
    //    using For Each to iterate through array of names
        names.forEach((name) =>{
            dropdMenu.append("option").text(name).property("value",name);
        });
        // Using first selection for setting up name variable
        let name = names[0];

        // Calling up the demo,bar and bubble for initial load
        demo(name);
        bar_g(name);
        bubbles(name);
        
    });
}
// Setting up the panel for demographics
function demo(selectdata){
    d3.json(link).then((data)=> {
        console.log(`Data:${data}`);

        // Setting up variable to capture the metadata
        let metadata= data.metadata;
    //    Filtering for id after using selectdata
        let filterdata= metadata.filter((meta)=> meta.id== selectdata);
        // using obj variable as a setup for first object
        let obj = filterdata[0]
        // Creating a blank element under sample metadata
        d3.select("#sample-metadata").html("");
        // Using object.entries to return array of objects key and values
        let entries= Object.entries(obj);
        // Iterating through entries and then adding another div tag 
        entries.forEach(([key,value])=>{
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
        // Logging above to console
        console.log(entries);
    });
}
// Creating the function for the bar
function bar_g(selectdata){
  d3.json(link).then((data)=> {
    console.log(`Data: ${data}`);
    // Creating a variable for the array of samples
    let samples = data.samples;
//    Again filtering for sample id to select data
    let filterdata= samples.filter((sample)=> sample.id== selectdata);  
    // Setting up varaiable to setup the first object
    let objt = filterdata[0];
// Creating the trace by using slice and reverse to get top 10 otus
    let trace=[{
    x:objt.sample_values.slice(0,10).reverse(),
    y:objt.otu_ids.slice(0,10).map((otu_id)=> `OTU ${otu_id}`).reverse(),
    text: objt.otu_labels.slice(0,10).reverse(),
    type:"bar",
    marker:{
        color:"rgb(0,128,255)"
    },
    orientation:"h"
    }];
    Plotly.newPlot("bar",trace);
    
    });
}


// Creating the bubble chart
function bubbles(selectdata){
    d3.json(link).then((data)=>{
         // Creating a variable for the array of samples
        let samples = data.samples;
        // Again filtering for sample id to select data
        let filterdata= samples.filter((sample)=> sample.id== selectdata);  
        // Setting up varaiable to setup the first object
        let objt = filterdata[0];
        
        // Creating trace for bubble chart
        let trace= [{
            x:objt.otu_ids,
            y:objt.sample_values,
            text:objt.otu_lables,
            mode:"markers",
            marker:{
                size: objt.sample_values,
                color:objt.otu_ids,
                colorscale:"Picnic"  
            }

        }];
        // Creating the legend to layout
        let layout = {
            xaxis:{title:"IDs for OTU"}
        };

        Plotly.newPlot("bubble",trace,layout);
    });
}

// Option change will toggle to new data for each id:
function optionChanged(selectdata){
   demo(selectdata);
    bar_g(selectdata);
    bubbles(selectdata);
}

init();
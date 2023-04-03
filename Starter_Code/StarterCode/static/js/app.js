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
        
    });
}

function demo(selectdata){
    d3.json(link).then((data)=> {
        console.log(`Data:${data}`);


        let metadata= data.metadata;
        let filterdata= metadata.filter((meta)=> meta.id== selectdata);

        let obj = filterdata[0]

        d3.select("#sample-metadata").html("");

        let entries= Object.entries(obj);
        
        entries.forEach(([key,value])=>{
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
        console.log(entries);
    });
}

function bar_g(selectdata){
  d3.json(link).then((data)=> {
    console.log(`Data: ${data}`);
    let samples = data.samples;
    let filterdata= samples.filter((sample)=> sample.id== selectdata);  

    let objt = filterdata[0];

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




function optionChanged(selectdata){
   demo(selectdata);
    bar_g(selectdata);
}

init();
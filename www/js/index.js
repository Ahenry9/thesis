var data2;
var selectedTechSkills = [];
var selectedSoftSkills = [];
var selectedLocations = [];
var selectedIndustries = [];
var starredPositions = ["..."];


function tabClick(evt, Name) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";


}

function onLoad() {
    if(localStorage.length !== 0){
    starredPositions = JSON.parse(localStorage.getItem("starredPositions"));
    }
    fillOptions();
    tabClick(event,'Sort');
}

function getData() {
    return new Promise(resolve => {
    // var XMLHttpReqeust = require("xmlhttprequest").XMLHttpReqeust;
    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == xhr.DONE && xhr.status == 200 ) {
            var dataset = xhr.responseText
            dataset = JSON.parse(dataset);
            console.log(dataset.recordset);
            data2 = dataset.recordset;
            resolve();
        }
        // if (xhr.readyState == 2){
            // xhr.responseType = 'json';
        // }
    };
    xhr.open('GET', 'http:localhost:5000/data', true);
    xhr.withCredentials = false;

    xhr.send();
    });
}

async function fillOptions() {
    await getData();
    var techSkills = ['All Skills'];
    for(var x = 0; x < data2.length; x++){
        techSkills.push(data2[x].SkillName);
    };
    techSkills = uniq(techSkills);
    console.log(techSkills);
    select = document.getElementById('techSkillsSelectID');

    for (var i = 0; i<techSkills.length; i++){
        var opt = document.createElement('option');
        opt.value = [i];
        opt.innerHTML = techSkills[i];
        select.appendChild(opt);
    };

    var locations = ['All Locations'];
    for(var x = 0; x < data2.length; x++){
        locations.push(data2[x].Location);
    };
    locations = uniq(locations);
    console.log(locations);
    select = document.getElementById('locationSelectID');

    for (var i = 0; i<locations.length; i++){
        var opt = document.createElement('option');
        opt.value = [i];
        opt.innerHTML = locations[i];
        select.appendChild(opt);
    };

    var industries = ['All Industries'];
    for(var x = 0; x < data2.length; x++){
        industries.push(data2[x].IndustryName);
    };
    industries = uniq(industries);
    console.log(industries);
    select = document.getElementById('industrySelectID');

    for (var i = 0; i<industries.length; i++){
        var opt = document.createElement('option');
        opt.value = [i];
        opt.innerHTML = industries[i];
        select.appendChild(opt);
    };



}

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}


function selectedTechSkill(skill){
      var selectedTech = [];
      var selTechSkills = $('#techSkillsSelectID :selected').each(function(){
        selectedTech[$(this).val()]=$(this).text();
      });
      selectedTechSkills = selectedTech.filter(Boolean);
      console.log(selectedTechSkills);
}

function selectedSoftSkill(skill){
      var selectedSoft = [];
      var selSoftSkills = $('#softSkillsSelectID :selected').each(function(){
        selectedSoft[$(this).val()]=$(this).text();
      });
      selectedSoftSkills = selectedSoft.filter(Boolean);
      console.log(selectedSoftSkills);
}

function selectedLocation(skill){
      var selectedLoc = [];
      var selLocations = $('#locationSelectID :selected').each(function(){
        selectedLoc[$(this).val()]=$(this).text();
      });
      selectedLocations = selectedLoc.filter(Boolean);
      console.log(selectedLocations);
}

function selectedIndustrie(skill){
      var selectedInd = [];
      var selIndustries = $('#industrySelectID :selected').each(function(){
        selectedInd[$(this).val()]=$(this).text();
      });
      console.log(selectedInd)
      selectedIndustries = selectedInd.filter(Boolean);
      console.log(selectedIndustries);
}


function searchTab() {
    document.querySelector('#Search').innerHTML = ""
    var filteredData = [];
    
    for(var i = 0; i < data2.length; i++){
        if(selectedIndustries.includes(data2[i].IndustryName) || selectedIndustries.includes('All Industries') || selectedIndustries.length == 0) {
            filteredData.push(data2[i]);
        }
    }

    var filteredData2 = [];
    for(var i = 0; i < filteredData.length; i++){
        if(selectedTechSkills.includes(filteredData[i].SkillName) || selectedTechSkills.includes('All Skills') || selectedTechSkills.length == 0){
            filteredData2.push(filteredData[i]);
        }
    }

    var filteredData4 = []
    var currentSoftSkills = []
    var found
    for(var i = 0; i < filteredData2.length; i++){
        currentSoftSkills = [];
        if (filteredData2[i].Creative == 1) {currentSoftSkills.push("Creative")}
        if (filteredData2[i].Integrity == 1) {currentSoftSkills.push("Integrity")}
        if (filteredData2[i]["Self-Motivated"] == 1) {currentSoftSkills.push("Self-Motivated")}
        if (filteredData2[i].Helpful == 1) {currentSoftSkills.push("Helpful")}
        if (filteredData2[i].Analytical == 1) {currentSoftSkills.push("Analytical")}
        if (filteredData2[i].Planning == 1) {currentSoftSkills.push("Planning")}
        if (filteredData2[i].Social == 1) {currentSoftSkills.push("Social")}
        if (filteredData2[i].Efficient == 1) {currentSoftSkills.push("Efficient")}
        if (filteredData2[i].Mentoring == 1) {currentSoftSkills.push("Mentoring")}
        if (filteredData2[i].Respectful == 1) {currentSoftSkills.push("Respectful")}
        found = selectedSoftSkills.some(r=> currentSoftSkills.includes(r))
        if(found == true || selectedSoftSkills.includes('All Soft Skills') || selectedSoftSkills.length == 0){
            filteredData4.push(filteredData2[i]);
        }
    }
    console.log(filteredData4)

    var filteredData3 = [];
    for(var i = 0; i < filteredData4.length; i++){
        if(selectedLocations.includes(filteredData4[i].Location) || selectedLocations.includes('All Locations') || selectedLocations.length == 0){
            filteredData3.push(filteredData4[i]);
        }
    }




    console.log(filteredData3);
    
    filteredData3 = removeDuplicates(filteredData3,"PositionID");

    console.log(filteredData3);




    for(var i = 0; i < filteredData3.length; i++){
    var item = filteredData3[i].PositionID.toString()
    
    if(starredPositions.includes(item)){
    console.log("here")
    document.querySelector('#Search').innerHTML += 
    `<div class="row" >
        <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filteredData3[i].PositionName}','${filteredData3[i].CompanyName}','${filteredData3[i].Location}','${filteredData3[i].IndustryName}','${filteredData3[i].url}');">
            <span class="cardHeadingSpan" id="${filteredData3[i].PositionID}">${filteredData3[i].PositionName}</span>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filteredData3[i].PositionName}','${filteredData3[i].CompanyName}','${filteredData3[i].Location}','${filteredData3[i].IndustryName}','${filteredData3[i].url}');">${filteredData3[i].Location}
        </div>
        <img src="star2.jpg" alt = "Star" style="height: 13vh" onclick="unstarPosition(this,${filteredData3[i].PositionID})">
    </div>

    <hr>`

    }

    else{
        document.querySelector('#Search').innerHTML += 
    `<div class="row" >
        <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filteredData3[i].PositionName}','${filteredData3[i].CompanyName}','${filteredData3[i].Location}','${filteredData3[i].IndustryName}','${filteredData3[i].url}');">
            <span class="cardHeadingSpan" id="${filteredData3[i].PositionID}">${filteredData3[i].PositionName}</span>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filteredData3[i].PositionName}','${filteredData3[i].CompanyName}','${filteredData3[i].Location}','${filteredData3[i].IndustryName}','${filteredData3[i].url}');">${filteredData3[i].Location}
        </div>
        <img src="star.png" alt = "Star" style="height: 13vh" onclick="starPosition(this,${filteredData3[i].PositionID})">
    </div>

    <hr>`
    }
}
}


function starredTab(){
    document.querySelector('#Starred').innerHTML = ``
    var filtered = [];
    filtered = removeDuplicates(data2,"PositionID")
    for(var i = 0; i < filtered.length; i++){
        if(starredPositions.includes(filtered[i].PositionID)){
        document.querySelector('#Starred').innerHTML += 
        `<div class="row" >
            <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filtered[i].PositionName}','${filtered[i].CompanyName}','${filtered[i].Location}','${filtered[i].IndustryName}','${filtered[i].url}');">
                <span class="cardHeadingSpan" id="${filtered[i].PositionID}">${filtered[i].PositionName}</span>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 gry" onclick="details('${filtered[i].PositionName}','${filtered[i].CompanyName}','${filtered[i].Location}','${filtered[i].IndustryName}','${filtered[i].url}');">${filtered[i].Location}
            </div>
            <img src="star2.jpg" alt = "Star" style="height: 13vh" onclick="unstarPosition(this,${filtered[i].PositionID})">
        </div>
    
        <hr>`
    
        }
    }
}


function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

 function starPosition(button,id){
    starredPositions.push(id.toString())
    localStorage.clear();
    localStorage.setItem("starredPositions",JSON.stringify(starredPositions));
    button.src = "star2.jpg"
    button.setAttribute(`onclick`,`unstarPosition(this,${id})`)

 }

 function unstarPosition(button,id){
    console.log(id)
    starredPositions = starredPositions.filter(e => e !== id.toString());
    localStorage.clear();
    localStorage.setItem("starredPositions",JSON.stringify(starredPositions));
    button.src = "star.png"
    button.setAttribute(`onclick`,`starPosition(this,${id})`)
 }


function details(position, company, location, industry, url){
    tabClick(event, "Details")
    document.getElementById("jobTitleLabel").innerHTML = `Job Title: ${position}`
    document.getElementById("companyLabel").innerHTML = `Company:  ${company}`
    document.getElementById("locationLabel").innerHTML = `Location: ${location}`
    document.getElementById("industryLabel").innerHTML = `Industry: ${industry}`
    document.getElementById("urlButton").setAttribute("onclick",`window.open('${url}','_blank')`)
}
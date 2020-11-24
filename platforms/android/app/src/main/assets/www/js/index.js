/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        

        this.receivedEvent('deviceready');

        navigator.contactsPhoneNumbers.list(function(contacts) {
            console.log(contacts.length + ' contacts found');
            for(var i = 0; i < contacts.length; i++) {
               console.log(contacts[i].id + " - " + contacts[i].displayName);
               for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                  var phone = contacts[i].phoneNumbers[j];
                  console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
               }
            }
         }, function(error) {
            console.error(error);
         });

         var Permission = window.plugins.Permission
 
            var permission = 'android.permission.ACCESS_COARSE_LOCATION'
            
            Permission.has(permission, function(results) {
                if (!results[permission]) {
                    Permission.request(permission, function(results) {
                        if (result[permission]) {
                           alert("permission is granted coarse location");
                        }
                    }, alert)
                }
            }, alert)

            var permission2 = 'android.permission.ACCESS_FINE_LOCATION'
            
            Permission.has(permission2, function(results) {
                if (!results[permission2]) {
                    Permission.request(permission2, function(results) {
                        if (result[permission2]) {
                           alert("permission is granted fine location");
                        }
                    }, alert)
                }
            }, alert)

         /*var permissions = cordova.plugins.permissions;  

         var list = [
            permission.ACCESS_COARSE_LOCATION,
            permission.ACCESS_FINE_LOCATION,
            permission.ACCESS_LOCATION_EXTRA_COMMANDS, 
          ];
          permissions.requestPermissions(list, success, error);
 
          function error() {
            alert('Please grant Permissions');          }
           
          function success( status ) {
            if( !status.hasPermission ) error();
          }*/ 
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
var d = window.localStorage;
if(d.getItem("ID")!=null)
{   
    document.getElementById("mainForm").style.display = "none";
    document.getElementById("mapid").style.display = "block";
}
else{
     
    document.getElementById("mainForm").style.display = "block";
document.getElementById("mapid").style.display = "none";
}

 
var map = L.map('mapid').setView([0, 0], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2s4dWFtMzhkMDJvYTNtcDM2dnI1ZWxoNSJ9.iDACWKNRrGfnRlw93f9cEQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2s4dWFtMzhkMDJvYTNtcDM2dnI1ZWxoNSJ9.iDACWKNRrGfnRlw93f9cEQ'
}).addTo(map);


var iv = parseFloat(d.getItem("IV"));
 
var id = d.getItem("ID"); 

var markers = [];

var redCircleMarkers = [];
 
var themarker  = L.marker([0,0]).addTo(map); 
var theRedcircle = L.circle([0,0], {
    color: '#E74C3C',
    fillColor: '#E74C3C',
    fillOpacity: 0.2,
    radius: 50
}).addTo(map);

var theRedcircle2 = L.circle([0,0], {
    color: '#E74C3C',
    fillColor: '#E74C3C',
    fillOpacity: 0.2,
    radius: 600
}).addTo(map);

var theorangecircle = L.circle([0,0], {
    color: '#FFB600',
    fillColor: '#FFB600',
    fillOpacity: 0.2,
    radius: 50
}).addTo(map);
 
var theGreencircle =  L.circle([0,0], {
    color: '#78C61E',
    fillColor: '#78C61E',
    fillOpacity: 0.2,
    radius: 50
}).addTo(map);

var myLat;
var myLon;


if(d.getItem("ID")!=null)
{ 
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    
        updateFriendCount();
 
        
        getRedZonesCount();
         

        setInterval(updateFriendCount(),30000); 
        
        setInterval(getRedZonesCount(),40000);
         

        window.setInterval(function(){ 
            map.locate();
            updateFriend();            }, 10000);

            window.setInterval(function(){ 
    
                
            getRedZones(); 
                }, 20000);
}   

   
  function updateFriend()
  {
    var d = window.localStorage;
    
    //location.reload();

    url = "http://rushikeshk9.pythonanywhere.com/friendloc/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: id},
            success:function(result){
                 var str_array = result.split(',');
                var frndId = [];
                var lat = [];
                var lon = []; 
                var infectionVar = [];  
              
                 for(var i = 0; i < str_array.length; i++) {
                     
                    if ((i+1)%4 == 2) //second Element
                        {
                            
                            lat.push(str_array[i]);
                              
                        }
                        if((i+1)%4==3){ //Frst Element

                            lon.push(str_array[i]); 
                        }
                        if((i+1)%4==1){ //Third Element
                            frndId.push(str_array[i]);                           

                        }  

                        if((i+1)%4==0){ //Fourth Element
                            
                            infectionVar.push(str_array[i]); 

                        }  
                        
                }  

                  for(i=0;i<(frndId.length);i++){
                    var latt = lat[i];
                    var lng = lon[i];
                    var iv = infectionVar[i]; 

                    var dst = distance(myLat,myLon,parseFloat(latt),parseFloat(lng)); 
                     
                        iv= parseFloat(iv);
                          if(iv>=0.8){  
                            markers[i].setLatLng([parseFloat(latt),parseFloat(lng)]).bindPopup("Your Friend "+frndId[i]+" is Here with IV:"+iv.toFixed(2)+" Approx Distance : "+dst.toFixed(2)+" Kms"  );
                            markers[i].setIcon(redFrndIcon);
                            markers[i].addTo(map);
                             

                        }
                        
                        if (iv>=0.37){
                            
                            if (iv<0.8) { 
                                markers[i].setLatLng([parseFloat(latt),parseFloat(lng)]).bindPopup("Your Friend "+frndId[i]+" is Here with IV:"+iv.toFixed(2)+" Approx Distance : "+dst.toFixed(2)+" Kms"  );
                                markers[i].setIcon(orangeFrndIcon);
                                markers[i].addTo(map);

                            }
                        }
                        if(iv<0.37){
                            markers[i].setLatLng([parseFloat(latt),parseFloat(lng)]).bindPopup("Your Friend "+frndId[i]+" is Here with IV:"+iv.toFixed(2)+" Approx Distance : "+dst.toFixed(2)+" Kms" );
                            markers[i].setIcon(greenFrndIcon);
                            markers[i].addTo(map);
                            
                        } 
                 } 
 
                console.log("Frnd ID: "+frndId);
                
                console.log("Lat ID: "+lat);
                
                console.log("Lon ID: "+lon);
                
                console.log("IV : "+infectionVar);
            }

    });
  }

  
  function updateFriendCount()
  {
    var d = window.localStorage;
    
    //location.reload();

    url = "http://rushikeshk9.pythonanywhere.com/friendloc/"
 

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: id},
            success:function(result){ 
                var frndId = [];  
                var str_array = result.split(',');

                for(var i = 0; i < str_array.length; i++) {
                if((i+1)%4==1){ //Third Element
                    frndId.push(str_array[i]);                           

                }  
            }

                markers = [];
                


                for(i=0;i<(frndId.length);i++){  
                    var theFrndMarker = L.marker([0,0]);
                   markers.push(theFrndMarker);   
                   console.log(markers.length);

                 } 

                 
                 
            }
        });



    
  }

  function getRedZonesCount()
  {
      
    url2 = "http://rushikeshk9.pythonanywhere.com/redzonecount/"


    $.ajax({
        url:url2,
        type:'POST',
        data:{userID: id},
        success:function(result){ 
            
            var str_array = result.split(',');
            
           
            redCircleMarkers = [];

            for(i=0;i<(str_array[0]);i++){  
            var theRedCircleMarker = L.circle([0,0], {
                color: '#E74C3C',
                fillColor: '#E74C3C',
                fillOpacity: str_array[1],
                radius: 1500,
                stroke:false
            });
            
            
            redCircleMarkers.push(theRedCircleMarker);   
            console.log(redCircleMarkers.length);

                

            }
        }
    });
  }
  function getRedZones(){



    var d = window.localStorage;
    
    //location.reload();

    url = "http://rushikeshk9.pythonanywhere.com/redzone/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: id},
            success:function(result){ 


                
                var str_array = result.split(',');
                var lat = [];
                var lon = []; 
                 
              
                 for(var i = 0; i < str_array.length; i++) {
                     
                    if ((i+1)%3 == 1) //Frst Element
                        {
                            
                            lat.push(str_array[i]);
                              
                        }
                        if((i+1)%3==2){ //second Element

                            lon.push(str_array[i]); 
                        }
                        
                        
                }  
                
                console.log("REDZONE CIRCLE ");
                console.log("Lat ID: "+lat);
                
                console.log("Lon ID: "+lon);
              
                console.log("Lat: "+lat);
                console.log("Lat length of for loop: "+lon.length);
                  for(i=0;i<(lon.length);i++){
                    var latt = parseFloat(lat[i]);
                    var lng = parseFloat(lon[i]);  

                    console.log("The lat and long for iter "+ i +" is "+latt+"and  "+lng);
                    
                    redCircleMarkers[i].setLatLng([latt,lng]); 
                    redCircleMarkers[i].addTo(map);

                } 
                
 
            }

    });
  }
   
  
function onLocationFound(e) {
    var radiuss = e.accuracy / 2;
    myLat = e.latlng.lat;
    myLon = e.latlng.lng; 

  
  
    iv = parseFloat(d.getItem("IV"));   
 if(iv==NaN||iv==""||iv==null){
     iv = 0;
 }
    if(iv>=0.8){
        themarker.setIcon(redIcon);

        themarker.setLatLng(e.latlng);

        themarker.bindPopup("You seem to be Positive. Location Accuracy " + radiuss + " meters" );    
        theRedcircle.setLatLng(e.latlng);
        theRedcircle.setRadius(radiuss); 
         
    
    }
     
    if (iv>=0.37){
        
        if (iv<0.8) { 
            themarker.setIcon(orangeIcon);

            themarker.setLatLng(e.latlng);
            themarker.bindPopup("You seem to be Suspicious. Location Accuracy " + radiuss + " meters" );    
                
            theorangecircle.setLatLng(e.latlng);
            theorangecircle.setRadius(radiuss);
     
        }
    }
    if(iv<0.37){
        themarker.setIcon(greenIcon);

        themarker.setLatLng(e.latlng);

        themarker.bindPopup("You seem to be Safe. Location Accuracy " + radiuss + " meters" );
 
        theGreencircle.setLatLng(e.latlng);
            theGreencircle.setRadius(radiuss);

     
    }

   
    
    
    /*var lat = 18.659257;
            var lng = 73.777220;
            L.marker([parseFloat(lat),parseFloat(lng)]).addTo(map).bindPopup("Your Friend  is Here" );
            L.circle([parseFloat(lat),parseFloat(lng)], 50).addTo(map);*/
     upload(e);
}

function onLocationError(e) {
    if (tries < 10) {
        getLocation();
    }
    alert(e.message);
}

function getLocation() {
    tries += 1;
     map.locate({
         setView: true,
         maxZoom: 16,
         timeout: 5000,
         enableHighAccuracy: true
     });
 }


$("#viewf").click(function(){
    document.getElementById("mainForm").style.display = "block";

})

$("#but_select").click(function () {
    document.getElementById("loader").style.display = "block";

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 75,
        targetWidth: 325,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});


function onSuccess(imageURI) {
    // Set image source
    var image = document.getElementById('img');
    image.src = imageURI + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "xray.jpg" //imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "https://kedar123.pythonanywhere.com/ctpredict/", function (result) {
        //var data1 = result.response.replace(new RegExp("&#39;", "'"), replace);
        document.getElementById("loader").style.display = "none";

        //data1 = result.response.replace("&#39;", " ' ");
        alert("X-Ray Scan Results are : "+result.response);
        document.getElementById("xray").value = result.response;
 

    }, function (error) {
        alert('error : ' + JSON.stringify(error));
    }, options);

}


function onFail(message) {
alert('Failed because: ' + message);
}
 


$("#but_selectctscan").click(function () {
    document.getElementById("loader").style.display = "block";
 
    navigator.camera.getPicture(onSuccess2, onFail2, {
        quality: 75,
        targetWidth: 325,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});

function onSuccess2(imageURI) {
    // Set image source
    var image = document.getElementById('img2');
    image.src = imageURI + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "xray.jpg" //imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "https://kedar123.pythonanywhere.com/ctpredict/", function (result) {
        //var data1 = result.response.replace(new RegExp("&#39;", "'"), replace);
        document.getElementById("loader").style.display = "none";

        //data1 = result.response.replace("&#39;", " ' ");
        alert("CT Scan Results are : "+result.response);
        document.getElementById("ctscan").value = result.response;



    }, function (error) {
        alert('error : ' + JSON.stringify(error));
    }, options);

}


function onFail2(message) {
alert('Failed because: ' + message);
}
var d = window.localStorage;
function upload(e){
    var id = d.getItem("ID");

    $.ajax({
        type: 'POST',
        data: {lon: e.latlng.lng, lat: e.latlng.lat,userID: id},
        url: 'http://rushikeshk9.pythonanywhere.com/updateloc/',
        success: function(data){
             
            //alert('Your Location was successfully added');
            //findFriends();
            
        },
        error: function(){
            console.log(data);
            
        }
    });
 
    return false;
}

function findFriends(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://example.com"; // site that doesn’t send Access-Control-*
    fetch(proxyurl+url) 
    $.getJSON(proxyurl+url, function(data) {
    //data is the JSON string
    L.marker([data.lng+5,data.lat+5],{icon: redIcon}).addTo(map);
}); 
}


$.extend( $.ui.slider.prototype.options, { 
    animate: 300
});
var slider = document.getElementById("myRange");
var slider2 = document.getElementById("myRange2");
var output = document.getElementById("demo");
var output2 = document.getElementById("demo2");
output.innerHTML = slider.value; // Display the default slider value
output2.innerHTML = slider2.value; // Display the default slider value
output.innerHTML="No Cough";
output2.innerHTML="No Breathlessness";
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    if (this.value==1) {
        output.innerHTML="No Cough";
    }
    else if(this.value==2){
        output.innerHTML="Normal Cough";
    }
    else{
        output.innerHTML="Heavy Cough";
    }
  


}

slider2.oninput = function() {
    if (this.value==1) {
        output2.innerHTML="No Breathlessness";
    }
    else if(this.value==2){
        output2.innerHTML="Normal Breathlessness";
    }
    else{
        output2.innerHTML="Heavy Breathlessness";
    }
  }
// jQuery v3.3.1 is supported
$("#slider").roundSlider({
	radius: 72,
	circleShape: "half-top",
  sliderType: "min-range",
	mouseScrollAction: true,
  value: 96,
	handleSize: "+1",
	min: 96,
	max: 106
});


function updateData()
{  var phone = document.getElementById("Phone").value;
    var d = window.localStorage;

        d.setItem("number",phone);
        

}

$("#mainForm").submit(function(event) {
     /* stop form from submitting normally */
    event.preventDefault();

    /* get the action attribute from the <form action=""> element */
    var $form = $( this ),
        url = $form.attr( 'action' );

  
        $.ajax({
            url:url,
            type:'POST',
            data:$(this).serialize(),
            success:function(result){
               

               var str_array = result.split(',');
               d.setItem("IV",str_array[0]);
               d.setItem("ID",str_array[1]);

                  alert("Your Infection Variable is"+str_array[0]);
                 location.reload();

            }

    });
  });

 

 var greenIcon = L.icon({
    iconUrl: './img/markers/green.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [38, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 60], // point of the icon which will correspond to marker's location
     shadowAnchor: [24, 60],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var orangeIcon = L.icon({
    iconUrl: './img/markers/yellow.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [38, 60], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 60], // point of the icon which will correspond to marker's location
     shadowAnchor: [24, 60],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
    iconUrl: './img/markers/red.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [38, 60], // size of the icon
     shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 60], // point of the icon which will correspond to marker's location
     shadowAnchor: [24, 60],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    
});




var greenFrndIcon = L.icon({
    iconUrl: './img/markers/green-frnd.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [28, 55], // size of the icon
    shadowSize:   [28, 60], // size of the shadow
    iconAnchor:   [19, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [19, 55],  // the same for the shadow
     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var orangeFrndIcon = L.icon({
    iconUrl: './img/markers/yellow-frnd.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [28, 55], // size of the icon
    shadowSize:   [28, 60], // size of the shadow
    iconAnchor:   [19, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [19, 55],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redFrndIcon = L.icon({
    iconUrl: './img/markers/red-frnd.png',
    shadowUrl: './img/markers/shadow.png',

    iconSize:     [28, 55], // size of the icon
    shadowSize:   [28, 60], // size of the shadow
    iconAnchor:   [19, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [19, 55],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    
});
 

function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;  
        dist = dist * 1.609344  
		return dist;
    }
}
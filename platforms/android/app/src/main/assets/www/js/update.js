 
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
var id =d.getItem("ID");
$("#userID").val(id);  
 
  
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

function updateData()
{  var phone = document.getElementById("Phone").value;

        d.setItem("number",phone);
        

}


  $("#updateForm").submit(function(event) {
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
                d.setItem("IV",result);
                alert("Symptoms Updated.")
                window.location.replace("index.html");

           }

   });
 });
 
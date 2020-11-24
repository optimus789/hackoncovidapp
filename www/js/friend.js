
$("#friendForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault(); 
    var d = window.localStorage;
    var id;
    id = document.getElementById("userID2").value; 
    d.setItem("ID",id);
   

    /* get the action attribute from the <form action=""> element */
    var $form = $( this ),
        url = $form.attr( 'action' );
  
        $.ajax({
            url:url,
            type:'POST',
            data:$(this).serialize(),
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });

$("#addid").click(function(event){
    var d = window.localStorage;
    var id;
    id = document.getElementById("userID").value;
    d.setItem("ID",id);
    //location.reload();
 

});

 
  $("#confirm").click(function(event) {

   
    /* get the action attribute from the <form action=""> element */
    
    url = "http://rushikeshk9.pythonanywhere.com/accept/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: d.getItem("ID"),friendID:document.getElementById("friendName").innerHTML},
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });


  $("#reject").click(function(event) {

   
    /* get the action attribute from the <form action=""> element */
    
    url = "http://rushikeshk9.pythonanywhere.com/reject/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: d.getItem("ID"),friendID:document.getElementById("friendName").innerHTML},
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });



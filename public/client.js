window.onload=function () {

    $('#submit').click(function () {

        var obj1 = {
            username : $('#username').val(),
            password : $('#password').val()
        };
        console.log(""+obj1);
        if(obj1!=undefined) {
            console.log("Hello"+obj1.username+" "+obj1.password);
            $.post("/login", obj1, function (data, status) {

            });


        }

    });


}

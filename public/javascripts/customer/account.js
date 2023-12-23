jQuery(function ($) {
    $(document).ready(function () {
        $("#customer_register_form").submit(function (e){
            e.preventDefault();
            var form = $(this);
            form.callApi();
            /*var form = $(this);
            var actionUrl = form.attr('action');
            $.ajax({
                "url": actionUrl,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify(form.serializeObject()),
                success: function(data)
                {
                    alert(data);
                },
                error:function (response){

                }
            });*/

        });
    })
});

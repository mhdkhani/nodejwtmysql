jQuery(function ($) {
    $(document).ready(function () {
        $("#customer_register_form").submit(function (e){
            e.preventDefault();
            var form = $(this);
            var actionUrl = form.attr('action');
            $.ajax({
                type: "POST",
                url: actionUrl,
                data: form.serializeObject(),
                success: function(data)
                {
                    alert(data);
                }
            });
        });
    })
});

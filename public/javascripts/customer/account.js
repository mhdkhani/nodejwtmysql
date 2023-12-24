jQuery(function ($) {
    $(document).ready(function () {
        $("#customer_register_form").submit(function (e){
            e.preventDefault();
            var form = $(this);
            form.callApi();
        });
        $("#customer_login_form").submit(function (e){
            e.preventDefault();
            var form = $(this);
            form.callApi();
        });
    })
});

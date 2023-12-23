jQuery(function ($) {
    $(document).ready(function () {
        /* form data as json */
        $.fn.serializeObject = function() {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        /* call api */
        $.fn.callApi = function() {
            var form = $(this);
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
            });
        };
    })
});

'use strict';
 

app.factory('Mensaje', function Mensaje() {
    return {
        success: function (msg, title) {
            $.Notification.notify('success', 'top right', title, msg);
            //toaster.pop('success', title, msg);
        },
        error: function (msg, title) {
            $.Notification.notify('error', 'top right', title, msg);
            //toaster.pop('error', title, msg);
        },
        info: function (msg, title) {
            $.Notification.notify('info', 'top right', title, msg);
            //toaster.pop('info', title, msg);
        },
        warning: function (msg, title) {
            $.Notification.notify('warning', 'top right', title, msg);
            //toaster.pop('warning', title, msg);
        }
    };
});

app.factory('appUtils',function(){
        var mToday=null;
        return{
            checkDateInput: function () {
                var input = document.createElement('input');
                input.setAttribute('type','date');

                var notADateValue = 'not-a-date';
                input.setAttribute('value', notADateValue);

                return !(input.value === notADateValue);
            },
            setToday: function(hoy){
                mToday=hoy;
            },
            today: function(){
                return mToday;
            }


        }}
);


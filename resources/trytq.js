$(document).ready(function() {
    $(window).unload(function() {
        $.ajax({ url: '/terminate', async: false })
    })
    $('#console').console({
        promptLabel: '> ',
        commandHandle: function(line) {
            var response = $.ajax({
                url: '/execute',
                data: { code: line },
                async: false,
             dataType: 'json'
            }).responseText
            if(response) {
                console.log(response)
                response = $.parseJSON(response)
                result = [
                    { msg: response['stdout'], className: 'jquery-console-message-stdout' },
                    { msg: response['result'], className: 'jquery-console-message-value' }
                ]
                if(response['class'])
                    result.push({ msg: '('+response['class']+')', className: 'jquery-console-message-type' })
                if(response['error'])
                    result.push({ msg: response['error'], className: 'jquery-console-message-error' })
                return result;
            } else {
                return true
            }
        },
        commandValidate: function(line) {
            return true
        },
        animateScroll: true,
        promptHistory: true,
        autofocus:     true
    })
})


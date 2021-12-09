$(document).ready(function() {

    const contactUrl = "https://carsafeappserver.herokuapp.com/web/contact"

    var randomString = function (len, bits) {
        bits = bits || 36;
        var outStr = "", newStr;
        while (outStr.length < len) {
            newStr = Math.random().toString(bits).slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
        }
        return outStr.toUpperCase();
    }

    $("#contact-submit").click(function(){
        const email = $("#contact-email").val()
        const name = $("#contact-name").val()

        if (email.length === 0 || name.length === 0) {
            console.error("Email address and name are required")
            return
        }

        const dataString = '{"emailAddress": "' + email + '", "name": "' + name + '"}'
        const timestamp = Math.floor(+new Date() / 1000)
        const nonce = randomString(100)

        $.ajax({
            url: contactUrl,
            type: 'POST',
            crossdomain: true,
            data: dataString,
            headers: {
                'SP-Timestamp': timestamp,
                'SP-Nonce': nonce,
                'SP-UniqueId': "carsafe-web",
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            success: function(data) {
                const status = data.status
                if (status !== "ok") {
                    console.error("Cannot submit contact request!")
                } else {
                    $(".contact-confirm").removeClass("hidden")
                    $("#contact-email").val("")
                    $("#contact-name").val("")
                }
            },
            error: function(err) {
                console.error("Failed to submit contact request!")
            }
        });
    });
})

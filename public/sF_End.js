Stripe.setPublishableKey(process.env.STRIPE_PUBLIC_KEY);

const $form = $('#checkoutform')

$form.submit((e) => {
    $form.find('#charge_error').addClass('hidden');
    e.preventDefault()

    $form.find('button').prop('disabled', true)
    var expiryVal = document.getElementById('cc-exp').value.split("-")
    //  var expiryVal = expiry.split("-")
    var month = expiryVal[1]
    var year = expiryVal[0]

    Stripe.card.createToken({
        number: $('#cc-number').val(),
        cvc: $('#cc-cvv').val(),
        //  exp_month: 02,
        //  exp_year: 2022,

        exp_month: month,
        exp_year: year,
        name: $('#firstName').val()
        //  name: $('#cc-name').val()
    }, stripeResponseHandler);
    return false;
})


function stripeResponseHandler(status, response) {

    // Grab the form:

    if (response.error) { // Problem!

        $form.find('button').innerHtml = "<i class='fas fa-spinner fa-spin'></i>  Payment Processing"

        // Show the errors on the form
        $form.find('#charge_error').text(response.error.message);
        $form.find('#charge_error').removeClass('hidden');
        setTimeout(function () {
            $form.find('#charge_error').addClass('hidden')
        }, 5 * 1000)

        //  alert(response.error.message)
        $form.find('button').prop('disabled', false); // Re-enable submission
        //  alert(expiryVal)

    } else { // Token was created!
        $form.find('button').attr("style", "background-color:black")
        $form.find('button').html("<span><i class='fas fa-spinner fa-spin'></i> Processing Payment</span>")

        // Get the token ID:
        var token = response.id;

        //  alert(token)
        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}
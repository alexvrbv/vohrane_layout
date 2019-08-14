"use strict";

$(document).ready(function(){
    phoneMaskInit();
    matchHeightInit();
    ratingValueChangeInit();
    formsInit();
});

//Phone mask
function phoneMaskInit() {
    $("[name='phone']").mask("+7(999) 999-9999");
}

//Match height
function matchHeightInit() {
    //$('.advantage').matchHeight();
    $('.profile__inner').matchHeight({byRow: false});
    $('.company__inner').matchHeight({byRow: false});
}

//Rating value change
function ratingValueChangeInit() {
    $.mask.definitions['r'] = "[1-5]";
    $("[name='rating']").mask("r");
    $('.input-minus').click(function () {
        var input = $(this).parent().find('input');
        var value = input.val() ? input.val() : 6;
        var count = parseInt(value) - 1;
        count = count < 1 ? 1 : count;
        input.val(count);
        input.change();
        return false;
    });
    $('.input-plus').click(function () {
        var input = $(this).parent().find('input');
        var value = input.val() ? input.val() : 0;
        var count = parseInt(value) + 1;
        count = count > 5 ? 5 : count;
        input.val(count);
        input.change();
        return false;
    });
}

//Forms
function formsInit(){
	$('.js-form').submit(function(e){
        $(this).validate();
		if ($(this).valid()) {
			$(this).ajaxSubmit({
				type: 'POST',
				url: '/local/templates/3pl/order.php',
				beforeSubmit: function(){
                    $.magnificPopup.close();
				},
				success: function(response){
					console.log(response);
					if (response == 'Ok'){
						$.magnificPopup.open({
							items: {
								src: '#successPopup',
							},
							type: 'inline',
							mainClass: 'form-popup',
						});
					} else {
						$.magnificPopup.open({
							items: {
								src: '#errorPopup',
							},
							type: 'inline',
							mainClass: 'form-popup',
						});					
					}
				},
				error: function(){
					$.magnificPopup.open({
						items: {
							src: '#errorPopup',
						},
						type: 'inline',
						mainClass: 'form-popup',
					});
				}
			});
			return false;
		} else {
			e.preventDefault();
		}
	});
}
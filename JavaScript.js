//DARK MODE / LIGHT MODE
$(document).ready(function () {
    $("#on").click(function () {
        $("#on").css("display", "none");
        $("#off").css("display", "block");
        $("body").css("background-color", "#2c0c39");
        $("#cardpage3").css("background-color", "#381944");
        $("#cardpage2").css("background-color", "#381944");
        $("#cardpage1").css("background-color", "#381944");
        $("#cardpage3").css("border-color", "#21062c");
        $("#cardpage2").css("border-color", "#21062c");
        $("#cardpage1").css("border-color", "#21062c");
        $("#cardpage3").css("box-shadow", "0px 0px 5px #111");
        $("#cardpage2").css("box-shadow", "0px 0px 5px #111");
        $("#cardpage1").css("box-shadow", "0px 0px 5px #111");
        $("#botaopedido").css("background-color", "#b71566");
        $("#botaopedido").before('<style>button#botaopedido:before{border-color: #b71566}</style>');
        $("#botaofornecedor").css("background-color", "#b71566");
        $("#botaofornecedor").before('<style>button#botaofornecedor:before{border-color: #b71566}</style>');
        $(".card.carrosel").css("background-color", "#381944");
        $(".card.carrosel").css("border-color", "#21062c");
        $(".tipoeventoss").css("background-color", "#472455");
        $(".nameevent").css("color", "#cb98e9!important");
        $(".fa fa-arrow-right").css("color", "#cb98e9!important");
        $(".tipoeventoss").css("border", "1px solid #240630");
        $("#img2").attr("src", "https://i.imgur.com/AgekJHf.jpg");
        $('select#distritos option[value=Null]').attr('selected', 'selected');
        $('#disponivel').css('color', '#aaa');
        $('#indisponivel').css('color', '#aaa');
        $('#rosa').css('color', '#960058');
        $('#roxo').css('color', '#710096');
        $(".popup-overlay").css('border', '6px double #2c0c39');
        $("label").css('color', '#cb98e9');
        $(".radioans").css('color', '#bbb');
        $(".a").css('color', '#b71566');
    });


    $("#off").click(function () {
        $("#off").css("display", "none");
        $("#on").css("display", "block");
        location.reload();
    });

    $("i.fa.fa-plus").click(function () {
        $(".popup-overlay, .popup-content").addClass("active");
        $("body").css('opacity', '0.7');
    });
    $("i.fa.fa-times").click(function () {
        $(".popup-overlay, .popup-content").removeClass("active");
        $("body").css('opacity', '1.0');
    });
});
/**
 * Created by D on 12.09.2015.
 */

$(document).ready(function() {
    $(".craft").click(function() {
        var id = $(this).attr("id");
        if (craftStart(id) == true) {
            crafting = true;
            $(".craft").unbind();
            var cooldown = getCooldown(id);
            $('#'+id+'Bar').animate({width:"100%"},cooldown,"linear",function () {$(this).css("width","0");});
            console.log("Craft "+id);
            craftTimeout(id);
        }
    });
});

function craftTimeout(id) {
    var cooldown = getCooldown(id);
    return window.setTimeout(function () {
        craftEnd(id);
        $(".craft").bind().click(function() {
            var id = $(this).attr("id");
            if (craftStart(id) == true) {
                crafting = true;
                $(".craft").unbind();
                var cooldown = getCooldown(id);
                $(".progressBar").html("");
                $('#'+id+'Bar').animate({width:"100%"},cooldown,"linear",function () {$(this).css("width","0");});
                console.log("Craft "+id);
                craftTimeout(id);
            }
        })
    }, cooldown);
}

function getCooldown(id) {
    var index;
    index = getItemIndex(id);
    return cooldownList[index];
}
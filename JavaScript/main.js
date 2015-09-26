/**
 * Created by D on 02.09.2015.
 */

//variables

var customerInterval; //Interval bis neuer customer gespawnt wird, in Sekunden/10 bzw. in Ticks
var customerTimer;
var customers; //Customers die grade im Shop sind
var maxCustomers;
var fame;
var gold;
var lastRequest;
var counter;
var craftExp;
var craftLvl;
var craftLvlNext;
var crafting;


customerInterval = 100;
customerTimer = 100;
customers = [];
maxCustomers = 5;
fame = 0;
gold = 100;
counter = 0;
craftExp = 0;
craftLvl = 1;
craftLvlNext = 2;
crafting = false;

function logic() {
    //customer spawning

    customerTimer--;
    if (customerTimer == 0) {
        if (customers.length < maxCustomers) {
            customers.push(createCustomer());
        }
        customerTimer = customerInterval;
    }

    //craftLvl

    if (craftExp >= craftLvlList[craftLvl-1]) {
        craftLvl++;
        for (var n=0;n<=craftExpList.length;n++) {
            cooldownList[n] = cooldownList[n] / 2;
        }
        console.log("Craft LVL UP");
    }
}

function sale(customer) {                   //customer ist die stelle im array "customers", nicht das objekt

    if(inventory[getRequestedItemIndex(customer)] >= 1) {
        inventory[getRequestedItemIndex(customer)] -= 1;
        gold += customers[customer].offer;
        fame++;
        killCustomer(customer);
        return true;
    }
}

function killCustomer(customer) {
    $("#ShopDiv").find("> div:eq("+customer+")").remove();
    var n = $(".customer, .thief").length;
    if (n != customers.length) {
        customers.splice(customer,1);
        console.log("spliced");
    }
}

function steal(thief) {

    //TODO steal item


    killThief(thief);
}

function killThief(thief) {
    $("#ShopDiv").find("> div:eq("+thief+")").remove();
    var n = $(".customer, .thief").length;
    if (n != customers.length) {
        customers.splice(thief,1);
        console.log("spliced");
    }
}


    craftStart = function (item) {
        var itemIndex = getItemIndex(item);
        if (gold >= value[itemIndex]) {
            gold -= value[itemIndex];
            return true;
        }
        else return false;
    };

    craftEnd = function (item) {
        var itemIndex = getItemIndex(item);
        inventory[itemIndex]++;
        craftExp += craftExpList[itemIndex];
        crafting = false;
    };



window.setInterval( function() {
    logic();
    document.getElementById('craftInfo').innerHTML = "Level "+craftLvl+"  "+craftExp+"/"+craftLvlList[craftLvl-1]+ " Exp";
    document.getElementById('pistolInfo').innerHTML = inventory[0]+" Pistols";
    document.getElementById('rifleInfo').innerHTML = inventory[1]+" Rifles";
    document.getElementById('shotgunInfo').innerHTML = inventory[2]+" Shotguns";
    if (!crafting) {
        document.getElementById('pistolInfo').innerHTML = inventory[0]+" Pistols<br />Craft for " + value[0] + " Gold (takes " + cooldownList[0] / 1000 + "seconds)";
        document.getElementById('rifleInfo').innerHTML = inventory[1]+" Rifles<br />Craft for " + value[1] + " Gold (takes " + cooldownList[1] / 1000 + "seconds)";
        document.getElementById('shotgunInfo').innerHTML = inventory[2]+" Shotguns<br />Craft for " + value[2] + " Gold (takes " + cooldownList[2] / 1000 + "seconds)";
    }
    document.getElementById('gold').innerHTML = gold+" Gold";
    document.getElementById('fame').innerHTML = fame+" Fame";
},30); //10 Ticks pro Sekunde
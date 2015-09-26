/**
 * Created by D on 09.09.2015.
 */

    function createCustomer() {
        var customer;
        var typeDeterminator;
        var newDiv;
        var timeout;
        var timeoutOne;
        var timeoutTwo;
        var b;
        var t;

        b = 0;
        t = 0;
        if (fame >= 10) {b=2}
        if (fame >= 100) {b=3;t=1}

        customer = [];
        typeDeterminator = Math.round(Math.random() * 10);

        if (typeDeterminator >= b) {
            customer.type = "buyer";
        } else if (typeDeterminator >= t) {
            customer.type = "thief";
        } else {
            customer.type = "quest";
        }

        if (customer.type == "buyer") {

            var requestIndex;
            requestIndex = getRequestIndex();

            customer.request = items[requestIndex];
            customer.offer = Math.round(value[requestIndex] * Math.randomGaussian(1.2,0.3));

            newDiv = document.createElement("div");
            newDiv.className = "customer";
            newDiv.innerHTML = customer.request + "<br />" + customer.offer + " Gold";

            $("#ShopDiv").append(newDiv);

            function customerTimeout() {
                var $this = $(".customer:last");
                timeoutOne = window.setTimeout(function() {
                    $this.css("background-color","yellow");
                }, 45000);
                timeoutTwo = window.setTimeout(function () {
                    killCustomer($this.index());
                }, 50000);
            }

            customerTimeout();

            $(".customer:last").click(function() {
                var d;
                d = sale($(".customer, .thief").index(this));
                if (d==true) {
                    clearTimeout(timeoutOne);
                    clearTimeout(timeoutTwo);
                }
            });
        }

        if (customer.type == "thief") {

            //TODO: properties

            newDiv = document.createElement("div");
            newDiv.className = "thief";

            $("#ShopDiv").append(newDiv);

            function thiefTimeout() {
                var $this = $(".thief:last");
                timeout = window.setTimeout(function () {
                    steal($this.index());
                }, 5000);
            }

            thiefTimeout();

            $(".thief:last").click(function() {
                killThief($(".customer, .thief").index(this));
                clearTimeout(timeout);
            });
        }


        //TODO: properties


        return customer;
    }
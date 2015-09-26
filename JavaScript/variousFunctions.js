/**
 * Created by D on 25.09.2015.
 */

function getItemIndex(item) {
    for (var n=0;n<=items.length;n++) {
        if (items[n] == item) {
            return n;
        }
    }
}

function getRequestedItemIndex(customer) {
    for (var n= 0; n<=items.length;n++) {
        if (items[n] == customers[customer].request) {
            return n;
        }
    }
}

Math.randomGaussian = function(mean, standardDeviation) {

    if (Math.randomGaussian.nextGaussian !== undefined) {
        var nextGaussian = Math.randomGaussian.nextGaussian;
        delete Math.randomGaussian.nextGaussian;
        return (nextGaussian * standardDeviation) + mean;
    } else {
        var v1, v2, s, multiplier, r, n;
        do {
            v1 = 2 * Math.random() - 1; // between -1 and 1
            v2 = 2 * Math.random() - 1; // between -1 and 1
            s = v1 * v1 + v2 * v2;
        } while (s >= 1 || s == 0);
        multiplier = Math.sqrt(-2 * Math.log(s) / s);
        n = v2 * multiplier;
        if (n < 0) {n=n*-1}
        Math.randomGaussian.nextGaussian = n;
        r = (v1 * multiplier * standardDeviation) + mean;
        if (r < 0) {r=r*-1}
        return r;
    }
};

function getRequestIndex() {
    var requestWorth;
    requestWorth = Math.randomGaussian(1,1) * 5 * fame;
    for (var n = value.length-1; n >= 0; n--) {
        if (value[n] <= requestWorth) {
            if (n == lastRequest && counter < 3) {
                counter++;
                return getRequestIndex();
            }
            lastRequest = n;
            counter = 0;
            return n;
        }
    }
    return 0;
}
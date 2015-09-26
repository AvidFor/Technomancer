/**
 * Created by D on 02.09.2015.
 */

var currentView;

function changeView(newView) {

    if (currentView != null) {
        document.getElementById(currentView).style.display = "none";
    }

    document.getElementById(newView).style.display = "inline";

    currentView = newView;
}
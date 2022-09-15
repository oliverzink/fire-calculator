
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function updateSliders(){
    const sliderVals = [document.getElementById("age").value, document.getElementById("return").value, document.getElementById("invested").value, document.getElementById("yearly_income").value, document.getElementById("raise").value, document.getElementById("percent_saved").value, document.getElementById("spend").value, document.getElementById("withdraw_rate").value];
    // const age = document.getElementById("age");
    // const sliderVals = [age.value];
    return sliderVals;
}

function updateValues(sliderVals){
    let withdraw_rate = sliderVals[7]/100;
    let spend = sliderVals[6];
    let lumpSum = spend/withdraw_rate; // this is the total amount of money needed to retire where you can live off 7%
    // document.getElementById("timeTillRetire").innerHTML = lumpSum;
    let monthlySave = sliderVals[5] *.01 * sliderVals[3]/12; // this is the amount of money you save each year
    let n = 12; // number of times compounded per year
    let r = sliderVals[1]/100; // interest rate
    let R = r/n; // interest rate per compounding period
    let initialInvestment = sliderVals[2]; // initial investment
    let denom = n * Math.log(1 + R);
    let num = Math.log((lumpSum*R + monthlySave)/(initialInvestment*R + monthlySave));
    let yearsTillRetire = num/denom;
    let monthsTillRetire = (yearsTillRetire % 1)/.12;
    let roundedYears = Math.round(yearsTillRetire);
    let retireAge = parseInt(sliderVals[0]) + roundedYears;
  
    let demonstration = 100 * (Math.pow(1+R, n*roundedYears));


    if(withdraw_rate > 0){
        document.getElementById("totalLabel1").innerHTML = "You need $";
        document.getElementById("totalLabel2").innerHTML = "to be financially independent";
        document.getElementById("totalLabel3").innerHTML = "Once you achieve this number, your money will work for you!";
        document.getElementById("lumpSum").innerHTML = numberWithCommas(Math.round(lumpSum));
        document.getElementById("settingsNote").innerHTML = "Play around with the sliders for different outcomes/possibilities";



        if (Math.round(yearsTillRetire) <= 0){
            document.getElementById("retireNow").innerHTML = "You can retire right now!";
            document.getElementById("timeRetire1").innerHTML = "";
            document.getElementById("timeRetire2").innerHTML =  "";
            document.getElementById("timeRetire3").innerHTML =  "";
            document.getElementById("yearsTillRetire").innerHTML =  "";
            document.getElementById("monthsTillRetire").innerHTML =  "";
            document.getElementById("whenAge").innerHTML = "";
            document.getElementById("retireAge").innerHTML = "";

        }
        else{
            document.getElementById("timeRetire1").innerHTML = "You can retire in";
            document.getElementById("timeRetire2").innerHTML =  "years,";
            document.getElementById("timeRetire3").innerHTML =  "month(s)";
            document.getElementById("yearsTillRetire").innerHTML = roundedYears;
            document.getElementById("monthsTillRetire").innerHTML = Math.round(monthsTillRetire);
            document.getElementById("whenAge").innerHTML = "When you are at the age of";
            document.getElementById("retireAge").innerHTML = retireAge;
            document.getElementById("retireNow").innerHTML = "";

            document.getElementById("suggestions").innerHTML = "Here are some tips to help you reach your retirement goal: ";
            document.getElementById("suggestion1").innerHTML = "Investing money early on is crucial for financial growth and longevity";
            document.getElementById("suggestion2").innerHTML = "The first $1,000 you invest will be worth $";
            document.getElementById("demonstration").innerHTML = numberWithCommas(Math.round(demonstration));
            document.getElementById("suggestion3").innerHTML = "by the time you retire";
            document.getElementById("suggestion4").innerHTML = "Take advantage of compound interest!";
        }

    }
    // console.log(timeUntilRetire);

}




update=()=>{
    sliderVals = updateSliders();
    updateValues(sliderVals);
    myRequestId = window.requestAnimationFrame(update);
}

update();
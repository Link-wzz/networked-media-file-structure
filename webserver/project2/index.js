window.onload = () =>{
    // Set up variables to store lastest time
    var nowTotalTime;
    var previousHour;
    var currentHour;
    var previousMinute;
    var currentMinute;

    // Set this variable to detact the width of the screen
    var isMobile = window.matchMedia("only screen and (max-width: 480px)");

    // Set up instance, initialize previous time 
    var initialTime = new Date();
    initialTime = initialTime.toLocaleTimeString();
    var initialTotalTime = initialTime.split(':');
    previousHour = Number(initialTotalTime[0]);
    previousMinute = Number(initialTotalTime[1]);

    //Initialize time when the user enter the website
    var lT = new Date();
    lT = lT.toLocaleTimeString();
    nT = lT.split(':');
    cH = Number(nT[0]);
    cM = Number(nT[1]);
    initializeTime(cH,cM);

    function initializeTime (currentHour, currentMinute){
        //hours
        var hourTens = Math.floor(currentHour/10); 
        var hourSingle = currentHour % 10;

        //minutes
        var minuteTens = Math.floor(currentMinute/10); 
        var minuteSingle = currentMinute % 10;

        document.getElementById("hourTens").innerHTML = "<img src='images/" + hourTens + ".png"+ "' class='hand" + hourTens+" IMG"+"'>";
        document.getElementById("hourSingle").innerHTML = "<img src='images/" + hourSingle + ".png"+ "' class='hand" + hourSingle+" IMG"+"'>";
        document.getElementById("minuteTens").innerHTML = "<img src='images/" + minuteTens + ".png"+ "' class='hand" + minuteTens+" IMG"+"'>";
        document.getElementById("minuteSingle").innerHTML = "<img src='images/" + minuteSingle + ".png"+ "' class='hand" + minuteSingle+" IMG"+"'>";
    }

    //Check once per second whether the time needs to be updated
    setInterval(checkUpdate,1000);
    //Make the colon between hours and minutes flash once per second (2s is a complete blink)
    setInterval(dotBlink,2000);

    //Check if the image needs to be updated by comparing the time with previous time
    function checkUpdate(){
        var loadTime = new Date();
        loadTime = loadTime.toLocaleTimeString();
        nowTotalTime = loadTime.split(':');
        currentHour = Number(nowTotalTime[0]);
        currentMinute = Number(nowTotalTime[1]);

        if (previousHour < currentHour){
            console.log('Update Hours!');
            updateHours(currentHour);
            updateMinutes(currentMinute);
            previousHour = currentHour;
            previousMinute = currentMinute;
        }
        else if(previousMinute < currentMinute){
            console.log('Update Minutes!');
            updateMinutes(currentMinute);

            previousMinute = currentMinute;
        }
    }

    function updateHours (currentHour){
        var tens = Math.floor(currentHour/10); 
        var single = currentHour % 10;
        console.log(tens,single);

        if (((tens == 0 || tens == 1 || tens == 2) && (single==0))){
            mobileOrPcDivGoesDown("hourTens");
            mobileOrPcDivGoesDown("hourSingle");
            setTimeout(function(){
                document.getElementById("hourTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG'>";
                divGoesUp("hourTens");
                document.getElementById("hourSingle").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG'>";
                divGoesUp("hourSingle");
            }, 2000);
        } else {
            mobileOrPcDivGoesDown("hourSingle");
            setTimeout(function(){
                document.getElementById("hourSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG'>";
                divGoesUp("hourSingle");
            }, 2000);
        }        
    }

    function updateMinutes (currentMinute){
        var tens = Math.floor(currentMinute/10); 
        var single = currentMinute % 10;
        if ( tens == 0 && single == 0 ){
            mobileOrPcDivGoesDown("minuteTens");
            mobileOrPcDivGoesDown("minuteSingle");
            setTimeout(function(){
                document.getElementById("minuteTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+ " IMG'>";
                divGoesUp("minuteTens");
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG'>";
                divGoesUp("minuteSingle");
            }, 2000);
        }
        
        else if(tens <=5 && single ==0){
            mobileOrPcDivGoesDown("minuteTens");
            mobileOrPcDivGoesDown("minuteSingle");

            setTimeout(function(){
                document.getElementById("minuteTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG'>";
                divGoesUp("minuteTens");
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG'>";
                divGoesUp("minuteSingle");
            }, 2000);
        }
        
        else if(single !=0){
            mobileOrPcDivGoesDown("minuteSingle");
            setTimeout(function(){
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG'>";
                divGoesUp("minuteSingle");
            }, 2000);
        }
    }

    function mobileOrPcDivGoesDown(divId){
        if (isMobile.matches){
                //this version of divGoesDown is for the mobile phone
                document.getElementById(divId).style.transform = "translate(0px,26vh)"
        } else{
                document.getElementById(divId).style.transform = "translate(0px,22vw)"
            }
    }
    
    function divGoesUp(divId){
        document.getElementById(divId).style.transform = "translate(0px,0px)"
    }

    function dotBlink(){
        document.getElementById("dot1").style.backgroundColor = "rgba(255, 255, 255,0)";
        document.getElementById("dot2").style.backgroundColor = "rgba(255, 255, 255,0)";
        setTimeout(function(){
            document.getElementById("dot1").style.backgroundColor = "rgb(255, 255, 255)";
            document.getElementById("dot2").style.backgroundColor = "rgb(255, 255, 255)";
        },1000);

    }

}

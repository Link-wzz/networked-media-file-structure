window.onload = () =>{

    var nowTotalTime;
    var previousHour;
    var currentHour;
    var previousMinute;
    var currentMinute;

    //this variable is used to fit different media queries of js
    var isMobile = window.matchMedia("only screen and (max-width: 480px)");
    // mobileOrPcDivGoes(isMobile );

 
    var initialTime = new Date();
    initialTime = initialTime.toLocaleTimeString();
    var initialTotalTime = initialTime.split(':');
    previousHour = Number(initialTotalTime[0]);
    previousMinute = Number(initialTotalTime[1]);
    // console.log(previousHour,previousMinute);

    

    //initialize time
    var lT = new Date();
    lT = lT.toLocaleTimeString();
    nT = lT.split(':');
    cH = Number(nT[0]);
    cM = Number(nT[1]);

    initializeTime(cH,cM);

    setInterval(checkUpdate,1000);
    setInterval(dotBlink,2000);

    function checkUpdate(){

        var loadTime = new Date();
        loadTime = loadTime.toLocaleTimeString();
        nowTotalTime = loadTime.split(':');
        currentHour = Number(nowTotalTime[0]);
        currentMinute = Number(nowTotalTime[1]);
        console.log(currentMinute);
        console.log(currentHour);


        // //initialize time
        // initializeTime(currentHour,currentMinute);
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

    function initializeTime (currentHour, currentMinute){
        //hour
        var hourTens = Math.floor(currentHour/10); 
        var hourSingle = currentHour % 10;

        //minute
        var minuteTens = Math.floor(currentMinute/10); 
        var minuteSingle = currentMinute % 10;

        //Initialize  Time  ： Update All digits
        document.getElementById("hourTens").innerHTML = "<img src='images/" + hourTens + ".png"+ "' class='hand" + hourTens+" IMG"+"'>";
        document.getElementById("hourSingle").innerHTML = "<img src='images/" + hourSingle + ".png"+ "' class='hand" + hourSingle+" IMG"+"'>";
        document.getElementById("minuteTens").innerHTML = "<img src='images/" + minuteTens + ".png"+ "' class='hand" + minuteTens+" IMG"+"'>";
        document.getElementById("minuteSingle").innerHTML = "<img src='images/" + minuteSingle + ".png"+ "' class='hand" + minuteSingle+" IMG"+"'>";
    }

    function updateHours (currentHour){
        // Get the tens digit of the hour
        var tens = Math.floor(currentHour/10); 
        // Get the single digit of the hour
        var single = currentHour % 10;
        console.log(tens,single);

        if (single == 0 && tens == 0 ){
            mobileOrPcDivGoesDown("hourTens");
            mobileOrPcDivGoesDown("hourSingle");
            // mobileOrPcDivGoesDown("hourTens");
            // mobileOrPcDivGoesDown("hourSingle");
            
            // divGoesDown("hourTens");
            // divGoesDown("hourSingle");

            setTimeout(function(){
                document.getElementById("hourTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG"+"'>";
                divGoesUp("hourTens");
                document.getElementById("hourTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG"+"'>";
                divGoesUp("hourSingle");
            }, 2000);

        }

        else if(tens <2 && single ==0 ){
            mobileOrPcDivGoesDown("hourTens");
            mobileOrPcDivGoesDown("hourSingle");
            // divGoesDown("hourTens");
            // divGoesDown("hourSingle");

            setTimeout(function(){
                document.getElementById("hourTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG"+"'>";
                divGoesUp("hourTens");
                document.getElementById("hourSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG"+"'>";
                divGoesUp("hourSingle");
            }, 2000);

        }

        else if(single !=0){
            mobileOrPcDivGoesDown("hourTens");
            // divGoesDown("hourTens");

            setTimeout(function(){
                document.getElementById("hourSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG"+"'>";
                divGoesUp("hourSingle");
            }, 2000);
        }
        

    }

    function updateMinutes (currentMinute){
        // Get the tens digit of the minute
        var tens = Math.floor(currentMinute/10); 
        // Get the single digit of the minute
        var single = currentMinute % 10;
        console.log(tens,single);
        // Update Both digits
        //整点/整十
        if ( tens == 0 && single == 0 ){
            //debug console
            console.log("Minute single and tens change!Full Clock");
            mobileOrPcDivGoesDown("minuteTens");
            mobileOrPcDivGoesDown("minuteSingle");
            // divGoesDown("minuteTens");
            // divGoesDown("minuteSingle");
            setTimeout(function(){
                document.getElementById("minuteTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+ " IMG"+ "'>";
                divGoesUp("minuteTens");
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG"+"'>";
                divGoesUp("minuteSingle");
            }, 2000);

      
        }
        
        else if(tens <=6 && single ==0){
                        //debug console
                        console.log("Minute single and tens change!Full ten");
            mobileOrPcDivGoesDown("minuteTens");
            mobileOrPcDivGoesDown("minuteSingle");
            // divGoesDown("minuteTens");
            // divGoesDown("minuteSingle");

            setTimeout(function(){
                document.getElementById("minuteTens").innerHTML = "<img src='images/" + tens + ".png"+ "' class='hand" + tens+" IMG"+"'>";
                divGoesUp("minuteTens");
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG"+"'>";
                divGoesUp("minuteSingle");
            }, 2000);
        
        }
        
        else if(single !=0){
            // debug console
            console.log("Minute single change!");
            console.log("<=9!");
            mobileOrPcDivGoesDown("minuteSingle");
            // divGoesDown("minuteSingle");
            setTimeout(function(){
                document.getElementById("minuteSingle").innerHTML = "<img src='images/" + single + ".png"+ "' class='hand" + single+" IMG"+"'>";
                divGoesUp("minuteSingle");
            }, 2000);

        }

        console.log(document.getElementById("minuteTens").innerHTML);
        console.log(document.getElementById("minuteSingle").innerHTML);
        //animateDown the Div
        //Change the img here
    }

    function mobileOrPcDivGoesDown(divId){
        if (isMobile.matches){
            //this version of divGoesDown is for the mobile phone
                document.getElementById(divId).style.transform = "translate(0px,22vh)"
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

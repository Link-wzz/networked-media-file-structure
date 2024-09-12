const isDrinkClicked = document.getElementsByClassName('drinksClickDetact');
const isExistDownClicked = document.getElementById('exit-down');
const isExistLeftClicked = document.getElementById('exit-left');
const isExistRightClicked = document.getElementById('exit-right');
const isExistUpClicked = document.getElementById('exit-up');

const isNoteClicked = document.getElementById('noteImage');


const newDiv1= document.createElement('div');

let vendingSound = new Audio('audio/durm.mp3');


const showUpC01 = document.getElementById('collection01');
const showUpCamping = document.getElementById('campingImage');

const showUpC02 = document.getElementById('collection02');
const showUpPath = document.getElementById('pathImage');

const showUpC03 = document.getElementById('collection03');
const showUpBeach = document.getElementById('beachImage');

const showUpC04 = document.getElementById('collection04');
const showUpLeaves = document.getElementById('leavesImage');

const showUpC05 = document.getElementById('collection05');
const showUpTower = document.getElementById('towerImage');

const showUpC07 = document.getElementById('collection07');
const showUpSunset = document.getElementById('sunsetImage');

const showUpC08 = document.getElementById('collection08');
const showUpBridge = document.getElementById('bridgeImage');

const showUpC09 = document.getElementById('collection09');
const showUpStreet = document.getElementById('streetImage');

const showUpC10 = document.getElementById('collection10');
const showUpShenzhen = document.getElementById('shenzhenImage');

const beachStory = document.getElementById('beachStory');
const pathStory = document.getElementById('pathStory');
const campingStory = document.getElementById('campingStory');
const leavesStory = document.getElementById('leavesStory');
const towerStory = document.getElementById('towerStory');
const sunsetStory = document.getElementById('sunsetStory');
const bridgeStory = document.getElementById('bridgeStory');
const streetStory = document.getElementById('streetStory');
const shenzhenStory = document.getElementById('shenzhenStory');

isNoteClicked.addEventListener('click',function(){
    this.style.opacity='0';
    this.style.display="none";
});



isExistDownClicked.addEventListener('click',function(){
    allclear();
});

isExistUpClicked.addEventListener('click',function(){
    allclear();
});


isExistLeftClicked.addEventListener('click',function(){
    allclear();
});


isExistRightClicked.addEventListener('click',function(){
    allclear();
});

for (let i=0; i<isDrinkClicked.length; i++){
    isDrinkClicked[i].addEventListener('click',function(){
        vendingSound.play();
        var vendingMachine = this.parentNode.parentNode;
        vendingMachine.style.transform="translate(10px, 1px)";
        setTimeout(function(){
            vendingMachine.style.transform="translate(-10px, 1px)";
            setTimeout(function(){
                vendingMachine.style.transform="translate(10px, -1px)";
                setTimeout(function(){
                    vendingMachine.style.transform="translate(-10px, 1px)";
                    setTimeout(function(){
                        vendingMachine.style.transform="translate(5px, -1px)";
                        setTimeout(function(){
                            vendingMachine.style.transform="translate(10px, 2px)";
                            setTimeout(function(){
                                vendingMachine.style.transform="translate(-10px, 1px)";
                                setTimeout(function(){
                                    vendingMachine.style.transform="translate(6px, 1px)";
                                    setTimeout(function(){
                                        vendingMachine.style.transform="translate(10px, -1px)";
                                        setTimeout(function(){
                                            vendingMachine.style.transform="translate(-5px, 1px)";
                                            setTimeout(function(){
                                                vendingMachine.style.transform="translate(5px, -1px)";
                                                setTimeout(function(){
                                                    vendingMachine.style.transform="translate(10px, 2px)";
                                                    setTimeout(function(){
                                                        vendingMachine.style.transform="translate(-10px, 1px)";
                                                        setTimeout(function(){
                                                            vendingMachine.style.transform="translate(10px, 1px)";
                                                            setTimeout(function(){
                                                                vendingMachine.style.transform="translate(10px, -1px)";
                                                                setTimeout(function(){
                                                                    vendingMachine.style.transform="translate(-5px, 1px)";
                                                                    setTimeout(function(){
                                                                        vendingMachine.style.transform="translate(5px, -1px)";
                                                                        setTimeout(function(){
                                                                            vendingMachine.style.transform="translate(10px, 2px)";
                                                                            setTimeout(function(){
                                                                                vendingMachine.style.transform="translate(-10px, 1px)";
                                                                                setTimeout(function(){
                                                                                    vendingMachine.style.transform="translate(5px, 1px)";
                                                                                    setTimeout(function(){
                                                                                        vendingMachine.style.transform="translate(10px, -1px)";
                                                                                        setTimeout(function(){
                                                                                            vendingMachine.style.transform="translate(-10px, 2px)";
                                                                                            setTimeout(function(){
                                                                                                vendingMachine.style.transform="translate(5px, -1px)";
                                                                                                setTimeout(function(){
                                                                                                    vendingMachine.style.transform="translate(10px, -1px)";
                                                                                                    setTimeout(function(){
                                                                                                        vendingMachine.style.transform="translate(-10px, 1px)";
                                                                                                        setTimeout(function(){
                                                                                                            vendingMachine.style.transform="translate(10px, 1px)";
                                                                                                            setTimeout(function(){
                                                                                                                vendingMachine.style.transform="translate(10px, 1px)";
                                                                                                                
                                                                                                            }, 100);
                                                                                                        }, 100);
                                                                                                    }, 50);
                                                                                                }, 100);
                                                                                            }, 80);
                                                                                        }, 100);
                                                                                    }, 100);
                                                                                }, 50);
                                                                            },50);
                                                                        }, 50);
                                                                    }, 50);
                                                                }, 100);
                                                            }, 80);
                                                        }, 100);
                                                    }, 60);
                                                }, 100);
                                            }, 100);
                                        }, 50);
                                    }, 100);
                                }, 60);
                            }, 80);
                        }, 80);
                    }, 50);
                }, 100);
            }, 50);
        }, 100);

        if (i==0){
            setTimeout(function(){
                showUpC01.style.opacity = "1";
                setTimeout(function(){
                    showUpCamping.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                beachStory.style.opacity ="1";
            },4000)
        

        }

        if (i==1){
            setTimeout(function(){
                showUpC02.style.opacity = "1";
                setTimeout(function(){
                    showUpPath.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                pathStory.style.opacity ="1";
            },4000)
        }
        if (i==2){
            setTimeout(function(){
                showUpC03.style.opacity = "1";
                setTimeout(function(){
                    showUpBeach.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                campingStory.style.opacity ="1";
            },4000)
        }

        if (i==3){
            setTimeout(function(){
                showUpC04.style.opacity = "1";
                setTimeout(function(){
                    showUpLeaves.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                leavesStory.style.opacity ="1";
            },4000)
        }

        if (i==4){
            setTimeout(function(){
                showUpC05.style.opacity = "1";
                setTimeout(function(){
                    showUpTower.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                towerStory.style.opacity ="1";
            },4000)
        }

        if (i==6){
            setTimeout(function(){
                showUpC07.style.opacity = "1";
                setTimeout(function(){
                    showUpSunset.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                sunsetStory.style.opacity ="1";
            },4000)
        }

        if (i==7){
            setTimeout(function(){
                showUpC08.style.opacity = "1";
                setTimeout(function(){
                    showUpBridge.style.opacity ="1";
                },500)
            }, 2300);
                setTimeout(function(){
                    bridgeStory.style.opacity ="1";
                },4000)
        }

        if (i==8){
            setTimeout(function(){
                showUpC09.style.opacity = "1";
                setTimeout(function(){
                    showUpStreet.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                streetStory.style.opacity ="1";
            },4000)
        }

        if (i==9 || i==5){
            setTimeout(function(){
                showUpC10.style.opacity = "1";
                setTimeout(function(){
                    showUpShenzhen.style.opacity ="1";
                },500)
            }, 2300);
            setTimeout(function(){
                shenzhenStory.style.opacity ="1";
            },4000)
        }
    });
}

function allclear(){
    showUpC01.style.opacity='0';
    showUpCamping.style.opacity='0';


    showUpC02.style.opacity='0';
    showUpPath.style.opacity='0';

    showUpC03.style.opacity='0';
    showUpBeach.style.opacity='0';

    showUpC04.style.opacity='0';
    showUpLeaves.style.opacity='0';

    showUpC05.style.opacity='0';
    showUpTower.style.opacity='0';

    showUpC07.style.opacity='0';
    showUpSunset.style.opacity='0';

    showUpC08.style.opacity='0';
    showUpBridge.style.opacity='0';

    showUpC09.style.opacity='0';
    showUpStreet.style.opacity='0';

    showUpC10.style.opacity='0';
    showUpShenzhen.style.opacity='0';

    beachStory.style.opacity='0';
    pathStory.style.opacity='0';
    campingStory.style.opacity='0';
    leavesStory.style.opacity='0';
    towerStory.style.opacity='0';
    sunsetStory.style.opacity='0';
    bridgeStory.style.opacity='0';
    streetStory.style.opacity='0';
    shenzhenStory.style.opacity='0';
}

window.addEventListener('load', function() {
	var superContainer = document.documentElement;
  var scrollIndicatorTransitionTime = 1000; //based on transition time of the scroll indicator labels

  createSnowFlakes();
  function createSnowFlakes(){
  	var xLimit = Math.floor(window.innerWidth/100)*10;
    var yLimit = Math.floor(window.innerHeight/20)*10;
    var snowflakeContainers = document.getElementsByClassName('snowFlakes');
    var snowflakeContainers = document.getElementsByClassName('snowFlakes');
    for(var i = 0; i < snowflakeContainers.length; i++){
    	snowflakeContainers[i].children[0].innerHTML = '';
    }
    for(var i = 0; i < snowflakeContainers.length; i++){
    	var currentContainer = snowflakeContainers[i];
      var currentYContainer = snowflakeContainers[i].getElementsByClassName('snowflakeYContainer')[0];
      for(var k = 0; k < yLimit; k++){
      	//y snow flakes
        var snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        var dimensions = getRandomDimensions();
        snowflake.style.width = dimensions;
        snowflake.style.height = dimensions;
        snowflake.style.top = getRandomYPosition();
        snowflake.style.left = getRandomXPosition();
       	currentYContainer.appendChild(snowflake);
      }
    }
    function getRandomDimensions(){
    	return Math.floor(Math.random()*(6 - 2 +1))+2+'px';
    }
    function getRandomYPosition(){
    	return Math.floor(Math.random()*10*window.innerHeight)+'px';
    }
    function getRandomXPosition(){
    	return Math.floor(Math.random()*window.innerWidth)+'px';
    }
  }
  window.setInterval(function(){
    var snowflakeYContainers = document.getElementsByClassName('snowflakeYContainer');
    var randomYContainer = snowflakeYContainers[Math.floor(Math.random()*snowflakeYContainers.length)];
    randomYContainer.style.left = Math.floor(Math.random()*30)+'vw';
  },500);

	//load background audio (got rid of in the end)
  //Google Source: https://drive.google.com/uc?export=download&id=0By6dnJL49jq5bm5Wdlg3dkd6a0U
  //OneDrive Source: https://onedrive.live.com/download?resid=C20DCB16FD6A5AD7!14808&authkey=!AKAieQ_rmjmhzNs&ithint=file%2cmp3
  var backgroundAudio = new Audio("");
  var controls = document.getElementById('audioControls')
  var audioLoaded = false;
	backgroundAudio.oncanplaythrough = function() {
    audioLoaded = true;
    backgroundAudio.play();
    controls.setAttribute('audioPlaying','');
	};
  backgroundAudio.onended = function() {
    this.currentTime = 0;
    this.play();
	};
  window.setTimeout(function(){
  	if(!audioLoaded){
    	backgroundAudio = null;
      controls.style.display = 'none';
      console.error("Loading of audio is taking longer than 10 seconds; cancel loading");
    }
  },10000);

	//add pause audio handler
  document.getElementById('audioControls').onmousedown = function(){
  	if(backgroundAudio){
    	if(backgroundAudio.paused){
    		backgroundAudio.play();
        controls.removeAttribute('audioPaused')
        controls.setAttribute('audioPlaying','');
      }else{
      	backgroundAudio.pause();
        controls.removeAttribute('audioPlaying');
        controls.setAttribute('audioPaused','');
      }
    }
  };

  //hide all messages except messageOne
  var messages = document.getElementsByClassName('message');
  messages[0].setAttribute('data-x-pos', '0vw');
  for (var i = 1; i < messages.length; i++) {
    messages[i].style.display = 'none';
    messages[i].setAttribute('data-x-pos', i * 100 + 'vw');
    messages[i].style.left = i * 100 + 'vw';
  }
  //create the snow flakes for each message
  for(var i = 0; i < messages.length; i++){
  	var snowflakeContainer = document.createElement('div');
    snowflakeContainer.className = 'snowFlakes';
    //var snowflakeXContainer = document.createElement('div');
    //snowflakeXContainer.className = 'snowflakeXContainer';
    var snowflakeYContainer = document.createElement('div');
    snowflakeYContainer.className = 'snowflakeYContainer';
    //snowflakeContainer.appendChild(snowflakeXContainer);
    snowflakeContainer.appendChild(snowflakeYContainer);
    messages[i].appendChild(snowflakeContainer);
  }
 	//create snow flakes
  createSnowFlakes();

  //show the content after it is loaded
	superContainer.style.display = 'block';
  window.setTimeout(function(){
  	superContainer.style.opacity = '1';
  },0);

  //animate the opening bow
  window.setTimeout(function(){
  	document.getElementById('messageOneBow').style.width = '90%';
  	var bowDivs = document.getElementById('messageOneBow').getElementsByTagName('div');
  	bowDivs[0].style.width = '10vh';
  	bowDivs[1].style.width = '8vh';
  },0);

  var scrollStatus = {
    wheeling: false,
    functionCall: false,
    swappingMessages: false
  };

  var steps = {
    nextStep: function(elem) {
      //move to the next message if there is another step
      if (messages[this.currentStep.index + 1]) {
        scrollStatus.swappingMessages = true;
        elem.setAttribute('data-zoom', '');
        this.currentStep.index++; //increment the index
        this.currentStep.elem = messages[this.currentStep.index];
        var currentIndex = this.currentStep.index;
        var previousStep = messages[this.currentStep.index - 1];
        var currentStep = this.currentStep.elem;
        currentStep.style.display = 'block';
        window.setTimeout(function() {
          //alert(currentStep.style.left)
          window.setTimeout(function() {
            currentStep.style.left = '0vw';
          }, 20);
          //currentStep.style.left = '0vw';
          //hide/show the scroll indicators
          if (currentIndex > 0) {
            //not at beginning message
            scrollIndicators.visibility(true, 'up');
          } else {
            scrollIndicators.visibility(false, 'up')
          }
          if (currentIndex + 1 < messages.length) {
            //hasn't reached the last message
            scrollIndicators.visibility(true, 'down');
          } else {
            scrollIndicators.visibility(false, 'down');
          }
        }, 0);
        currentStep.setAttribute('data-zoom', '');
        window.setTimeout(function() {
          //zoom in the next message
          currentStep.removeAttribute('data-zoom');
          window.setTimeout(function() {
            //hide the previous message and reset its position
            previousStep.removeAttribute('data-zoom');
            previousStep.style.display = 'none';
            window.setTimeout(function() {
              scrollStatus.swappingMessages = false;
            }, 700);
            //previousStep.style.left = previousStep.getAttribute('data-x-pos');
          }, 700);
        }, 300);
      }
    },
    previousStep: function(elem) {
      //show previous step if you are not at the beginning
      if (messages[this.currentStep.index - 1]) {
        scrollStatus.swappingMessages = true;
        window.setTimeout(function() {
          elem.setAttribute('data-zoom', ''); //zoom out current element
        }, 0);
        this.currentStep.index--; //decrement the index
        this.currentStep.elem = messages[this.currentStep.index]; //get target to move to
        var currentIndex = this.currentStep.index; //get the index of element we're navigating too
        var previousStep = messages[this.currentStep.index + 1]; //element we're navigating away from
        var currentStep = this.currentStep.elem; //element we're navigating too
        currentStep.style.display = 'block';
        window.setTimeout(function() {
          window.setTimeout(function() {
            previousStep.style.left = previousStep.getAttribute('data-x-pos');
          }, 20);
          //alert(previousStep.getAttribute('data-x-pos'));
          //hide/show the scroll indicators
          if (currentIndex > 0) {
            //not at beginning message
            scrollIndicators.visibility(true, 'up');
          } else {
            scrollIndicators.visibility(false, 'up')
          }
          if (currentIndex + 1 < messages.length) {
            //hasn't reached the last message
            scrollIndicators.visibility(true, 'down');
          } else {
            scrollIndicators.visibility(false, 'down');
          }
          window.setTimeout(function() {
            currentStep.setAttribute('data-zoom', '');
          }, 0);
          window.setTimeout(function() {
            //zoom in to the target message
            window.setTimeout(function() {
              currentStep.removeAttribute('data-zoom');
            }, 0);
            window.setTimeout(function() {
              //hide the message that we're navigating away from
              window.setTimeout(function() {
                previousStep.removeAttribute('data-zoom');
              }, 0);
              window.setTimeout(function() {
                previousStep.style.display = 'none';
              }, 0);
              window.setTimeout(function() {
                scrollStatus.swappingMessages = false;
              }, 700);
              //previousStep.style.left = previousStep.getAttribute('data-x-pos');
            }, 700);
          }, 300);
        }, 0);
      }
    },
    currentStep: {
      elem: messages[0],
      index: 0
    },
    allSteps: document.getElementsByClassName('message')
  };

  var scrollIndicators = {
    visibility: function(visible, which) {
      if (visible) {
        //show
        switch (which) {
          case "all":
            //show all scroll indicators
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            for (var i = 0; i < scrollIndicatorElem.length; i++) {
              scrollIndicatorElem[i].style.display = 'block';
              window.setTimeout(function() {
                scrollIndicatorElem[i].style.opacity = '1';
              }, scrollIndicatorTransitionTime);
            }
            break;
          case 'up':
            //show up scroll indicator
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            scrollIndicatorElem[0].style.display = 'block';
            window.setTimeout(function() {
              scrollIndicatorElem[0].style.opacity = '1';
            }, scrollIndicatorTransitionTime);
            break;
          case 'down':
            //show down scroll indicator
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            scrollIndicatorElem[1].style.display = 'block';
            window.setTimeout(function() {
              scrollIndicatorElem[1].style.opacity = '1';
            }, scrollIndicatorTransitionTime);
            break;
          default:
            console.error("'which' for scrollIndicator visibility() function not defined");
            break;
        }
      } else {
        //hide
        switch (which) {
          case "all":
            //hide all scroll indicators
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            for (var i = 0; i < scrollIndicatorElem.length; i++) {
              scrollIndicatorElem[i].style.opacity = '0';
              window.setTimeout(function() {
                scrollIndicatorElem[i].style.display = 'none';
              }, scrollIndicatorTransitionTime);
            }
            break;
          case 'up':
            //hide up scroll indicator
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            scrollIndicatorElem[0].style.opacity = '0';
            window.setTimeout(function() {
              scrollIndicatorElem[0].style.display = 'none';
            }, scrollIndicatorTransitionTime);
            break;
          case 'down':
            //hide down scroll indicator
            var scrollIndicatorElem = document.getElementsByClassName('scrollIndicator');
            scrollIndicatorElem[1].style.opacity = '0';
            window.setTimeout(function() {
              scrollIndicatorElem[1].style.display = 'none';
            }, scrollIndicatorTransitionTime);
            break;
          default:
            console.error("'which' for scrollIndicator visibility() function not defined");
            break;
        }
      }
    }
  };

  //show scroll down indicator (after object with function is defined)
  scrollIndicators.visibility(true, 'down');

  window.addEventListener('wheel', function(e) {
    scrollStatus.wheeling = true;
    if (!scrollStatus.functionCall) {
      parseScroll(e);
      scrollStatus.functionCall = true;
    }
    scrollStatus.wheeling = false;
    scrollStatus.functionCall = false;
  });

  function parseScroll(e) {
    if (e.deltaY > 0) {
      //move to next message
      if (!scrollStatus.swappingMessages) {
        steps.nextStep(steps.currentStep.elem);
      }
    }
    if (e.deltaY < 0) {
      //move to previous message
      if (!scrollStatus.swappingMessages) {
        steps.previousStep(steps.currentStep.elem);
      }
    }
  }

  var resizeTimeout = false;
  window.addEventListener('resize',function(){
  	//add debouncing for efficiency
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(function(){
    	createSnowFlakes();
    },100);
  });
  window.addEventListener('scroll',function(e){
  	console.log('scrolled');
    e.preventDefault();
  	return false;
  });
});

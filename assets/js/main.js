//slow navigation menu
function getSlowScroll() {
    const links = document.querySelectorAll('.menu__link');

    
    for (let link of links) {
        link.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = link.getAttribute('href').substr(1);
    
        
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
}
getSlowScroll();



//burger menu
let burger = document.querySelector('.burger');
let burgerMenu = document.querySelector('.burger-menu')

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});



//skills progress bar
function getProgressSkills() {
    const skillsList = document.querySelector('.skills__list');    
    const progress = document.querySelectorAll('.skills__progress');
    const numbers = document.querySelectorAll('.skills__number');
    const circles = document.querySelectorAll('.skills__circle');
    let isStarted = true;


    function getProgress(time) {

        for( let i = 0; i < skillsList.childElementCount; i++) {
            let max;
            let start = 0;
                max = +progress[i].innerHTML.slice(0,-1);
            
                setInterval(() => {
                    if(start > max)  clearInterval();
                    else{
                    progress[i].value = start;
                    numbers[i].innerHTML = start + '%';
                    circles[i].style.left = start + '%';
                    start++;
                    }
                },time);
        }
    }
    
    function getScrollCheck() {
        
        if(window.pageYOffset > 2300 || window.pageYOffset + document.documentElement.clientHeight > 2300) {
            if(isStarted === true) {
                getProgress(40);
                isStarted = false;
            }
        }
    }
    window.addEventListener('scroll', getScrollCheck);
}
getProgressSkills();




//languages progress bar
function getProgressLang(circleLength) {

    const circleDiagramList = document.querySelector('.lang__list');
    const circleDiagrams = document.querySelectorAll('.lang__circle');
    const circlePercents = document.querySelectorAll('.lang__diagram-percent');
    const circlePercentsValue = document.querySelectorAll('.lang__diagram-percent--value');
    let isStarted = true;


    function getCircleProgress(time){

        for(let i = 0; i < circleDiagramList.childElementCount; i++) {
    
            let lengthOperation = circleLength - (circleLength / 100 * +circlePercentsValue[i].innerHTML.slice(0, -1)).toFixed(0);

            let start = circleLength;
            let startPercent = 0;
            
            setInterval(() => {
                if(start < lengthOperation) clearInterval()
                else{
                circlePercents[i].innerHTML = (startPercent/2.2).toFixed(0) + '%';   
                circleDiagrams[i].style.strokeDashoffset = start;
                startPercent++    
                start--
                }
            }, time)
            }
    }
    
    function getScrollCheck() {
    
        if(window.pageYOffset > 1600 || window.pageYOffset + document.documentElement.clientHeight > 1600) {
            if(isStarted === true) {
                getCircleProgress(16);
                isStarted = false;
            }
        }
    }
    window.addEventListener('scroll', getScrollCheck);
}
getProgressLang(219);


    
 

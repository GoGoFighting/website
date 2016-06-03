let bg = document.getElementById('bg');
// let container = document.getElementById('container');
bg.style.height = document.documentElement.clientHeight + 'px';
window.onresize = function() {
    bg.style.height = document.documentElement.clientHeight + 'px';
    bg.style.width = document.documentElement.clientWidth + 'px';
    // if(document.documentElement.clientWidth <= 540){
    // 	bg.style.width = '540px';
    // }
    // if(document.documentElement.clientHeight <= 210){
    // 	bg.style.height = '210px';
    // }
}
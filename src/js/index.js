let bg = document.getElementById('bg');
bg.style.height = document.documentElement.clientHeight + 'px';
window.onresize = function() {
    bg.style.height = document.documentElement.clientHeight + 'px';
    bg.style.width = document.documentElement.clientWidth + 'px';
}
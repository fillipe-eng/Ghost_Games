var imgs = document.querySelector("#img")
var img = document.querySelectorAll("#img img")

var imgAtual = 0

function carrossel(){
    imgAtual++

    if(imgAtual > img.length - 1){
        imgAtual = 0
    }

    imgs.style.transform = `translateX(${-imgAtual * img[0].offsetWidth}px)`
}
setInterval(carrossel , 3000)
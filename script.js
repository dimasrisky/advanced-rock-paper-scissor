const video = document.getElementById('video')
const userInputChoice = document.getElementById('user-choice')
const computerInputChoice = document.getElementById('computer-choice')
const result = document.getElementById('result')
const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')
const element = ['Batu', 'Kertas', 'Gunting']

// const modelURL = 'https://teachablemachine.withgoogle.com/models/4gTMQjjbX/model.json'

const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4gTMQjjbX/model.json', () => {
    alert('Model berhasil dimuat!')
    loadVideo()
})


startButton.addEventListener('click', () => {
    const randomNum = Math.floor(Math.random() * 3) + 0;
    computerInputChoice.value = element[randomNum]
    startRPS(userInputChoice.value, element[randomNum])
})

restartButton.addEventListener('click', () => {
    computerInputChoice.value = '....'
    result.innerText = 'Menunggu pilihan anda...'
})

function classifyVideo(){
    classifier.classify(video, (result) => {
        userInputChoice.value = result[0].label
    })
    setTimeout(() => {
        classifyVideo()
    }, 800);
}

async function loadVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    video.play()
    classifyVideo()
}

function startRPS(user, computer){
    if((element.indexOf(user) + 1) % 3 === element.indexOf(computer)){
        result.innerText = "Anda Kalah!"
    }else if(element.indexOf(user) === element.indexOf(computer)){
        result.innerText = "Hasil Seri!"
    }else{
        result.innerText = "Anda Menang!"
    }
}

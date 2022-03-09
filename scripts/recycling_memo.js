//grab

const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 30;
//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
// [{imgSrc:'./images/memo_birds/bolshaya_sinitsa.jpg'}]

const getData = () => [
{ imgSrc: "./images/recycling_memo/dangerous-bin.png", name: "dangerous"},
{ imgSrc: "./images/recycling_memo/dangerous.png", name: "dangerous"},
{ imgSrc: "./images/recycling_memo/garbage-bin.png", name: "garbage"},
{ imgSrc: "./images/recycling_memo/garbage.png", name: "garbage"},
{ imgSrc: "./images/recycling_memo/glas-bin.png", name: "glas"},
{ imgSrc: "./images/recycling_memo/glas.png", name: "glas"},
{ imgSrc: "./images/recycling_memo/organic-bin.png", name: "organic"},
{ imgSrc: "./images/recycling_memo/organic.png", name: "organic"},
{ imgSrc: "./images/recycling_memo/paper-bin.png", name: "paper"},
{ imgSrc: "./images/recycling_memo/paper.png", name: "paper"},
{ imgSrc: "./images/recycling_memo/plastic-bin.png", name: "plastic"},
{ imgSrc: "./images/recycling_memo/plastic.png", name: "plastic"},
];


//Randomize

const randomize = () => {
  const cardData = getData();
  // console.log(cardData);
  cardData.sort(() => Math.random() - 0.5);
  // console.log(cardData);
  return cardData;
}

//Card Generator Func
const cardGenerator = () => {
  const cardData = randomize();
  //generate html
  cardData.forEach(item => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //attach the info to the card
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //attach cards to section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) =>{ //1
      card.classList.toggle("toggleCard");
      checkCards(e)
    });
  });
};

//Check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if(flippedCards.length===2){
    if(flippedCards[0].getAttribute("name")=== flippedCards[1].getAttribute("name")){
      flippedCards.forEach((card)=>{
        card.classList.remove("flipped");
        card.style.pointerEvents = 'none';
      });
      // setTimeout(() => alert("Это " + flippedCards[1].getAttribute("name")), 1000); //2
    }else{
      console.log("wrong");
      flippedCards.forEach((card)=>{
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if(playerLives===0){
        // alert("Игра закончена!")
        restart("Игра закончена! Попробуйте еще!");
      }
    }
  }

  if(toggleCard.length===24){
    restart("Вы выиграли!")
  }
};

//restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    setTimeout(() => {
    cards[index].style.pointerEvents = "all";
    faces[index].src = item.imgSrc;
    cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
  }, 1000);
  });
    playerLives = 30;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text, 100))
};

cardGenerator();

//grab

const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 30;
//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
// [{imgSrc:'./images/memo_birds/bolshaya_sinitsa.jpg'}]

const getData = () => [
{ imgSrc: "./images/memo_birds/bolshaya_sinitsa.jpg", name: "bolshaya_sinitsa"},
{ imgSrc: "./images/memo_birds/dubonos.jpg", name: "dubonos"},
{ imgSrc: "./images/memo_birds/dubrovnik.jpg", name: "dubrovnik"},
{ imgSrc: "./images/memo_birds/maliy_zuek.jpg", name: "maliy_zuek"},
{ imgSrc: "./images/memo_birds/moskovka.jpg", name: "moskovka"},
{ imgSrc: "./images/memo_birds/obykn_gorikhvostka.jpg", name: "obykn_gorikhvostka"},
{ imgSrc: "./images/memo_birds/olyapka.jpg", name: "olyapka"},
{ imgSrc: "./images/memo_birds/ozernaya_chaika.jpg", name: "ozernaya_chaika"},
{ imgSrc: "./images/memo_birds/sibirskaya_gorikhvostka.jpg", name: "sibirskaya_gorikhvostka"},
{ imgSrc: "./images/memo_birds/sviristel.jpg", name: "sviristel"},
{ imgSrc: "./images/memo_birds/snegir.jpg", name: "snegir"},
{ imgSrc: "./images/memo_birds/zheltobrovaya_ovsyanka.jpg", name: "zheltobrovaya_ovsyanka"},
{ imgSrc: "./images/memo_birds/bolshaya_sinitsa.jpg", name: "bolshaya_sinitsa"},
{ imgSrc: "./images/memo_birds/dubonos.jpg", name: "dubonos"},
{ imgSrc: "./images/memo_birds/dubrovnik.jpg", name: "dubrovnik"},
{ imgSrc: "./images/memo_birds/maliy_zuek.jpg", name: "maliy_zuek"},
{ imgSrc: "./images/memo_birds/moskovka.jpg", name: "moskovka"},
{ imgSrc: "./images/memo_birds/obykn_gorikhvostka.jpg", name: "obykn_gorikhvostka"},
{ imgSrc: "./images/memo_birds/olyapka.jpg", name: "olyapka"},
{ imgSrc: "./images/memo_birds/ozernaya_chaika.jpg", name: "ozernaya_chaika"},
{ imgSrc: "./images/memo_birds/sibirskaya_gorikhvostka.jpg", name: "sibirskaya_gorikhvostka"},
{ imgSrc: "./images/memo_birds/sviristel.jpg", name: "sviristel"},
{ imgSrc: "./images/memo_birds/snegir.jpg", name: "snegir"},
{ imgSrc: "./images/memo_birds/zheltobrovaya_ovsyanka.jpg", name: "zheltobrovaya_ovsyanka"},
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

    card.addEventListener('click', (e) =>{
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
  // console.log(clickedCard);
  //Logic
  if(flippedCards.length===2){
    if(flippedCards[0].getAttribute("name")=== flippedCards[1].getAttribute("name")){
      flippedCards.forEach((card)=>{
        card.classList.remove("flipped");
        card.style.pointerEvents = 'none';
      });
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

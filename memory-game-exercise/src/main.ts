class Memory {
   cards: NodeListOf<HTMLElement>;
   flippedCards: HTMLElement[] = [];
   overlay: HTMLElement;
   exit: HTMLElement;

  constructor() {
    this.cards = document.querySelectorAll(".memory-card");
    this.overlay = document.querySelector(".overlay");
    this.exit = document.querySelector(".close");
    this.addCardListeners();
  }

   addCardListeners(): void {
    this.shuffleCards();
    //Loop through cards
    this.cards.forEach((card) => {
      console.log(card);
      //Make every card in loop clickable
      card.addEventListener("click", () => {
        this.flipCard(card);
      })
    });
  }

  
   flipCard(card: HTMLElement): void {
    //Check if card doesn't have class flip and if flippedcards is less than 2
    if (!card.classList.contains("flip") && this.flippedCards.length < 2) {
        //if true, add flip and push card to flippedcards array.
      card.classList.add("flip");
      this.flippedCards.push(card);
    }
    //if flippedcards array contains 2 "items" check match function
    if (this.flippedCards.length === 2) {
      setTimeout(() => {
        this.checkMatch();
      }, 800);
    }
  }

  //Check "selected cards"
   checkMatch(): void {
    //Check the first two cards in flippedCards array using destructuring.
    const [cardOne, cardTwo] = this.flippedCards;
    console.log("card 1: ", cardOne);
    console.log("card 2: ", cardTwo);
    //Check if dataset "value" is the same on both cards
    if (cardOne.dataset.card === cardTwo.dataset.card) {
        //If true, loop through flippedCards array and add class "match" to the cards to make card stay
      this.flippedCards.forEach((card) => {
        card.classList.add("match");
      });
    } else {
        //If false loop through and remove class "flip" to turn card over again.
      this.flippedCards.forEach((card) => {
        card.classList.remove("flip");
      });
    }
    //Empty flippedCards array.
    this.flippedCards = [];
    //Check win condition by compare length of nodelist with ".match" cards with length of cards nodelist. 
    if (document.querySelectorAll(".match").length === this.cards.length) {
      this.showWin();
    }
  }

  //Shuffle cards
  shuffleCards(): void {
    this.cards.forEach((card) => {
        const memoryCard = card as HTMLElement;
        const position = Math.floor(Math.random() * this.cards.length);
        console.log("pos", position.toString());
        memoryCard.style.order = position.toString()
    })
  }

   showWin(): void {
    this.overlay.classList.add("show");
    this.exitBtn();
  }

    exitBtn(): void {
      this.exit.addEventListener("click", () => {
        this.overlay.classList.remove("show");
        location.reload();
      })  

  }

}


//initiate the object on page load.
document.addEventListener("DOMContentLoaded", () => {
  new Memory();
});

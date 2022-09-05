
export interface FacesArray {
   [index: number] : string;
}

export class Card {

    /**
     * A standard card has a suit and a rank
     * @param suit The suit of the card
     * @param rank The rank of the card
     * 
     * suit names: list of suits
     * rank : dict of rank names and values
     * 
     */

    suit_names: string[] = ["Diamonds", "Clubs", "Hearts", "Spades"];

    //we need an index signature to type the faces since we know the shape of the values
    faces: FacesArray= { 1: "Ace", 11: "Jack", 12: "Queen", 13: "King" };
    suit: number
    rank: number;
    suit_name: string;
    rank_name: string;

    constructor(suit: number, rank: number) {
        this.suit = suit;
        this.rank = rank;

        this.suit_name = this.suit_names[this.suit];

        if (rank in this.faces) {
            this.rank_name = this.faces[rank];
        } else {
            this.rank_name = rank.toString();
        }
    }

    getValue() {
        return this.rank
    }

    toString() {
        return this.rank_name + "_of_" + this.suit_name;
    }

    cardImage() {
        return `${this.toString()}.png`
    }

}

export class Deck {

    cards: Card[] = [];
    totalCards: number | undefined;
    

    constructor() {
        for (let suit = 0; suit < 4; suit++) {
            for (let rank = 1; rank < 14; rank++) {
                const card: Card = new Card(suit, rank);
                this.cards.push(card)
            }
        }

    }

    length() {
        this.totalCards = this.cards.length;
        return this.totalCards
    }

    //fisher yates shuffle

    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    //default removes and gives the last card
    dealCard(i = -1): Card{

        const cardDealt:Card = this.cards.splice(i, 1)[0];
        return cardDealt
    }

    replaceCard(cardPassed: Card) {
        let empty_cards: string[] = []
        for(let card of this.cards) {
            empty_cards.push(card.toString())
        }

        if (empty_cards.indexOf(cardPassed.toString()) !== -1) {
            this.cards.push(cardPassed)

        }
    }

    reset_cards() {

        this.cards = []
        for(let suit=0; suit < 4 ; suit++) {
            for(let rank=1; rank < 14; rank++){
                const card = new Card(suit,rank);
                this.cards.push(card)

            }
        }
    }

    
    deal_hand(hand_size: number): Card[] {
        let handCards: Card[] = []
        for(let i=0; i< hand_size; i++) {
            handCards.push(this.dealCard());
        }

        return handCards
    }

    toString() {
        return {
            "total_cards " : `${this.totalCards}` 
        }
        
    }
}


export class Hand {

    cards: Card[];
    constructor() {
        this.cards = [];
    }

    addCard(cardPassed: Card) {
        let empty_cards: string[] = []
        for(let card of this.cards) {
            empty_cards.push(card.toString())
        }

        if (empty_cards.indexOf(cardPassed.toString()) !== -1) {
            this.cards.push(cardPassed)

        } else {
            throw new Error("Card already in the hand");
            
        }
    }

    removeCard(cardPassed: Card) {
        let empty_cards: string[] = []
        for(let card of this.cards) {
            empty_cards.push(card.toString())
        }

        if (empty_cards.indexOf(cardPassed.toString()) !== -1) {
            this.cards = this.cards.filter((element) => {
                if(element.toString() === cardPassed.toString()) {
                    return false;
                }
                return true;
            })

        } else {
            throw new Error("Card not in the hand");
        }

    }

    draw(deck: Deck) {
        const card = deck.dealCard()
        this.addCard(card)
    }


    getValue() {

        let value: number = 0;
        

        for (let card of this.cards) {

            value += card.getValue()

        }

        return value

    }

}


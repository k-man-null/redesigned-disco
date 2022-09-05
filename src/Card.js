"use strict";
exports.__esModule = true;
exports.Deck = exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        /**
         * A standard card has a suit and a rank
         * @param suit The suit of the card
         * @param rank The rank of the card
         *
         * suit names: list of suits
         * rank : dict of rank names and values
         *
         */
        this.suit_names = ["Diamonds", "Clubs", "Hearts", "Spades"];
        //we need an index signature to type the faces since we know the shape of the values
        this.faces = { 1: "Ace", 11: "Jack", 12: "Queen", 13: "King" };
        this.suit = suit;
        this.rank = rank;
        this.suit_name = this.suit_names[this.suit];
        if (rank in this.faces) {
            this.rank_name = this.faces[rank];
        }
        else {
            this.rank_name = rank.toString();
        }
    }
    Card.prototype.toString = function () {
        return this.rank_name + "_of_" + this.suit_name;
    };
    Card.prototype.cardImage = function () {
        return "".concat(this.toString(), ".png");
    };
    return Card;
}());
exports.Card = Card;
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        this.handCards = [];
        for (var suit = 0; suit < 4; suit++) {
            for (var rank = 1; rank < 14; rank++) {
                var card = new Card(suit, rank);
                this.cards.push(card);
            }
        }
    }
    Deck.prototype.length = function () {
        this.totalCards = this.cards.length;
        return this.totalCards;
    };
    //fisher yates shuffle
    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    //default removes and gives the last card
    Deck.prototype.dealCard = function (i) {
        if (i === void 0) { i = -1; }
        return this.cards.splice(i, 1);
    };
    Deck.prototype.replaceCard = function (cardPassed) {
        var empty_cards = [];
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            empty_cards.push(card.toString());
        }
        if (empty_cards.indexOf(cardPassed.toString()) !== -1) {
            this.cards.push(cardPassed);
        }
    };
    Deck.prototype.reset_cards = function () {
        this.cards = [];
        for (var suit = 0; suit < 4; suit++) {
            for (var rank = 1; rank < 14; rank++) {
                var card = new Card(suit, rank);
                this.cards.push(card);
            }
        }
    };
    Deck.prototype.deal_hand = function (hand_size) {
        var _a;
        for (var i = 0; i < hand_size; i++) {
            (_a = this.handCards).push.apply(_a, this.dealCard());
        }
        return this.handCards;
    };
    Deck.prototype.toString = function () {
        return {
            "total_cards ": "".concat(this.totalCards)
        };
    };
    return Deck;
}());
exports.Deck = Deck;

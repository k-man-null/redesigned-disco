import * as utils from './Card';

class Player {
    name: string;
    id: string;
    gamesPlayed: number;
    turn: boolean = false;
    hand: utils.Hand;
    
    constructor(name: string, id: string, score: number, gamesPlayed: number, hand: utils.Hand){
        this.name = name
        this.id = id
        this.gamesPlayed = gamesPlayed
        this.hand = hand
    }
}
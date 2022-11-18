import { P5Sketch } from "vue-p5-component"
import { Luck } from "./luck"
import { Player } from "./player"
import { Tile } from "./tile"

export interface Board {

    id: number
    hasStarted: boolean

    players: [Player]
    lucks: [Luck]
    tiles: [Tile]

    ycircus: number
}

export class Board implements Board {
    id: number
    hasStarted: boolean

    players: [Player]
    lucks: [Luck]
    tiles: [Tile]

    ycircus: number

    constructor(payload: Partial<Board>) {
        this.id = payload.id || 0
        this.hasStarted = payload.hasStarted || false
        this.players = new Array<Player>() as [Player]
        for (const p of payload.players || Array<Player>() as [Player]) {
            this.players.push(new Player(p))
        }
        this.tiles = payload.tiles || new Array<Tile>() as [Tile]
        this.lucks = payload.lucks || new Array<Luck>() as [Luck]
        this.ycircus = payload.ycircus || 0
    }

    draw(sketch: P5Sketch) {
        console.log(this.id, sketch)

        this.players.forEach(p => {
            p.draw(sketch)
        })
    } 
}
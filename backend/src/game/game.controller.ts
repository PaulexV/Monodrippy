import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { gameService } from './game.service';
import { boardService } from '../board/board.service'
import { gameOutput } from 'src/models/gameOutput';
import { IDicePlay } from 'src/models/IUserAction';
import { playerService } from 'src/player/player.service';

@Controller('game')
export class gameController {
  constructor(
    private readonly gameService: gameService,
    private readonly boardService: boardService,
    private readonly playerService: playerService) {}

  @Get(':id')
  async getGame(@Param('id') id: Number) {
    return this.gameService.gameOutput(id)
  }


  @Post('play')
  async play(@Body() payload:IDicePlay) {
    try {
      let output = await this.gameService.play(payload)
      return output
    }
    catch(e: unknown) {
      return {"error": typeof e === "string" ? e.toUpperCase() : e instanceof Error ? e.message : "Error"}
    }
  }

  @Patch('start/:id')
  async startGame(@Param('id') id: Number) {
    return this.gameService.startGame(id);
  }

  @Delete('reset/:id')
  async resetGame(@Param('id') id: Number) {
    let players_id = await this.gameService.resetGame(id);
    console.log(players_id)
    for(let id in players_id){
      this.playerService.deleteById(players_id[id])
    }
  }
}
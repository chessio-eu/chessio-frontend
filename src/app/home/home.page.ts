import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchingGame = false;
  time: number = 0;

  constructor(private gameSrv: GameService, private router: Router) { }

  findGame() {
    this.startTimer();
    this.searchingGame = true;
    this.gameSrv.find().subscribe(res => {
      const game = res;
      if (game.status !== 'in-progress') {
        this.gameSrv.channel.bind(`game.started.${game.id}`, (data: any) => {
          this.router.navigate(['games', game.id])
        });
      } else {
        this.router.navigate(['games', game.id])
      }
    });
  }

  startTimer() {
    setInterval(() => {
      this.time++;
    }, 1000)
  }
}

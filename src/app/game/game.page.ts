import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPiece} from '../piece/piece';
import {PieceComponent} from '../piece/piece.component';
import {PieceService} from '../piece/piece.service';
import {SquareComponent} from '../square/square.component';
import {IGame} from './game';
import {GameService} from './game.service';

type Position = {
  x: string;
  y: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChildren(SquareComponent) squares!: QueryList<SquareComponent>;
  @ViewChild('board', {read: ViewContainerRef}) board!: ViewContainerRef;
  game!: IGame;
  selectedPieceComponent?: PieceComponent
  Arr = Array;

  constructor(private gameSrv: GameService, private pieceSrv: PieceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.gameSrv.fetchOne(this.route.snapshot.params['id']).subscribe(res => {
      this.game = res;
      for (const piece of res.pieces) {
        // const square = this.squares.get(piece.positionY * 8 + piece.positionX);
        const pieceComponent = this.board.createComponent(PieceComponent);
        pieceComponent.setInput('piece', piece);
        pieceComponent.instance.selected.subscribe(pieceComponent => {
          const square = this.squares.get(pieceComponent.piece.positionY * 8 + pieceComponent.piece.positionX)
          square?.possibleMove ? this.selectSquare(square) : this.selectPieceComponent(pieceComponent)
        });

        this.gameSrv.channel.bind(`game.${this.game.id}.piece.${piece.id}.moved`, (piece: IPiece) => {
          pieceComponent.instance.piece.positionX = piece.positionX
          pieceComponent.instance.piece.positionY = piece.positionY
        });
      }
    });
  }

  clearPossibleMoves() {
    for (const square of this.squares) {
      square.setPossibleMove(false);
    }
    this.selectedPieceComponent = undefined;
  }

  selectSquare(square: SquareComponent) {
    const pieceComponent = this.selectedPieceComponent
    if (pieceComponent && square.possibleMove) {
      this.pieceSrv.move(pieceComponent.piece, square.positionX, square.positionY).subscribe(res => {
        pieceComponent.piece.positionX = res.positionX;
        pieceComponent.piece.positionY = res.positionY;
        this.clearPossibleMoves();
      });
    } else {
      this.clearPossibleMoves();
    }
  }

  selectPieceComponent(pieceComponent: PieceComponent) {
    this.clearPossibleMoves();
    this.selectedPieceComponent = pieceComponent;
    this.pieceSrv.fetchMoves(pieceComponent.piece).subscribe(res => {
      const moves = res;
      for (const move of moves) {
        this.squares.get(move.positionY * 8 + move.positionX)?.setPossibleMove(true);
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMove } from '../move/move';
import { IPiece } from './piece';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  apiUrl = `${environment.apiUrl}/pieces`;

  constructor(private http: HttpClient) {
  }

  fetchMoves(piece: IPiece): Observable<IMove[]> {
    return this.http.get<Array<number[]>>(this.apiUrl + '/' + piece.id).pipe(map(moves => {
      return moves.map((move: number[]) => { return { "positionX": move[0], "positionY": move[1] } });
    }));
  }

  move(piece: IPiece, positionX: number, positionY: number) {
    return this.http.post<IMove>(this.apiUrl + '/' + piece.id, {positionX: positionX, positionY: positionY});
  }
}

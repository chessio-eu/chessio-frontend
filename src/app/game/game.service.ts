import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PusherService } from '../services/pusher.service';
import { IGame } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiUrl = `${environment.apiUrl}/games`;
  channel: any;

  constructor(private http: HttpClient, private pusherSrv: PusherService) {
    this.channel = this.pusherSrv.pusher.subscribe('games');
  }

  fetchOne(id: string) {
    return this.http.get<IGame>(this.apiUrl + '/' + id);
  }

  find() {
    return this.http.get<IGame>(this.apiUrl + '/find');
  }
}

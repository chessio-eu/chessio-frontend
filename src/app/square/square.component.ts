import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IPiece } from '../piece/piece';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  @ViewChild(FaIconComponent, { static: false }) iconComponent!: FaIconComponent;
  @Input() positionX!: number;
  @Input() positionY!: number;
  possibleMove = false;

  constructor() { }

  ngOnInit() {

  }
  
  setPossibleMove(value: boolean) {
    this.possibleMove = value;
  }
}

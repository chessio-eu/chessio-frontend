import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IPiece } from './piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
})
export class PieceComponent implements OnInit {
  @Input() piece!: IPiece;
  @Output() selected = new EventEmitter<PieceComponent>();

  constructor() { }

  ngOnInit() {}

  getIcon(): IconProp {
    return 'chess-'+this.piece.type as IconProp;
  }

  @HostListener('click')
  select() {
    this.selected.emit(this);
  }

  @HostBinding('style.--left')
  get left() {
    return this.piece.positionX;
  }

  @HostBinding('style.--top')
  get top() {
    return this.piece.positionY;
  }
}

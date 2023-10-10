import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from 'src/app/square/square.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PieceComponent } from 'src/app/piece/piece.component';



@NgModule({
  declarations: [SquareComponent, PieceComponent],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [
    SquareComponent,
    PieceComponent
  ]
})
export class SharedModule { }

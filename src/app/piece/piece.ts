export interface IPiece {
    id: string;
    positionX: number;
    positionY: number;
    color: 'black'|'white';
    type: 'pawn'|'king'|'queen';
}
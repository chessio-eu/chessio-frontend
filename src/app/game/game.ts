import { IPiece } from "../piece/piece";

export interface IGame {
    id: string;
    status: string;
    pieces: IPiece[];
}
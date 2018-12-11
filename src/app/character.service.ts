import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Character } from './creator/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterSource = new BehaviorSubject<Character>(new Character);
  currentCharacter = this.characterSource.asObservable();

  constructor() { }

  changeCharacter(character: Character){
    this.characterSource.next(character);
  }
}

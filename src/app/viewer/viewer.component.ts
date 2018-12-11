import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../creator/character';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  character: Character;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.currentCharacter.subscribe(character => this.character = character);
  }

}

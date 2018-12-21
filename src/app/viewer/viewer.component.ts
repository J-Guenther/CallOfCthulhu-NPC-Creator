import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../creator/character';
import  html2canvas  from 'html2canvas';

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

  MakeImage(){
    html2canvas(document.querySelector("#output"), { letterRendering: 1, allowTaint : true}).then(canvas => {
        var link = document.createElement('a');
          link.download = 'my-image-name.png';
          link.href = canvas.toDataURL();
          link.click();
    });
  }

}

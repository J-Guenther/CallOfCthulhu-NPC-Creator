import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import {Observable, of, from } from 'rxjs';



@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  character: Character;
  jsonString: string;

  constructor(private characterService: CharacterService) { 
    
  }

  ngOnInit() {
    this.characterService.currentCharacter.subscribe(character => this.character = character);
  }


  // TODO make Tag Input Object based, not string based
  public transform(value: string): Observable<string> {
    let finalTag = ""
    if (!(value.indexOf('%') > -1)){
      finalTag = value.replace(/[^\w -]/g, '').trim().replace(/\W+/g, " ")
    
    
      let percentage = finalTag.match(/\d+/g);
      if(finalTag.length > 0 && Math.floor(Number(percentage))){
        finalTag += "% (" + Number(percentage)/2 + "/" + Number(percentage)/5 + ")";	
      }	
    } else{
      finalTag = value;
    }
    return of(finalTag);
}

  CalculateDamageBonusAndBuild(){
    const value: number =  this.character.strength + this.character.size;

    if(value >= 2 && value <= 64){
      this.character.damageBonus = "-2";
      this.character.build = -2;
    } else if (value >= 65 && value <= 84){
      this.character.damageBonus = "-1";
      this.character.build = -1;
    } else if (value >= 85 && value <= 124){
      this.character.damageBonus = "None";
      this.character.build = 0;
    } else if (value >= 125 && value <= 164){
      this.character.damageBonus = "+1D4";
      this.character.build = 1;
    } else if (value >= 165 && value <= 204){
      this.character.damageBonus = "+1D6";
      this.character.build = 2;
    } else if (value >= 205 && value <= 284){
      this.character.damageBonus = "+2D6";
      this.character.build = 3;
    } else if (value >= 285 && value <= 364){
      this.character.damageBonus = "+3D6";
      this.character.build = 4;
    } else if (value >= 365 && value <= 444){
      this.character.damageBonus = "+4D6";
      this.character.build = 5;
    } else if (value >= 445){
      this.character.damageBonus = "+5D6";
      this.character.build = 6;
    } else {
      this.character.damageBonus = "Undefined";
      this.character.build = -1;
    }
  }

  CalculateMove() {
    const dex: number = this.character.dexterity;
    const siz: number = this.character.size;
    const str: number = this.character.strength;

    if((dex < siz) && (str < siz)){
      this.character.move = 7;
    } else if((dex > siz) && (str > siz)){
      this.character.move = 9;
    } else if(((dex >= siz) || (str >= siz)) || (dex == siz && dex == str)){
      this.character.move = 8;
    } else{
      this.character.move = 0;
    }
  }

  CalculateDodge(){
    this.character.dodge = Math.floor(this.character.dexterity/2);
  }

  CalculateHp(){
    this.character.health = Math.floor((this.character.constitution + this.character.size) / 10);
  }

  CalculateSanity(){
    this.character.sanity = this.character.power;
  }

  CalculateMP(){
    this.character.magicPoints = Math.floor(this.character.power / 5);
  }

  StrChange(){
    this.CalculateDamageBonusAndBuild();
    this.CalculateMove();
  }

  DexChange(){
    this.CalculateMove();
    this.CalculateDodge();
  }

  ConChange(){
    this.CalculateHp();
  }

  SizChange(){
    this.CalculateDamageBonusAndBuild();
    this.CalculateHp();
    this.CalculateMove();
  }

  PowChange(){
    this.CalculateSanity();
    this.CalculateMP();
  }

  RandomD3(): number{
    let sum: number = 0;
    sum += Math.floor(Math.random() * 6) + 1;
    sum += Math.floor(Math.random() * 6) + 1;
    sum += Math.floor(Math.random() * 6) + 1;
    return sum;
  }

  RandomD2(){
    let sum: number = 0;
    sum += Math.floor(Math.random() * 6) + 1;
    sum += Math.floor(Math.random() * 6) + 1;
    return sum;
  }

  RandomValue(id){
    switch (id) {
      case 'STR':
        this.character.strength = this.RandomD3() * 5;
        this.StrChange();
        break;
      case 'EDU':
        this.character.education = (this.RandomD2() + 6) * 5;
      break;
      case 'CON':
        this.character.constitution = this.RandomD3() * 5;
        this.ConChange();
      break;
      case 'SIZ':
        this.character.size = (this.RandomD2() + 6) * 5;
        this.SizChange();
      break;
      case 'DEX':
        this.character.dexterity = this.RandomD3() * 5;
        this.DexChange();
      break;
      case 'INT':
        this.character.intelligence = (this.RandomD2() + 6) * 5;
      break;
      case 'APP':
        this.character.appearance = this.RandomD3() * 5;
      break;
      case 'POW':
        this.character.power = this.RandomD3() * 5;
        this.PowChange();
      break;
      default:
        break;
    }
  }

  MakeJson(){  
    this.jsonString = JSON.stringify(this.character);
  }

  LoadJson(){
    const character: Character = JSON.parse(this.jsonString);
    for (let key in this.character) {
      this.character[key] = character[key];
    }    
    
  }


}

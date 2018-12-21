export class Character {
    name: string;
    description: string;

    strength: number;
    constitution: number;
    size: number;
    dexterity: number;
    intelligence: number;
    appearance: number;
    power: number;
    education: number;

    sanity: number;
    health: number;
    damageBonus: string;
    build: number;
    move: number;

    fightingSkills: string[];
    dodge: number;
    armor: number;

    skills: string[];
    
    info: string;
    imageUrl: string;

    constructor(){
      this.name = '';
      this.description = '';

      this.strength = 0;
      this.constitution = 0;
      this.size = 0;
      this.dexterity = 0;
      this.intelligence = 0;
      this.appearance = 0;
      this.power = 0;
      this.education = 0;

      this.sanity = 0;
      this.health = 0;
      this.damageBonus = '';
      this.build = 0;
      this.move = 0;

      this.fightingSkills = ['Fighting 60% (30/12)'];
      this.dodge = 0;
      this.armor = 0;

      this.skills = ['Spot Hidden 30% (15/7)'];
      
      this.info = '';
      this.imageUrl = '';
    }
  }
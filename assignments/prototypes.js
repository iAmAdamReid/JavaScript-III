/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(obj){
  // constructor assigns whatever is passed in for createdAt
  this.createdAt = obj.createdAt;
  // constructor assigns whatever is passed in for dimensions
  this.dimensions = obj.dimensions;
}

// creates a prototype method called destroy assigned to GameObject
GameObject.prototype.destroy = function(){
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/


function CharacterStats(stats){
  // calls the methods and properties from GameObject
  GameObject.call(this, stats);
  // assigns hp based on what is passed in
  this.hp = stats.hp;
  // assigns name based on what is passed in
  this.name = stats.name;
}

// assigns inheritance of the prototype methods from GameObject to CharacterStats
CharacterStats.prototype = Object.create(GameObject.prototype);

// creates a prototype method called takeDamage and assigns it to the CharacterStats.prototype
CharacterStats.prototype.takeDamage = function(){
  return `${this.name} took damage.`;
}
/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(char){
  // calls the methods and prototypes from CharacterStats
  CharacterStats.call(this, char);
  // assigns faction based on what is passed in
  this.faction = char.faction;
  // assigns weapons based on what is passed in
  this.weapons = char.weapons;
  // assigns language based on what is passed in
  this.language = char.language;
}

// assigns inheritance of prototype methods and properties from CharacterStats to Humanoid
Humanoid.prototype = Object.create(CharacterStats.prototype);

// declares a prototype method of greet for the Humanoid prototype
Humanoid.prototype.greet = function(){
  return `${this.name} offers a greeting in ${this.language}.`;
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test your work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function. 
  
  // HEROES 
  
  function Hero(heroStats){
    Humanoid.call(this, heroStats);
    this.special = heroStats.special;
    this.strength = heroStats.strength;
  }

  Hero.prototype = Object.create(Humanoid.prototype);

  Hero.prototype.attack = function(target){
    let damage = (Math.floor(Math.random() * this.strength) + 1);
    target.hp = target.hp - damage;
    if(target.hp <= 0){
      return target.destroy();
    } else {
      return target.hp;
    }
  }

  Hero.prototype.heal = function(){
    let healing = (Math.floor(Math.random() * 20) + 5);
    this.hp = this.hp + healing;
    if(this.hp >= 100){
      this.hp = 100;
      return this.hp;
    } else {
    return this.hp;
    }
  }

  const Hercules = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 100,
    name: 'Hercules',
    faction: 'Greece',
    weapons: [
      'Sword',
      'Bow',
    ],
    language: 'Greek',
    special: 'Righteous Fury',
    strength: 30
  });


  // VILLIANS

  function Villian(VillianStats){
    Humanoid.call(this, VillianStats);
    this.special = VillianStats.special;
  }

  Villian.prototype = Object.create(Humanoid.prototype);

  Villian.prototype.attack = function(target){
    let damage = (Math.floor(Math.random() * this.strength) + 1 /*make this a stat from weapon?*/);
    target.hp = target.hp - damage;
    if(target.hp <= 0){
      return target.destroy();
    } else {
      return target.hp;
    }
  }

  Villian.prototype.heal = function(){
    let healing = (Math.floor(Math.random() * 20) + 5);
    this.hp = this.hp + healing;
    if(this.hp >= 100){
      this.hp = 100;
      return this.hp;
    } else {
    return this.hp;
    }
  }
  
  const Hades = new Villian({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 100,
    name: 'Hades',
    faction: 'Hell',
    weapons: [
      'Fire',
      'Scythe',
    ],
    language: 'Aramaic',
    special: 'Shadow Flame',
    strength: 30
  });


  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  let target = Hades;
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hades.heal());
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hercules.attack(target));
  console.log(Hades.hp);
  
  
  // * Create two new objects, one a villian and one a hero and fight it out with methods!

  /* TO-DO 
  -Give different weapons/attacks different modifiers
  -Check for HP at 0 to determine death
  -Create healing spell prototype method for each hero
  -Create a GUI for the combat system using HTML
*/
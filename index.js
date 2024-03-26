//**This code is made to allow users to manage bands and their members in the console */
//**Allows to create bands, view band details, add, remove band members, and display all bands */

//** This class will structure bandmembers and this takes two parameters*/
class Bandmember {
    constructor(name, instrument){
        this.name = name;
        this.instrument = instrument;
    }
//** Once inputted by user this will return a string describing band member name and their instrument thye play */
    describe() {
        return `${this.name} plays ${this.instrument}.`;
    }
}
//** This class will store band members names in an array that make up a band */
class Band {
    constructor(name) {
        this.name = name;
        this.members= [];
    }
    //** Takes a bandmember parameter and adds it to the members array */
    addBandmember(bandmember) {
        if (bandmember instanceof Bandmember) {
            this.members.push(bandmember);
        } else {
            throw new Error ('You can only add an instance of Bandmember. Argument is not a bandmember: ${bandmember}');
        }
    }
    //** Returns a string with band name and amount of band members */
    describe() {
        return `${this.name} has ${this.members.length} band members.`; 
    }
}

//** Menu for interacting with bands, start bands array to store bands and currently selected band */
class Menu {
    constructor() {
        this.bands=[];
        this.selectedBand=null;
    }

    //** Starts menu interface with different cases available*/
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.createBand();
                    break;
                case '2' :
                     this.viewBand();
                    break;
                case '3':
                     this.deleteBand();
                    break;
                case '4' :
                    this.displayBands();
                    break;
                default: 
                     selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye');
    }

//** Displays the options to user and returns selections */
showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create new band
    2) view band
    3) delete band
    4) display all teams`);
}

//** Displays the options specific to each bands */
showBandMenuOptions(bandInfo) {
    return prompt(`
    0)back
    1)create band member
    2)delete band member
    -----------------------
    ${(bandInfo)}
 `);
}
//** Will display the bands in the band array*/
 displayBands() {
    let bandString= '';
    for (let i = 0; i < this.bands.length; i++ ) {
        bandString += i + ')' + this.bands[i].name + '\n';
    }
   alert(bandString);
 }
//** Create a new bands and add it to bands array */
createBand() {
    let name = prompt('Enter name for new band');
    this.bands.push(new Band(name));
}
//** Can view details of specific band, name and allows to create or delete band member */
viewBand() {
    let index = prompt('Enter the index of what team you wish to view:');
    if (index > -1 && index < this.bands.length) {
        this.selectedBand = this.bands[index];
        let description = 'Band Name:' + this.selectedBand.name + '\n' ;

        for (let i=0; i< this.selectedBand.members.length; i++) {
        description += i + ')'+ this.selectedBand.members[i].name + '-' 
        + this.selectedBand.members[i].instrument + '\n';
        }

        let selection = this.showBandMenuOptions(description);
        switch(selection) {
            case '1':
                this.createBandmember();
                    break;
                case'2':
                this.deleteBandmember();
                    break;
                    default:
                    break;
        }
    }
}

//** Prompts to enter the name of new band member and instrument they play */
createBandmember() {
    let name = prompt ('Enter name for new band member');
    let instrument = prompt ('Enter intrument for new band member')
    this.selectedBand.members.push(new Bandmember(name, instrument));
}   

//** Prompts to enter the index of band member to delete and will remove it from members array */
deleteBandmember () {
    let index = prompt ('Enter the index of the member you wish to delete');
    if (index > -1 && index < this.selectedBand.members.length) {
        this.selectedBand.members.splice(index, 1);
    }
}
}

//** Instance of Menu class created and the start method is called to start the menu interface */
let menu = new Menu();
menu.start();





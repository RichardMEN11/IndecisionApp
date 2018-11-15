class Person {
    constructor(name = "Anonymous", age = 0){
        this.name = name;
        this.age = age;
    }

    getGreeting(){
        return 'hi';
    }

    getDescription(){
        return this.name + " is " + this.age + " year(s) old!";
    }
}

class Student extends Person {
    constructor(name, age, major){
        super(name, age);
        this.major = major;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasHomeLocation(){
        return  !!this.homeLocation;
    }
    getGreeting(){
        let descr = super.getGreeting();

        if(this.hasHomeLocation()){
            descr += " Hometown: " + this.homeLocation;
        }
        return descr;
    }
}

const me = new Traveler("ALex", 19);
console.log(me.getGreeting());

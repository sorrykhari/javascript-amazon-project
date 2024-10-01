class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carInfo) {
    console.log(carInfo.brand);
    this.#brand = carInfo.brand;
    this.#model = carInfo.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model},
       Speed: ${this.speed} km/h,
       Trunk: ${this.isTrunkOpen ? 'Open': 'Closed'}`);
  }

  go() {
    if ((this.speed <= 195) && !this.isTrunkOpen) {
      this.speed += 5;
    }
    else if (this.isTrunkOpen) {
      console.log('Trunk is open.')
    }
  }

  brake() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
    else {
      console.log('Car is moving.');
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

class Racecar extends Car {
  acceleration;
  constructor(raceCarInfo) {
    super(raceCarInfo);
    this.acceleration = raceCarInfo.acceleration;
  }

  go() {
    if (this.isTrunkOpen) {
      console.log('Trunk is open.');
      return;
    }
    this.accelerate();
  }

  accelerate() {
    if(this.speed < 300) {
      this.speed += this.acceleration;
      if(this.speed > 300) {
        this.speed = 300;
      }
    }
  }
}

const car3 = new Racecar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});
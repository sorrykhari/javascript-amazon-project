class Car{
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carInfo) {
    this.brand = carInfo.brand;
    this.model = carInfo.model;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model},
       Speed: ${this.speed} km/h,
       Trunk: ${this.isTrunkOpen ? 'Open': 'Closed'}`);
  }

  go() {
    if (this.speed <= 195) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed != 0) {
      this.isTrunkOpen = true;
    }
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

car1.displayInfo()
car2.displayInfo();

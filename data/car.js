// Aditional exercises

class Car {
  #brand; // private - we sould not be able to change brand
  #model; // private - we sould not be able to change model
  speed;
  isTrunkOpen;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed || 0;
    this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  displayinfo() {
    console.log(
      `${this.#brand} ${this.#model} ${this.speed} km/h isTrunkOpen: ${
        this.isTrunkOpen
      }`
    );
  }

  go() {
    if (this.isTrunkOpen === false) {
      // go() should not work is trunk is open
      this.speed += 5;
      if (this.speed > 200) this.speed = 200; // limit speed to 200
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) this.speed = 0; // limit speed to 0
  }

  openTrunk() {
    this.isTrunkOpen = true;
    if (this.speed > 0) this.isTrunkOpen = false;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    console.log("this.speed :>> ", this.speed);
    console.log("this.acceleration :>> ", this.acceleration);
    this.speed += this.acceleration;
    if (this.speed > 300) this.speed = 300; // limit speed to 300
  }

  openTrunk() {
    this.isTrunkOpen = "Race cars don't have trunks";
  }

  closeTrunk() {
    this.isTrunkOpen = "Race cars don't have trunks";
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
  speed: 0,
  isTrunkOpen: false,
});
const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
  speed: 0,
  isTrunkOpen: false,
});
const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

console.log("car1 :>> ", car1);
console.log("car2 :>> ", car2);
console.log("raceCar :>> ", raceCar);

car1.go();
car2.brake();
car1.openTrunk();

raceCar.go();
raceCar.openTrunk();
raceCar.closeTrunk();

car1.displayinfo();
car2.displayinfo();
raceCar.displayinfo();

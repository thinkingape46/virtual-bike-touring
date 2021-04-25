class SpeedSensor {
  constructor() {
    this.requestSpeedDevice = document.getElementById("request-speed");
    this.getDeviceDevice = document.getElementById("get-speed");
    this.totalDistance = document.getElementById("distance");
    this.currentSpeed = document.getElementById("current-speed");
    this.events();
  }

  events() {
    this.requestSpeedDevice.addEventListener("click", () =>
      this.requestDevice()
    );
  }

  variables() {
    this.previousReadTime = Date.now();
    this.previousDistance = 0;
    this.speed = 0;
    this.distanceArray = [];
    this.timeStampArray = [];
  }

  renderReading(rotations, timeStamp) {
    const circumference = 0.002104; //should be in km
    const distancekm = rotations * circumference;
    this.distanceArray.unshift(distancekm);
    this.timeStampArray.unshift(timeStamp);

    if (this.timeStampArray.length >= 5) {
      this.speed =
        (this.distanceArray[0] - this.distanceArray[4]) /
        ((this.timeStampArray[0] - this.timeStampArray[4]) / 3600000);

      this.previousDistance = distancekm;
      this.previousReadTime = timeStamp;
      this.distanceArray.length = 5;
      this.timeStampArray.length = 5;
      console.log(this.speed);
    }

    console.log(this.timeStampArray);

    this.totalDistance.textContent = `${distancekm.toFixed(3)} km`;
    this.currentSpeed.textContent = `${this.speed.toFixed(2)} km/hr`;
  }

  requestDevice() {
    const options = { filters: [{ services: ["cycling_speed_and_cadence"] }] };
    try {
      navigator.bluetooth.requestDevice(options).then((device) => {
        device.gatt.connect().then((server) => {
          server
            .getPrimaryService("cycling_speed_and_cadence")
            .then((primaryService) => {
              primaryService
                .getCharacteristic("00002a5b-0000-1000-8000-00805f9b34fb")
                .then((characteristic) => {
                  characteristic.startNotifications().then((reading) => {
                    console.log(reading);
                    const initial = reading.value.getUint16();
                    let readingsConcat = 0;
                    let previousReading = reading.value.getUint16();

                    this.variables();

                    setInterval(() => {
                      const timeStamp = Date.now();
                      const rotations = reading.value.getUint16();
                      if (rotations < previousReading) {
                        previousReading = rotations;
                        readingsConcat += rotations - previousReading;
                        this.renderReading(readingsConcat);
                      } else {
                        readingsConcat += rotations - previousReading;
                        previousReading = rotations;
                        this.renderReading(readingsConcat, timeStamp);
                      }
                    }, 1000);
                  });
                });
            });
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

// (4) [BluetoothRemoteGATTCharacteristic, BluetoothRemoteGATTCharacteristic, BluetoothRemoteGATTCharacteristic, BluetoothRemoteGATTCharacteristic]
// 0: BluetoothRemoteGATTCharacteristic {service: BluetoothRemoteGATTService, uuid: "00002a55-0000-1000-8000-00805f9b34fb", properties: BluetoothCharacteristicProperties, value: null, oncharacteristicvaluechanged: null}
// 1: BluetoothRemoteGATTCharacteristic {service: BluetoothRemoteGATTService, uuid: "00002a5b-0000-1000-8000-00805f9b34fb", properties: BluetoothCharacteristicProperties, value: null, oncharacteristicvaluechanged: null}
// 2: BluetoothRemoteGATTCharacteristic {service: BluetoothRemoteGATTService, uuid: "00002a5c-0000-1000-8000-00805f9b34fb", properties: BluetoothCharacteristicProperties, value: null, oncharacteristicvaluechanged: null}
// 3: BluetoothRemoteGATTCharacteristic {service: BluetoothRemoteGATTService, uuid: "00002a5d-0000-1000-8000-00805f9b34fb", properties: BluetoothCharacteristicProperties, value: null, oncharacteristicvaluechanged: null}
// length: 4
// __proto__: Array(0)

export default SpeedSensor;

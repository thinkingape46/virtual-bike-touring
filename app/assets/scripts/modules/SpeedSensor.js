class SpeedSensor {
  constructor() {
    this.requestSpeedDevice = document.getElementById("request-speed");
    this.getDeviceDevice = document.getElementById("get-speed");
    this.speedSensorReading = document.getElementById("speed-sensor");
    this.events();
  }

  events() {
    this.requestSpeedDevice.addEventListener("click", () =>
      this.requestDevice()
    );
  }

  renderReading(rotations) {
    const circumference = 2104; //should be in mm
    const distancekm = ((rotations * circumference) / 1000000).toFixed(3);
    this.speedSensorReading.textContent = `${distancekm} km`;
    console.log(rotations, distancekm);
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
                    setInterval(() => {
                      const rotations = reading.value.getUint16();
                      if (rotations < previousReading) {
                        previousReading = rotations;
                        readingsConcat += rotations - previousReading;
                        this.renderReading(readingsConcat);
                      } else {
                        readingsConcat += rotations - previousReading;
                        previousReading = rotations;
                        this.renderReading(readingsConcat);
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

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

  renderReading(reading) {
    this.speedSensorReading.textContent = reading;
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
                    const initial = reading.value.getInt16();
                    setInterval(() => {
                      this.speedSensorReading.textContent = `${
                        reading.value.getInt16() - initial
                      } rotations`;
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

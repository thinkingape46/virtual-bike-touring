import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

function App() {
  return (
    <>
      <button onClick={onRequestBluetoothDeviceButtonClick}>Request</button>
      <button onClick={onGetBluetoothDevicesButtonClick}>Get</button>
    </>
  );
}

async function onGetBluetoothDevicesButtonClick() {
  try {
    console.log("Getting existing permitted Bluetooth devices...");
    const devices = await navigator.bluetooth.getDevices();

    console.log("> Got " + devices.length + " Bluetooth devices.");
    for (const device of devices) {
      console.log("  > " + device.name + " (" + device.id + ")");
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}

const UUID_SHORT = (x) => `0000${x}-0000-1000-8000-00805f9b34fb`;

async function onRequestBluetoothDeviceButtonClick() {
  console.log("Requesting Bluetooth Device...");

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ["heart_rate"] }],
    });
    const server = await device.gatt.device.gatt.connect();
    const primaryService = await server.getPrimaryService("heart_rate");
    const characteristic = await primaryService.getCharacteristic(
      "heart_rate_measurement"
    );
    console.log(characteristic);
    const startNot = await characteristic.startNotifications();
    setInterval(() => {
      const reading = startNot.value;
      console.log(reading.getInt16());
    }, 1000);
  } catch (e) {
    console.log(e);
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}

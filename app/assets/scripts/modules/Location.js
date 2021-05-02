import AddToMap from "./AddToMap";
const addToMap = new AddToMap();

class Location {
  constructor() {
    this.locationId = document.getElementById("location");
    this.getLocation();
  }

  getLocation() {
    const location = navigator.geolocation.watchPosition(
      (e) => this.success(e),
      (e) => this.failure(e),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  }

  success(e) {
    const latitude = e.coords.latitude.toFixed(5);
    const longitude = e.coords.longitude.toFixed(5);
    this.locationId.textContent = `Lat: ${latitude} Long: ${longitude}`;

    addToMap.addCurrentLocationOnMap(latitude, longitude);
  }

  failure(e) {
    console.log(e);
  }
}

export default Location;

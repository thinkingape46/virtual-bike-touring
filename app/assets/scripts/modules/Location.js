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
    this.locationId.textContent = `latitude: ${e.coords.latitude.toFixed(
      3
    )} longitude: ${e.coords.longitude.toFixed(3)}`;
  }

  failure(e) {
    console.log(e);
  }
}

export default Location;

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
    this.locationId.textContent = `Lat: ${e.coords.latitude.toFixed(
      5
    )} Long: ${e.coords.longitude.toFixed(5)}`;
  }

  failure(e) {
    console.log(e);
  }
}

export default Location;

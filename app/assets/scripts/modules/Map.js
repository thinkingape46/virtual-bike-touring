import L from "leaflet";

class Map {
  constructor() {
    this.mapContainer = document.getElementById("map");
    this.lat = 12.9716;
    this.long = 77.5946;

    this.events();
    this.addMap();
    this.render();
  }

  addCircle() {
    this.circle = L.circle([this.lat, this.long], {
      fillColor: "#f00",
      radius: 50,
      color: "f00",
      fillOpacity: 1,
    });
    return this.circle;
  }

  addMap() {
    this.map = L.map(this.mapContainer);
  }

  render() {
    // const map = L.map(this.mapContainer);
    this.map.setView([this.lat, this.long], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreepMap Contributors</a>',
    }).addTo(this.map);
    this.addCircle().addTo(this.map);
  }

  moveCircle() {
    let paths = document.getElementsByClassName("leaflet-interactive");
    paths.forEach((p) => p.remove());
    this.map.setView([this.lat, this.long], 13);
    this.addCircle().addTo(this.map);
  }

  events() {
    this.mapContainer.addEventListener("click", (e) => {
      console.log(e);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        this.lat += 0.001;
        console.log(this.lat);
        this.moveCircle();
      }
    });
  }
}

export default Map;

import L from "leaflet";

class Map {
  constructor() {
    this.map = document.getElementById("map");
    this.render();
    this.events();
  }

  render() {
    const map = L.map(this.map);
    map.setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreepMap Contributors</a>',
      tileSize: 128,
    }).addTo(map);
  }

  events() {
    this.map.addEventListener("click", (e) => console.log(e));
  }
}

export default Map;

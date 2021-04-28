class MapProjection {
  constructor() {
    this.projectionDiv = document.getElementById("mercator");
    this.events();
  }

  events() {
    this.projectionDiv.addEventListener("click", (e) => {
      console.log(e);
    });
  }
}

export default MapProjection;

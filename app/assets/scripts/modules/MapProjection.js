class MapProjection {
  constructor() {
    this.projectionDiv = document.getElementById("mercator");
    this.events();
  }

  getLat(offsetX, clientWidth) {
    return (offsetX / clientWidth - 0.5) * 360;
  }

  events() {
    this.projectionDiv.addEventListener("click", (e) => {
      console.log(this.getLat(e.offsetX, e.target.clientWidth));

      console.log(
        ((e.target.clientHeight / 2 - e.offsetY) /
          (e.target.clientHeight / 2)) *
          90
      );
    });
  }
}

export default MapProjection;

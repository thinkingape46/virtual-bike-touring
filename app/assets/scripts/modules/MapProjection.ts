class MapProjection {
  projectionDiv: HTMLDivElement;

  constructor() {
    this.projectionDiv = <HTMLDivElement>document.getElementById("mercator");
    this.events();
  }

  getLat(positionX: number, mapWidth: number) {
    return (positionX / mapWidth - 0.5) * 360;
  }

  getLong(positionY: number, mapHeight: number) {
    return ((mapHeight / 2 - positionY) / (mapHeight / 2)) * 90;
  }

  events() {
    this.projectionDiv.addEventListener("click", (event: any) => {
      const positionX = +event.offsetX;
      const positionY = +event.offsetY;
      const mapWidth = +event.target.clientWidth;
      const mapHeight = +event.target.clientHeight;

      console.log(this.getLat(positionX, mapWidth));
      console.log(this.getLong(positionY, mapWidth));
    });
  }
}

export default MapProjection;

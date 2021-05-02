class AddToMap {
  projectionDiv: HTMLDivElement;

  constructor() {
    this.projectionDiv = <HTMLDivElement>document.getElementById("mercator");
  }

  addCurrentLocationOnMap(latitude: number, longitude: number) {
    console.log(latitude, longitude);

    const height = this.projectionDiv.clientHeight;
    const width: number = this.projectionDiv.clientWidth;

    const XCoordinate = width / 2 + (longitude / 180) * (width / 2);
    const YCoordinate = height * (0.5 - latitude / 180);

    const svgElement: string = `<div class='location' style="top: ${YCoordinate}px; left: ${XCoordinate}px"></div>`;

    this.projectionDiv.insertAdjacentHTML("beforeend", svgElement);
  }
}

export default AddToMap;

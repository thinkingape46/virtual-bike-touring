let degToRadFactor = 0.0174533;
let radiusEarth = 6371;

let smallestDistance =
  2 *
  radiusEarth *
  Math.asin(
    Math.sqrt(
      Math.pow(
        Math.sin(
          (latLongs[i + 1][0] * degToRadFactor -
            latLongs[i][0] * degToRadFactor) /
            2
        ),
        2
      ) +
        Math.cos(latLongs[i][0] * degToRadFactor) *
          Math.cos(latLongs[i + 1][0] * degToRadFactor) *
          Math.pow(
            Math.sin(
              (latLongs[i + 1][1] * degToRadFactor -
                latLongs[i][1] * degToRadFactor) /
                2
            ),
            2
          )
    )
  );

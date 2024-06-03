mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: list.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const el = document.createElement("div");
el.className = "custom-marker";
el.innerHTML = '<i class="fa-solid fa-route"></i>';
el.style.fontSize = "24px";
el.style.color = "red";

el.addEventListener("click", function () {
  const icon = el.querySelector("i");
  icon.classList.add("flip-animation");

  // Remove the animation class after the animation ends
  icon.addEventListener(
    "animationend",
    function () {
      icon.classList.remove("flip-animation");
    },
    { once: true }
  );
});

// Create a new marker.
const marker = new mapboxgl.Marker(el)
  .setLngLat(list.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${list.location}</h4><P>Exact Location Provide after booking</p><p>lng, lat: ${list.geometry.coordinates}</p>`))
  .addTo(map);

// map.on("load", () => {
//   // Load an image from an external URL.
//   map.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/cat.png", (error, image) => {
//     if (error) throw error;

//     // Add the image to the map style.
//     map.addImage("cat", image);

//     // Add a data source containing one point feature.
//     map.addSource("point", {
//       type: "geojson",
//       data: {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             properties: {
//               description: `<h4>${list.location}</h4><P>Exact Location Provide after booking</p><p>lng, lat: ${list.geometry.coordinates}</p>`,
//             },
//             geometry: {
//               type: "Point",
//               coordinates: list.geometry.coordinates,
//             },
//           },
//         ],
//       },
//     });

//     // Add a layer to use the image to represent the data.
//     map.addLayer({
//       id: "points",
//       type: "symbol",
//       source: "point", // reference the data source
//       layout: {
//         "icon-image": "cat", // reference the image
//         "icon-size": 0.25,
//       },
//     });
//   });
// });

const locations = JSON.parse(document.getElementById('map').dataset.locations);

// export const displayMap = (locations) => {
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2ltMXp6byIsImEiOiJja3EzcDA2dXIwcGl2Mm9sbmsza2YzZ254In0.pDTTzkZsx64T7UjBMJ-8mA';

var map = new mapboxgl.Map({
  container: 'map',

  style: 'mapbox://styles/sim1zzo/ckq3pe76p64i818rld9hnep53',
  scroolZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.summary}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
// };

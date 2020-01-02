mapboxgl.accessToken =
  'pk.eyJ1IjoidG9tZWN6ZWtzdGVjYyIsImEiOiJjazR4Nmg0NjkwbmZ5M2tycDhmczFwMWxpIn0.YVUqxPnemHV3bPKkLbQPLw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
  center: [18.921474, 50.446092]
});
getStores()
async function getStores() {
  const data = await fetch('/api/v1/stores')
    .then(res => res.json())
    .then(data => data);


  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });
  console.log(stores)
  loadMap(stores);
}

function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

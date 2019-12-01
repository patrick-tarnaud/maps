import L from 'leaflet'

const init = () => {
    let mymap = L.map('mymap').setView([47.2173, -1.5534], 12)

    let osmLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0NG1hcHMiLCJhIjoiY2szbHQyOHNzMGc1ZDNjbjRmZGhveWtlNSJ9.BBvPpZNDCCav-dtJBsgGAA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoicGF0NG1hcHMiLCJhIjoiY2szbHQyOHNzMGc1ZDNjbjRmZGhveWtlNSJ9.BBvPpZNDCCav-dtJBsgGAAs'
    })

    mymap.addLayer(osmLayer)
}

export { init }
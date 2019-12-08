import L from 'leaflet'
import { getDepartments } from './deparments'

let map = {
    _map: null,
    _departmentsLayer: null,
    _isDepartmentsLayerVisible: true,
    initMap() {
        this._map = L.map('mapid').setView([46.227638, 2.213749], 7)

        let osmLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0NG1hcHMiLCJhIjoiY2szbHQyOHNzMGc1ZDNjbjRmZGhveWtlNSJ9.BBvPpZNDCCav-dtJBsgGAA', {
            attribution: '_Map data &copy; <a href="https://www.openstreet_map.org/">OpenStreet_Map</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www._mapbox.com/">_Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicGF0NG1hcHMiLCJhIjoiY2szbHQyOHNzMGc1ZDNjbjRmZGhveWtlNSJ9.BBvPpZNDCCav-dtJBsgGAAs'
        }).addTo(this._map)

        this._departmentsLayer = this.createDepartmentsLayer()
        this.showDepartmentsLayer()


        this._map.on('zoomend', function (e) {
            this.scaleDepartmentsTooltips()
        }.bind(this))


    },
    getDepartmentLayer(code) {
        return this._departmentsLayer.getLayers().filter(dep => dep.feature.properties.code == code)[0]
    },
    hightlightDeparmentLayer(code) {
        this._departmentsLayer.getLayers().forEach((dep) => dep.setStyle({
            fill: false
        }))
        const dep = this.getDepartmentLayer(code)
        console.log(dep)
        dep.setStyle({
            fill: true,
            fillColor: '#df4a16',
            fillOpacity: 1
        })
    },
    scaleDepartmentsTooltips() {
        document.querySelectorAll('.leaflet-tooltip').forEach(tooltip => {
            tooltip.style.fontSize = 0.15 * this._map.getZoom() + 'em'

        })
    },
    createDepartmentsLayer() {
        return L.geoJSON(departmentsGeoJSON, {
            style: function (feature) {
                return {
                    fill: false
                }
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.nom + '(' + feature.properties.code + ')', { permanent: true, direction: 'center', className: 'depTooltip' })
            }
        })
    },
    switchDepartmentsLayer() {
        this._isDepartmentsLayerVisible ? this.hideDepartmentsLayer() : this.showDepartmentsLayer()
    },
    showDepartmentsLayer() {
        this._isDepartmentsLayerVisible = true
        this._departmentsLayer.addTo(this._map)
    },
    hideDepartmentsLayer() {
        this._isDepartmentsLayerVisible = false
        this._departmentsLayer.remove()
    }
}

export { map }
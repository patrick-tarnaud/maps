import L from 'leaflet'
import { getDepartments } from './deparments'
import { Wikipedia } from './wikipedia'

let map = {
    _map: null,
    _departmentsLayer: null,
    _isDepartmentsLayerVisible: true,
    _wikipedia: null,
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

        this.zoomoutDepartmentLayer()

        this._wikipedia = document.querySelector('#wikipedia')
    },
    getDepartmentLayer(code) {
        return this._departmentsLayer.getLayers().filter(dep => dep.feature.properties.code == code)[0]
    },
    hightlightDeparmentLayer(code) {
        this._departmentsLayer.getLayers().forEach((dep) => dep.setStyle({
            fill: true,
            fillColor: "transparent"
        }))
        const dep = this.getDepartmentLayer(code)
        dep.setStyle({
            fill: true,
            fillColor: 'blue',
            fillOpacity: 0.3
        })
    },
    zoominDepartmentLayer(code) {
        const dep = this.getDepartmentLayer(code)
        if (dep) {
            this._map.fitBounds(dep.getBounds())
        }
    },
    zoomoutDepartmentLayer() {
        this._map.fitBounds(this._departmentsLayer.getBounds())
    },
    scaleDepartmentsTooltips() {
        document.querySelectorAll('.leaflet-tooltip').forEach(tooltip => {
            tooltip.style.fontSize = 0.15 * this._map.getZoom() + 'em'

        })
    },
    async showWikipediaExtract(name) {
        let extract
        try {
            extract = await Wikipedia.getExtract(name)
        } catch (error) {
            // NOP
        }
        this._wikipedia.innerHTML = extract

    },
    createDepartmentsLayer() {
        return L.geoJSON(departmentsGeoJSON, {
            style: function (feature) {
                return {
                    fill: true,
                    fillColor: "transparent"
                }
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.nom + '(' + feature.properties.code + ')', { permanent: true, direction: 'center', className: 'depTooltip' })
                layer.on('click', function (e) {
                    map.showWikipediaExtract(feature.properties.nom)
                })
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
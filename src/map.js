import L from 'leaflet'

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

        // this._map.fitBounds([
        //     [
        //         -5.2734375,
        //         51.069016659603896
        //     ],
        //     [
        //         7.822265625000001,
        //         42.342305278572816
        //     ]
        // ])

        this._departmentsLayer = this.createDepartmentsLayer()
        this.showDepartmentsLayer()


        this._map.on('zoomend', function (e) {
            this.scaleDepartmentsTooltips()
        }.bind(this))
    },
    scaleDepartmentsTooltips() {
        document.querySelectorAll('.leaflet-tooltip').forEach(tooltip => {
            if (this._map.getZoom() <= 6) {
                tooltip.classList.remove('depTooltip')
                tooltip.classList.add('depTooltipZoomout')
            } else {
                tooltip.classList.remove('depTooltipZoomout')
                tooltip.classList.add('depTooltip')
            }
        })
    },
    createDepartmentsLayer() {
        return L.geoJSON(departments, {
            onEachFeature: function (feature, layer) {
                layer.on('click', () => console.log(feature.properties.nom))
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
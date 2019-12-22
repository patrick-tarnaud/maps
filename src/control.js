import { map } from './map'
import { getDepartments } from './deparments'

const control = {
    _switchtDepartmentsLayerButton: null,
    _departmentsSelect: null,
    _zoominButton: null,
    _zoomoutButton: null,
    initControl() {
        // button : show or hide departements layer
        this._switchtDepartmentsLayerButton = document.querySelector("#switchtDepartmentsLayerButton")
        this._switchtDepartmentsLayerButton.addEventListener('click', () => this.switchDepartmentsLayer())

        // select : department choice
        this._departmentsSelect = document.querySelector('#departmentsSelect')
        this.fillDepartmentsSelect()
        this._departmentsSelect.addEventListener('change', () => this.selectDepartment())

        // button : zoomin
        this._zoominButton = document.querySelector('#zoominButton')
        this._zoominButton.addEventListener('click', () => this.zoominDepartmentLayer())

        // button : zoomout
        this._zoomoutButton = document.querySelector('#zoomoutButton')
        this._zoomoutButton.addEventListener('click', () => this.zoomoutDepartmentLayer())

    },
    zoomoutDepartmentLayer() {
        map.zoomoutDepartmentLayer()
    },
    zoominDepartmentLayer() {
        map.zoominDepartmentLayer(this._departmentsSelect.value)
    },
    selectDepartment(e) {
        map.hightlightDeparmentLayer(this._departmentsSelect.value)
    },
    switchDepartmentsLayer() {
        map.switchDepartmentsLayer()
    },
    fillDepartmentsSelect(departmentsSelect) {
        const emptyOption = document.createElement('option')
        emptyOption.text = '--'
        emptyOption.value = 0
        this._departmentsSelect.add(emptyOption)
        getDepartments().forEach(dep => {
            const option = document.createElement('option')
            option.text = dep.name
            option.value = dep.code
            this._departmentsSelect.add(option)
        });
    }
}


export { control }
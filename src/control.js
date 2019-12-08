import { map } from './map'

const control = {
    isDeparmentsLayerVisible: true,
    initControl() {
        const switchtDepartmentsLayerButton = document.querySelector("#switchtDepartmentsLayerButton")
        switchtDepartmentsLayerButton.addEventListener('click', () => this.switchtDepartmentsLayer())
    },
    switchtDepartmentsLayer() {
        if (this.isDeparmentsLayerVisible) {
            map.hideDepartmentsLayer()
        }
        else {
            map.showDepartmentsLayer()
        }
        this.isDeparmentsLayerVisible = !this.isDeparmentsLayerVisible
    }
}


export { control }
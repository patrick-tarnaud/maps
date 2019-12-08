import { map } from './map'

const control = {
    isDeparmentsLayerVisible: true,
    initControl() {
        const switchtDepartmentsLayerButton = document.querySelector("#switchtDepartmentsLayerButton")
        switchtDepartmentsLayerButton.addEventListener('click', () => this.switchDepartmentsLayer())
    },
    switchDepartmentsLayer() {
        map.switchDepartmentsLayer()
    }
}


export { control }

const getDepartments = () => {
    return departmentsGeoJSON.features.map(d => {
        return { code: d.properties.code, name: d.properties.nom }
    })
}

export { getDepartments }
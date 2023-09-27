export const parseData = (object: any, key: string): any => {
    //parse直到对象中不包含data属性
    if (typeof object === 'string') {
        object = JSON.parse(object)
        return parseData(object, key)
    } else {
        if (!Object.keys(object).includes(key)) {
            return object
        } else {
            return parseData(object[key], key)
        }
    }
}

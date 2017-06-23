function mixin(sourceObj, targetObj) {
    for(var key in sourceObj) {
        if(!key in targetObj) {
            targetObj[key] = sourceObj[key]
        }
    }
    return targetObj
}
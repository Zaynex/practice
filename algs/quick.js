var startTime,
    endTime,
    duration;
function quickSort(arr) {

    if(arr.length<=1) {
        return arr;
    }

    var leftArr = [];
    var rightArr = [];
    var q = arr[0];
    for(var i = 1,l=arr.length; i<l; i++) {
        if(arr[i]>q) {
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }

    return [].concat(quickSort(leftArr),[q],quickSort(rightArr));
}
startTime = new Date();
var arr = [0,1,2,1,2,0,0,0,0,1,2,2,2,2,2,2,2,2,2,3,3,3,3];
console.log(quickSort(arr));
endTime = new Date();
duration = endTime.getTime() - startTime.getTime();
console.log(duration);

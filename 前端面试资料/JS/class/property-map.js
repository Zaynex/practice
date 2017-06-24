var myArray = [1, 4, 6];
for(var i in myArray) {
    console.log(i)
}
// [0,1,2]

for(var i of myArray) {
    console.log(i)
}
// [1,4,6]
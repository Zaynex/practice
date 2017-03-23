function process(values){
	if(!(values instanceof Array)){
		throw new Error("process(): Arguments must be  an array");
	}

	values.sort();

	for(var i=0, len=values.length; i< len;i++){
		if(values[i] > 10){
			return values[i];
		}
	}
	return -1;
}

process(10);
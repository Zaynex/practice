function Employee(data){
	this.employeeId = data.employeeId || 0;
	this.ssId = data.ssId || "0000-000-0000";

	this.name = data.name || "";

	this.occupation = data.occupation || "";

	this.companyName = data.companyName || "";
	this.companyAddress = data.companyAddress || "";
	this.companyCountry = data.companyCountry || "";
}

//建立三个方法用于获取员工名称职业公司信息
Employee.prototype.getName = function(){
	return this.name;
};

Employee.prototype.getOccupation = function(){
	return this.occupation;
};

Employee.prototype.getCompany = function(){
	return [this.companyName, this.companyAddress, this.companyCountry].join(", ");
};


var denOdell = new Employee({
	employeeId: 1456,
    ssId: "1234-567-8901",
    name: "Den Odell",
    occupation: "Head of Web Development",
    companyName: "AKQA",
    companyAddress: "1 St. John's Lane, London",
    companyCountry: "GB"
}),

	steveBallmer = new Employee({
        employeeId: 3,
        ssId: "8376-940-1673",
        name: "Steve Ballmer",
        occupation: "Ex-CEO",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGates = new Employee({
        employeeId: 1,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Founder",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGatesPhilanthropist = new Employee({
        employeeId: 2,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Philanthropist",
        companyName: "Gates Foundation",
        companyAddress: "500 Fifth Avenue North, Seattle, WA",
        companyCountry: "US"
    });
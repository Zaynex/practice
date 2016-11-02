function Person(data){
	this.ssId = data.ssId || "";
	this.name = data.name || "";
}


function  Company(data){
	this.name = data.name || "";
	this.address = data.address || "";
	this.country = data.country || "";
}

var personFactory = (function(){
	var people = {},
		personCount = 0;

	return {
		createPerson: function(data){
			var person = people[data.ssId],
				newPerson;

			if(person){
				return person;
			}else {
				newPerson = new Person(data);
				people[newPerson.ssId] = newPerson
				personCount++;

				return newPerson;
			}
		},

		getPersonCount: function(){
			return personCount;
		}
	};
}()),

	companyFactory = (function(){
		var companies = {},
			companyCount = 0;

		return {
			createCompany: function(data){
				var company = companies[data.name],
					newCompany;

				if(company){
					return company;
				}else {
					newCompany = new Company(data);
					companies[newCompany.name] = newCompany;
					companyCount++;

					return newCompany;
				}
			},

			getCompanyCount: function(){
				return companyCount;
			}
		};
	}()),


	employee = (function(){
		var employees = {},
			employeeCount = 0;

		return {
			add: function(data){
				var person = personFactory.createPerson({
					ssId: data.ssId,
					name: data.name
				}),

				company = companyFactory.createCompany({
					name: data.companyName,
					address: data.companyAddress,
					country: data.companyCountry
				});

				employees[data.employeeId] = {
					employeeId: data.employeeId,
					occupation: data.occupation,
					person: person,
					company: company
				};

				employeeCount++;
			},

			getName: function(employeeId){
				return employees[employeeId].person.name;
			},

			getOccupation: function(employeeId){
				return employees[employeeId].occupation;
			},

			getCountry: function(employeeId){
				var company = employees[employeeId].company;
				return [company.name, company.address, company.country].join(", ");
			},


			getTotalCount: function(){
				return employeeCount;
			}

		};
	}());
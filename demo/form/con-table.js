var countries = [
	{text:"中国", value:"1"},
	{text:"美国", value:"2"},
];
var proviences = {
	1:[
		{text:"浙江", value:"1.1"},
		{text:"黑龙江",value:"1.2"},
		{text:"江西",value:"1.3"}
	],
	2:[
		{text:"洛杉矶",value:"2.1"},
		{text:"迈阿密",value:"2.2"},
	]
};

var addressForm = document.forms.addressForm;

function fillSelect(select, list){
	for(var i = select.length - 1; i > 0; i--){
		select.remove(i);
	}
	list.forEach(function(data){
		var option = new Option(data.text, data.value);
		select.add(option);
	});
}


EventUtil.addHandler(addressForm.country, "change", function(event){
	var value = addressForm.country.value,
		list = proviences[value]||[];
	fillSelect(addressForm.provience, list);
});
fillSelect(addressForm.country, countries);



/*
三级表单
 */
var data = [{
    text: '1第一章',
    value: '1',
    list: [{
        text: '1.1第一篇',
        value: '1.1',
        list: [{
            text: '1.1.1第一节',
            value: '1.1.1',
            list: []
        }, {
            text: '1.1.2第二节',
            value: '1.1.2',
            list: []
        }]
    }, {
        text: '1.2第二篇',
        value: '1.2',
        list: [{
            text: '1.2.1第一节',
            value: '1.2.1',
            list: []
        }, {
            text: '1.2.2第二节',
            value: '1.2.2',
            list: []
        }]
    }]
}, {
    text: '2第二章',
    value: '2',
    list: [{
        text: '2.1第一篇',
        value: '2.1',
        list: [{
            text: '2.1.1第一节',
            value: '2.1.1',
            list: []
        }, {
            text: '2.1.2第二节',
            value: '2.1.2',
            list: []
        }]
    }, {
        text: '2.2第二篇',
        value: '2.2',
        list: [{
            text: '2.2.1第一节',
            value: '2.2.1',
            list: []
        }, {
            text: '2.2.2第二节',
            value: '2.2.2',
            list: []
        }]
    }]
}];
var threeForm = document.forms.threeForm;
var selectList = threeForm.getElementsByTagName("select");
function cascade(selectList, data) {
    function fillSelect(select, list, index) {
        var restSelect = Array.prototype.slice.call(selectList, index+1);
        restSelect.forEach(function(select){
            select.innerHTML = select.firstElementChild.outerHTML;
        });
        list.forEach(function(data) {
            var option = new Option(data.text, data.value);
            option.datalist = option.datalist || data.list;
            select.add(option);
        });
    }
  
    Array.prototype.forEach.call(selectList, function(select, index, selectList) {
        select.addEventListener(
            'change',
            function(event) {
                var event = event || window.event;
                var value = event.target.value;
                var nextSelect = selectList[index + 1];
                if (!value) {
                    fillSelect(nextSelect, [], index);
                    return;
                }
                var cache = event.target.selectedOptions[0].datalist;
                fillSelect(nextSelect, cache, index);
            });
    });
    fillSelect(selectList[0], data);
}
cascade(selectList, data);

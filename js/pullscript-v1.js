var urlTemplate = "http://taginfo.openstreetmap.org/api/4/key/combinations?key=#KEYWORD#&filter=all&sortname=to_count&sortorder=desc&page=1&rp=#ITEMS_PER_QUERY#&qtype=other_key&format=json_pretty";

var LEVELS = 3;
var currentLevel = 0;

var result = {};
var keyword = 'bicycle';
var ITEMS_PER_QUERY = 18;

var makeUrl = function(urlTemplate, keyword){
	return urlTemplate.replace('#KEYWORD#', keyword).replace("#ITEMS_PER_QUERY#", ITEMS_PER_QUERY);
};

var loadPayload = function(keyword, result){
	var url = makeUrl(urlTemplate, keyword);
	console.log('LOADING', keyword);
	$.ajax({
		url: url,
		context: document.body
	}).done(function(data) {
		//console.log(data);
		saveResults(keyword, data, result);
	}).fail(function(e){
		console.error(e);
	});
};

var saveResults = function(keyword, taginfo, output){
	output.name = keyword;
	output.children = [];
	taginfo.data.map(function(item){
		if(item.other_key === keyword) return;
		output.children.push({
			name:item.other_key,
			size:item.together_count
		});
	});
	currentLevel++;
	if(++currentLevel > LEVELS) return doneParsing();
	console.log('output', output);
	output.children.map(function(item){
		setTimeout(function(){
			loadPayload(item.name, item);
		}, 100);

	});
};

var doneParsing = function(){
	console.log('done', result);
};

loadPayload(keyword, result);
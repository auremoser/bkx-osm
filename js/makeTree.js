#!/usr/bin/env node

var fs = require('fs');
var http = require('http');

var TOTAL_LEVELS = 16;
var currentLevel = 0;
var ITEMS_PER_QUERY = 16;
var MIN_SIZE = 10;
var MAX_SIZE = 300;
var KEYWORD = 'bicycle';
var OUTPUT_FILENAME = './tree.json';
var OPTIONS_TEMPLATE = {
	host: 'taginfo.openstreetmap.org',
	path: '/api/4/key/combinations?filter=nodes&sortname=to_count&sortorder=desc&page=1&qtype=other_key&key=#KEYWORD#&rp=#ITEMS_PER_QUERY#'
};


var RESULT = {};

var makeUrlOptions = function(keyword, options) {
	var output = {
		host: OPTIONS_TEMPLATE.host,
		path: OPTIONS_TEMPLATE.path.replace('#KEYWORD#', keyword).replace('#ITEMS_PER_QUERY#', ITEMS_PER_QUERY)
	};

	return output;
};

var loadPayload = function(keyword, result) {
	var options = makeUrlOptions(options, keyword);
	console.log('OPTIONS', options.host + options.path);
	http.request(options, onRequestResponse.bind(onRequestResponse, keyword, result)).end();
};

var onRequestResponse = function(keyword, output, response) {
	console.log('onRequestResponse for', keyword, '\n', output);
	var str = '';

	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function(chunk) {
		str += chunk;
	});

	//the whole response has been recieved, so we just print it out here
	response.on('end', function() {
		var taginfo = JSON.parse(str);
		output.name = keyword;
		output.children = [];
		taginfo.data.map(function(item){
			//We should actually store all keywords and check if indexOf
			if(item.other_key === keyword) return;
			output.children.push({
				name:item.other_key,
				percent: item.to_fraction,
				size: clamp(item.to_fraction, MIN_SIZE, MAX_SIZE)
			});
		});

		if(TOTAL_LEVELS < currentLevel++ ) return doneParsing(output);

		output.children.map(function(item){
			loadPayload(item.name, item);
		});
	});
};
var clamp = function(number, min, max){
	// c*t/d + b;
	return Math.floor(Math.max(min, number*max));
};

var called = 0;
var doneParsing = function(result){
	console.log('DONE', ++called);
	var output = JSON.stringify(RESULT, null, 4)
	fs.writeFile(OUTPUT_FILENAME, output, function(err) {
		if(err) return console.log(err);
		console.log("JSON saved to " + OUTPUT_FILENAME);
	});
}

loadPayload(KEYWORD, RESULT);
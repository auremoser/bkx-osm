##NODEME
a readme for node scripts

###relevant to
* `makeTree.js` (builds data tree of tags)
* `pullscript-v1` (previous version to test)

####generate data for the graph from [Tag Info's API](taginfo.openstreetmap.org/api/4/key/combinations?filter=nodes&sortname=to_count&sortorder=desc&page=1&qtype=other_key&key=undefined&rp=3)
* cd into the directory with makeTree.js
* from terminal run `node makeTree.js`
* drop resulting `tree.json` into data directory and change reference to it in `graph.js`

####parameters:
change these values to have more data:
	var TOTAL_LEVELS = 5;
	var ITEMS_PER_QUERY = 3;
bkx-osm
=======

[project] node edge visualization of os[e]m

###PROTOTYPE PROJECT
Quick and dirty d3 visualization of OSM tags from the [Tag Info API](http://taginfo.openstreetmap.org/keys/bicycle?filter=all#combinations) relative to a query for "bicycle" - related data.

Various iterations thus far have looked something like this, a tree diagram of the tags and their relative popularity pulled from Tag Info.

![V1](https://raw.githubusercontent.com/auremoser/bkx-osm/master/assets/graph-notags.jpg)

![V3](https://raw.githubusercontent.com/auremoser/bkx-osm/master/assets/graph-terms.jpg)

What it will likely illustrate:  

* the existing tagging structure is too loose (too many terms, too many redundancies)
* **visualizing the tags** helps you appreciate the structure of the schema and why that redundancy without a more thorough graph is problematic
* the [import and contribution process is likewise too complex](https://github.com/jremillard/osm-import-toolkit) for contributors who want to make bulk contributions to the OSM project
* by creating a **crosswalk** via bikestorming's micro taxonomy to OSM, we hope to use a more semantic and consistent schema to ease the import process

###DATA PROCESS
Data for this visualization came from a few short pulls on the [Tag Info API](http://taginfo.openstreetmap.org/), like [this](http://taginfo.openstreetmap.org/api/4/key/combinations?key=bicycle&filter=all&sortname=to_count&sortorder=desc&page=1&rp=16&qtype=other_key&format=json_pretty).
A quick [node script](https://github.com/auremoser/bkx-osm/blob/master/js/makeTree.js) in the `js` directory of this repo can be run ([using these instructions](https://github.com/auremoser/bkx-osm/blob/master/js/NODEME.md)) in Terminal to generate new data sets based on other queries or base terms.

The resulting tree viz illustrates a search path through the OSM folksonomy, where the most central node is the keyword searched, and the subsequent "children" nodes are other tags popularly associated with that search based on a sort of Tag Info's usage statistics. 

Instructions in the above-linked node script advise on the parameters to edit if you wish to adjust the graph's complexity and levels of children.

###GREATER PROJECT
* we'd like to visualize the existing tagging schema (folksonomic) if only to better understand how it's structured
* ultimately we'd like to visualize the [OSM Semantic Network Schema](http://wiki.openstreetmap.org/wiki/OSMSemanticNetwork) not as RDF (too obscure) but as [JSON-LD](http://manu.sporny.org/2014/json-ld-origins-2/) so it's more accessible to developers
* create graphs of the tagging schema for 'micro communities' who can contribute their open data to OSM's schema
* create a process for standardizing the folksonomic ingest of those data with a bikestorming taxonomy for bike and pedestrian info (bkx:footpath; bkx:bike_rental)

![V1](https://raw.githubusercontent.com/auremoser/bkx-osm/master/assets/bkx_v1.png)





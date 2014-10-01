bkx-osm
=======

[project] node edge visualization of os[e]m

###PROTOTYPE PROJECT
Quick and dirty d3 visualization of OSM tags from the [Tag Info API](http://taginfo.openstreetmap.org/keys/bicycle?filter=all#combinations) relative to a query for "bicycle" - related data.

Various iterations thus far have looked something like this, a tree diagram of the tags and their relative popularity pulled from Tag Info.

![V1](https://raw.githubusercontent.com/auremoser/bkx-osm/gh-pages/assets/bkx-v1.jpg)

![V3](https://raw.githubusercontent.com/auremoser/bkx-osm/gh-pages/assets/bkx-osm-minigraph.jpg)

What it will likely illustrate:  

* the existing tagging structure is too loose (too many terms, too many redundancies)
* **visualizing the tags** helps you appreciate the structure of the schema and why that redundancy is problematic
* the import and contribution process is likewise too complex for contributors who want to make meaningful contributions to the OSM project
* by creating a **crosswalk** via bikestorming's micro taxonomy to OSM, we hope to use a more semantic and consistent schema to ease the import process

###GREATER PROJECT
* we'd like to visualize the existing tagging schema (folksonomic)
* visualize the OSM Semantic Network Schema not as RDF (too obscure) but as JSON-LD so it's more accessible to developers
* create graphs of the tagging schema for 'micro communities' who can contribute their open data to OSM's schema
* create a process for standardizing the folksonomic ingest of those data with a bikesotorming taxonomy for bike and pedestrian info

![V1](https://raw.githubusercontent.com/auremoser/bkx-osm/gh-pages/assets/bkx_v1.png)





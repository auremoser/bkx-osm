var width = 960,
    height = 620,
    root;

  var force = d3.layout.force()
      .size([width, height])
      .linkDistance(50)
      .charge(-40)
      .on("tick", tick);

  var svg = d3.select("#graph").append("svg")
      .attr("width", width)
      .attr("height", height);

  var link = svg.selectAll(".link"),
      node = svg.selectAll(".node");

  d3.json("data/tree.json", function(error, json) {
    root = json;
    update();
  });

  function update() {
    var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
        .nodes(nodes)
        .links(links)
        .start();

    // Update the links…
    link = link.data(links, function(d) { return d.target.id; });

    // Exit any old links.
    link.exit().remove();

    // Enter any new links.
    link.enter().insert("line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // Update the nodes…
    node = node.data(nodes, function(d) { return d.id; }).style("fill"  , color);

    // Exit any old nodes.
    node.exit().remove();

    // Enter any new nodes, original, just nodes not text
    // node.enter().append("circle")
    //     .attr("class", "node")
    //     .attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; })
    //     .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5;   })
    //     .style("fill", color)
    //     .on("click", click)
    //     .call(force.drag);

    var g = node.enter().append("g")
        .attr("transform", function(d) { console.log(d); return "translate(" + d.x + " " + d.y + ")"; });

    // Create group so you can attach text + image to nodes
    // Create node group to size nodes by


    g.append("image")
        .attr("class", "node")
         .attr("xlink:href", "assets/graph-child-2.png")
         .attr("x", - 16)
         .attr("y", - 16)
         .attr("width", 32)
         .attr("height", 32)
         .on("click", click)
        .call(force.drag);

    g.append("text")
      .attr("class", "labels")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .style({'pointer-events': 'none'})
      .text(function(d) { return d.name })

  }

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // subtract 8 to offset the image to center and the endpoint of the edge
    // node.attr("x", function(d) { return d.x - 16; })
    //    .attr("y", function(d) { return d.y - 16; });

    node.attr("transform", function(d) { return "translate(" + d.x + " " + d.y + ")"; });

  }



  // Color leaf nodes #ff4455, and packages #ce1256 or #54278f.
  function color(d) {
    return d._children ? "#54278f" : d.children ? "#ce1256" : "#ff4455  ";
  }

  // Toggle children on click.
  function click(d) {
    if (!d3.event.defaultPrevented) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update();
    }
  }

  // Returns a list of all nodes under the root.
  function flatten(root) {
    var nodes = [], i = 0;

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }
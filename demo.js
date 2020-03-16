jsPlumb.ready(function () {

	var instance = jsPlumb.getInstance({
		Endpoint: ["Dot", { radius: 2 }],
		Connector: "StateMachine",
		HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
		ConnectionOverlays: [
			["Arrow", {
				location: 1,
				id: "arrow",
				length: 14,
				foldback: 0.8
			}],
			["Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
		],
		Container: "canvas"
	});

	instance.registerConnectionType("basic", { anchor: "Continuous", connector: "StateMachine" });

	window.jsp = instance;

	var canvas = document.getElementById("canvas");
	var button = document.getElementById("button");
	var windows = jsPlumb.getSelector(".statemachine-demo .w");
	var deleteTask = jsPlumb.getSelector(".statemachine-demo .w .delete");


	instance.bind("click", function (c) {
		instance.deleteConnection(c);
		var source = c.sourceId;
		var target = c.targetId;
		for (var i = 0; i < newMass.length; i++) {
			if (source == newMass[i].source && target == newMass[i].target) {
				newMass.splice(i, 1)
			}
		}
	});

	instance.bind("connection", function (info) {
		info.connection.getOverlay("label").setLabel(info.connection.id);
		var source = info.source.id;
		var target = info.target.id;
		newMass.push({source,target})
	});

	function newTask() {
		let name = document.getElementById('inp_1').value
		document.getElementById('inp_1').value = ''
		return name
	}
	jsPlumb.on(button, "click", function (e) {
		newNode(e.offsetX, e.offsetY, newTask());
	});
	

	// jsPlumb.on(deleteTask, "click", function(e) {
	// 	console.log(e.path[3].id, 'e')
	// 	let arrowForDelete = e.path[3].id
	// 	for (var i = 0; i < newMass.length; i++) {
	// 		if (arrowForDelete == newMass[i].source || arrowForDelete == newMass[i].target) {
  //     	instance.deleteConnection(instance.getConnections({source: arrowForDelete})[0]);
	// 			instance.deleteConnection(instance.getConnections({target: arrowForDelete})[0]);
	// 			newMass.splice(i, 1)
	// 			console.log(instance.getConnections({target: arrowForDelete})[0], 'arrow delete')
	// 		}
	// 	}
	// 	console.log(newMass, 'newArrow arrowForDelete')
	// });

	var initNode = function (el) {

		instance.draggable(el);

		instance.makeSource(el, {
			filter: ".ep",
			anchor: "Continuous",
			connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
			connectionType: "basic",
			extract: {
				"action": "the-action"
			},
			maxConnections: 5,
			onMaxConnections: function (info, e) {
				alert("Maximum connections (" + info.maxConnections + ") reached");
			}
		});
		instance.makeTarget(el, {
			dropOptions: { hoverClass: "dragHover" },
			anchor: "Continuous",
			allowLoopback: false,
		});

		instance.fire("jsPlumbDemoNodeAdded", el);
	};

	var newNode = function (x, y, name) {
		var d = document.createElement("div");
		var id = jsPlumbUtil.uuid();
		d.className = "w";
		d.id = id;
		d.setAttribute('name', name)
		d.innerHTML = name + "<div class=\"delete_wrapper\"><div class=\"delete\" onclick=\"deleteTask(this)\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></div></div><div class=\"ep\"></div>";
		d.style.left = x + "px";
		d.style.top = y + "px";
		instance.getContainer().appendChild(d);
		initNode(d);
		return d;
	};

	instance.batch(function () {
		for (var i = 0; i < windows.length; i++) {
			initNode(windows[i], true);
		}		
		for (var i in testMass) {
			instance.connect({ source: testMass[i].source, target: testMass[i].target, type: 'basic' });
		}
	});

	jsPlumb.fire("jsPlumbDemoLoaded", instance);

});

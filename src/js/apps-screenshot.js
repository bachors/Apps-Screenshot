/************************************************
 * #### Apps Screenshot ####
 * Built with Fabric.js.
 * Developed by @bachors 2017.
 * https://github.com/bachors/Apps-Screenshot
 * Updates will be posted to this site.
 ***********************************************/
var appScreenshot = function customTshirt() {
    var canvas,
        a,
        b;

    canvas = new fabric.Canvas('tcanvas', {
		hoverCursor: 'pointer',
		selection: true,
		selectionBorderColor: 'blue'
	});
	canvas.on({
		'object:moving': function(e) {
			e.target.opacity = 0.5
		},
		'object:modified': function(e) {
			e.target.opacity = 1
		},
		'object:selected': onObjectSelected,
		'selection:cleared': onSelectedCleared
	});
	canvas.findTarget = (function(b) {
		return function() {
			var a = b.apply(this, arguments);
			if (a) {
				if (this._hoveredTarget !== a) {
					canvas.fire('object:over', {
						target: a
					});
					if (this._hoveredTarget) {
						canvas.fire('object:out', {
							target: this._hoveredTarget
						})
					}
					this._hoveredTarget = a
				}
			} else if (this._hoveredTarget) {
				canvas.fire('object:out', {
					target: this._hoveredTarget
				});
				this._hoveredTarget = null
			}
			return a
		}
	})(canvas.findTarget);
	canvas.on('object:over', function(e) {});
	canvas.on('object:out', function(e) {});
	document.getElementById('add-text').onclick = function() {
		var a = $("#text-string").val();
		var b = new fabric.Text(a, {
			left: fabric.util.getRandomInt(0, 200),
			top: fabric.util.getRandomInt(0, 400),
			fontFamily: 'helvetica',
			angle: 0,
			fill: '#fff',
			scaleX: 0.5,
			scaleY: 0.5,
			fontWeight: '',
			hasRotatingPoint: true
		});
		canvas.add(b);
		canvas.item(canvas.item.length - 1).hasRotatingPoint = true;
		$("#textEditor").css('display', 'block');
		$("#imgEditor").css('display', 'block')
	};
	$("#text-string").keyup(function() {
		var a = canvas.getActiveObject();
		if (a && a.type === 'text') {
			a.text = this.value;
			canvas.renderAll()
		}
	});
	document.getElementById('remove-selected').onclick = function() {
		var b = canvas.getActiveObject(),
			activeGroup = canvas.getActiveGroup();
		if (b) {
			canvas.remove(b);
			$("#text-string").val("")
		} else if (activeGroup) {
			var c = activeGroup.getObjects();
			canvas.discardActiveGroup();
			c.forEach(function(a) {
				canvas.remove(a)
			})
		}
	};
	document.getElementById('bring-to-front').onclick = function() {
		var b = canvas.getActiveObject(),
			activeGroup = canvas.getActiveGroup();
		if (b) {
			b.bringToFront()
		} else if (activeGroup) {
			var c = activeGroup.getObjects();
			canvas.discardActiveGroup();
			c.forEach(function(a) {
				a.bringToFront()
			})
		}
	};
	document.getElementById('send-to-back').onclick = function() {
		var b = canvas.getActiveObject(),
			activeGroup = canvas.getActiveGroup();
		if (b) {
			b.sendToBack()
		} else if (activeGroup) {
			var c = activeGroup.getObjects();
			canvas.discardActiveGroup();
			c.forEach(function(a) {
				a.sendToBack()
			})
		}
	};
    $(".tfont").click(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontFamily = $(this).html();
            canvas.renderAll();
        }
    });
	$("#text-bold").click(function() {
		var a = canvas.getActiveObject();
		if (a && a.type === 'text') {
			a.fontWeight = (a.fontWeight == 'bold' ? '' : 'bold');
			canvas.renderAll()
		}
	});
	$("#text-italic").click(function() {
		var a = canvas.getActiveObject();
		if (a && a.type === 'text') {
			a.fontStyle = (a.fontStyle == 'italic' ? '' : 'italic');
			canvas.renderAll()
		}
	});
	$("#text-strike").click(function() {
		var a = canvas.getActiveObject();
		if (a && a.type === 'text') {
			a.textDecoration = (a.textDecoration == 'line-through' ? '' : 'line-through');
			canvas.renderAll()
		}
	});
	$("#text-underline").click(function() {
		var a = canvas.getActiveObject();
		if (a && a.type === 'text') {
			a.textDecoration = (a.textDecoration == 'underline' ? '' : 'underline');
			canvas.renderAll()
		}
	});
	$('#ts-bcolor').miniColors({
		change: function(a, b) {
			document.getElementById("appDiv").style.backgroundColor = this.value
		},
		open: function(a, b) {},
		close: function(a, b) {}
	});
	$('#text-bgcolor').miniColors({
		change: function(a, b) {
			var c = canvas.getActiveObject();
			if (c && c.type === 'text') {
				c.backgroundColor = this.value;
				canvas.renderAll()
			}
		},
		open: function(a, b) {},
		close: function(a, b) {}
	});
	$('#text-fontcolor').miniColors({
		change: function(a, b) {
			var c = canvas.getActiveObject();
			if (c && c.type === 'text') {
				c.fill = this.value;
				canvas.renderAll()
			}
		},
		open: function(a, b) {},
		close: function(a, b) {}
	});
	$('#text-strokecolor').miniColors({
		change: function(a, b) {
			var c = canvas.getActiveObject();
			if (c && c.type === 'text') {
				c.strokeStyle = this.value;
				canvas.renderAll()
			}
		},
		open: function(a, b) {},
		close: function(a, b) {}
	});
	$("#deviceTypes").change(function(e) {
		$(".device").removeClass('device-android');
		$(".device").removeClass('device-samsung');
		$(".device").removeClass('device-htc');
		$(".device").removeClass('device-nexus');
		$(".device").removeClass('device-tablet');
		$(".device").removeClass('device-windows');
		$(".device").removeClass('device-iphone');
		$(".device").addClass($(this).val())
	});
	$("#bcTypes").change(function(e) {
		var bc = $(this).val();
		if (bc == 'big') {
			$('#appDiv').css('width', '820px');
			$('#appDiv').css('padding', '20px');
			$('.' + $("#deviceTypes").val()).css('margin', '20px');
			canvas.setHeight(620);
			canvas.setWidth(800)
		} else {
			$('#appDiv').css('width', '400px');
			$('#appDiv').css('padding', '120px 0px 120px 0px');
			$('.' + $("#deviceTypes").val()).css('margin', 'auto');
			canvas.setHeight(800);
			canvas.setWidth(380)
		}
	});
	$(".clearfix button,a").tooltip();
	$("#text-left").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'left';
			canvas.renderAll()
		}
	});
	$("#text-center").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'center';
			canvas.renderAll()
		}
	});
	$("#text-right").click(function() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = 'right';
			canvas.renderAll()
		}
	});
	$("#saveImg").click(function() {
		html2canvas($("#appDiv"), {
			onrendered: function(fgfg) {
				window.open(fgfg.toDataURL('png'))
			}
		})
	});
	$(".img-polaroid").click(function() {
		var b = $(this).attr("src");
		var offset = 50;
		var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
		var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
		var angle = fabric.util.getRandomInt(-20, 40);
		var width = fabric.util.getRandomInt(30, 50);
		var opacity = (function(min, max) {
			return Math.random() * (max - min) + min;
		})(0.5, 1);

		fabric.Image.fromURL(b, function(image) {
			image.set({
				left: left,
				top: top,
				angle: 0,
				padding: 10,
				cornersize: 10,
				hasRotatingPoint: true
			});
			//image.scale(getRandomNum(0.1, 0.25)).setCoords();
			canvas.add(image);
		});
	});

	function getRandomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	function onObjectSelected(e) {
		var selectedObject = e.target;
		$("#text-string").val("");
		selectedObject.hasRotatingPoint = true
		if (selectedObject && selectedObject.type === 'text') {
			//display text editor	    	
			$("#textEditor").css('display', 'block');
			$("#text-string").val(selectedObject.getText());
			$('#text-fontcolor').miniColors('value', selectedObject.fill);
			$('#text-strokecolor').miniColors('value', selectedObject.strokeStyle);
			$("#imgEditor").css('display', 'block');
		} else if (selectedObject && selectedObject.type === 'image') {
			//display image editor
			$("#textEditor").css('display', 'none');
			$("#imgEditor").css('display', 'block');
		}
	}

	function onSelectedCleared(e) {
		$("#textEditor").css('display', 'none');
		$("#text-string").val("");
		$("#imgEditor").css('display', 'none');
	}

	function removeWhite() {
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'image') {
			activeObject.filters[2] = new fabric.Image.filters.RemoveWhite({
				hreshold: 100,
				distance: 10
			}); //0-255, 0-255
			activeObject.applyFilters(canvas.renderAll.bind(canvas));
		}
	}

	function readFile(evt) {
		var f = evt.target.files[0];

		if (f) {
			if (/(jpe?g|png|gif)$/i.test(f.type)) {
				var r = new FileReader();
				r.onload = function(e) {
					var base64Img = e.target.result;
					var offset = 50;
					var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
					var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
					var angle = fabric.util.getRandomInt(-20, 40);
					var width = fabric.util.getRandomInt(30, 50);
					var opacity = (function(min, max) {
						return Math.random() * (max - min) + min;
					})(0.5, 1);

					fabric.Image.fromURL(base64Img, function(image) {
						image.set({
							left: left,
							top: top,
							angle: 0,
							padding: 10,
							cornersize: 10,
							hasRotatingPoint: true
						});
						//image.scale(getRandomNum(0.1, 0.25)).setCoords();
						canvas.add(image);
					});
				}
				r.readAsDataURL(f);
			} else {
				alert("Failed file type");
			}
		} else {
			alert("Failed to load file");
		}
	}

	function readImg(evt) {
		var f = evt.target.files[0];

		if (f) {
			if (/(jpe?g|png|gif)$/i.test(f.type)) {
				var r = new FileReader();
				r.onload = function(e) {
					var base64Img = e.target.result;
					cekw(base64Img);
				}
				r.readAsDataURL(f);
			} else {
				alert("Failed file type");
			}
		} else {
			alert("Failed to load file");
		}
	}

	function cekw(d) {
		var f = new Image();
		f.onload = function() {
			var g = document.createElement('canvas');
			if (f.naturalWidth > 300) {
				alert('Untuk hasil yang lebih sempurna width image screenshot harus dibawah 300px.');
			}
			$('.sc').css({
				'backgroundImage': 'url(' + d + ')',
				'backgroundRepeat': 'no-repeat',
				'backgroundPosition': 'top center',
				'background-size': '100% 100%'
			});
		};
		f.src = d;
	}
	document.getElementById('inputImg').addEventListener('change', readFile, false);
	document.getElementById('inputBgr').addEventListener('change', readImg, false);

}
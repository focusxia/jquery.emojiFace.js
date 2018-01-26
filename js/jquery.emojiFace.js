var option;
(function(c) {
	var d = "😁 😂 😃 😄 😉 😊 😍 😘 😲 😷 👈 👉 ☝ 👆 👇 ✌ ✋ 👌 👍 ✊ 👊 👋 👏 👐 👣 👀 👂 👃".split(" ");
	c.fn.emojiInit = function(b) {
		option = c.extend({
			targetId: "",
            fontSize: 14,
			faceList: d,
			success: function(a) {},
			error: function(a, b) {}
		}, b);
		option.targetId = c(this).attr("id");
		b = c(this);
		if (void 0 == b || 0 >= b.length) option.error(null, "target object is undefined");
		else {
			option.fontSize = 20 < option.fontSize ? 20 : option.fontSize;
			option.fontSize = 14 > option.fontSize ? 14 : option.fontSize;
			var a = "";
			option.faceList.forEach(function(b) {
				a += "<i onclick='insertAtCaret(\"" + option.targetId + '","' + b + "\",this)' style='font: normal normal normal 14px/1 FontAwesome;cursor: pointer;padding:3px;font-size:" + option.fontSize + "px;width: 20px;display: inline-block;text-align:center;'>" + b + "</i>"
			});
			b.css("width", "100%");
			b.css("padding", "5px 30px 5px 5px");
			b.css("box-sizing", "border-box");
			b.css("resize", "vertical");
			b.parent().css("position", "relative");
			b.after("<i id='faceEnter' onclick='showFaceBlock()' style='padding: 5px;position: absolute;right: 0;top: 0;cursor: pointer;font: normal normal normal 14px/1 FontAwesome;'>😃</i>");
			b.after("<div id='faceBlock' style='background:rgb(216, 216, 216);border-radius: 12px;display: none;position: absolute;border: 1px solid #e2e2e2;padding: 5px;right: -150px;top: 25px;width: 300px;'>" + a + "</div>");
			c(document).click(function() {
				c("#faceBlock").hide()
			});
			c("#faceBlock").click(function(a) {
				a.stopPropagation()
			});
			c("#faceEnter").click(function(a) {
				a.stopPropagation()
			})
		}
	}
})(jQuery);
function showFaceBlock() {
	$("#faceBlock").show()
}
function insertAtCaret(c, d, b) {
	try {
		$("#faceBlock").hide();
		var a = $("#" + c).get(0);
		if (document.all && a.createTextRange && a.caretPos) {
			var e = a.caretPos;
			e.text = "" == e.text.charAt(e.text.length - 1) ? d + "" : d
		} else if (a.setSelectionRange) {
			var f = a.selectionStart,
				h = a.selectionEnd,
				k = a.value.substring(0, f),
				l = a.value.substring(h);
			a.value = k + d + l;
			a.focus();
			var g = d.length;
			a.setSelectionRange(f + g, f + g);
			a.blur()
		} else a.value += d;
		option.success(b)
	} catch (m) {
		option.error(b, m)
	}
};
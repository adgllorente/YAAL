
var positionSelected = -1;
$(function() {
	updateMenu();
});

var _generateJSON = function() {
	var data = {};
	$.each($('.menu-item a'), function(key, value) {
		data[$(value).context.innerText.substring(
			$(value).context.innerText.indexOf(':') + 2)] = $(value).attr('href');
	});
	return data;
};

var removeItem = function(position) {
	var idToRemove = $('.menu-item:eq(' + position + ') a').attr('id');
	$('.menu-item:eq(' + position + ')').remove();

	$.post('backend.php', {op: 'remove', idToRemove: idToRemove})
	.done(function() {
		updateMenu();
	});
};

var updateMenu = function() {
	var submenu  = getURLParameter('menu');
	$.get('backend.php', {op: 'get', submenu: submenu ? submenu : ''}, function(data) {
		var rawData = $.parseJSON(data);
			items = [],
			pos = 0,
			isLG = /.*LG.*/.test(navigator.userAgent),
			isSamsung = /.*SMART-TV.*/.test(navigator.userAgent),
			htmlCode = '';

		if (submenu) {
			htmlCode = '<div onmouseover="_selectItem(this)" class="menu-item">' +
				'<a href="./"><span class="menu-name">Home<span></a></div>';
			items.push(htmlCode);
		}

		$.each(rawData, function(key, val) {
			pos++;
			htmlCode = '<div onmouseover="_selectItem(this)" class="menu-item">' +
				'<a id="' + val._id.$oid + '" href="' + val.url + '">' + pos + ': ' +
					'<span class="menu-name">' + val.name + '<span>' +
				'</a>';
			htmlCode += !isLG && !isSamsung ?
				'<img onclick="removeItem(' + (pos - 1) + ')" class="remove-icon" src="./images/remove-icon.png" />' :
				'';

			htmlCode += '</div>';
			items.push(htmlCode);
		});

		document.getElementById('menu').innerHTML = items.join('');
	});
};

var getURLParameter = function(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};

var saveElement = function() {
	var name = $('input[name="name"]').val(),
		url = $('input[name="url"]').val() == '' ? "?menu=" + name : $('input[name="url"]').val(),
		submenu = getURLParameter('menu') ? getURLParameter('menu') : '';

	if (getURLParameter('menu') != null && $('input[name="url"]').val() == '') {
		alert('Just one submenu level allowed');
	} else {
		$.post('backend.php', {op: 'add', submenu: submenu, name: name, url: url})
		.done(function() {
			updateMenu();
		});
	}
};

var doPressButton = function() {
	var keyPressed = window.event.keyCode,
		positionToLoad = keyPressed - 49;

	// Start key mapping

	var isLG = /.*LG.*/.test(navigator.userAgent),
		isSamsung = /.*SMART-TV.*/.test(navigator.userAgent),
		key = {};

	if (isLG) {
		key = keyMapLG;
	} else if (isSamsung) {
		key = keyMapSamsung;
	}

	// End key mapping

	console.log(keyPressed);
	if (isLG) {
		if ($('input:focus').length === 0) {
			if (keyPressed === Key.RED) {
				document.location.reload(true);
			} else if (keyPressed >= Key.N1 && keyPressed <= Key.N9) {
				window.location = $('.menu-item:eq(' + positionToLoad + ') a').attr('href');
			} else if (keyPressed === Key.DOWN) { // DOWN
				positionSelected = positionSelected === $('.menu-item').length - 1 ? 0 : positionSelected + 1;
				_selectItem($('.menu-item:eq(' + positionSelected + ')'));
			} else if (keyPressed === Key.UP) { // UP
				positionSelected = positionSelected === 0 ? $('.menu-item').length - 1 : positionSelected - 1;
				_selectItem($('.menu-item:eq(' + positionSelected + ')'));
			} else if (keyPressed === Key.OK && positionSelected > -1) {
				window.location = $('.menu-item:eq(' + positionSelected + ') a').attr('href');
			}
		}
	}
};

var _selectItem = function(link) {
	$.each($('.menu-item'), function(key, value) {
		$(value).css('background-color', '');
	});
	if (/.*mouse.*/.test(window.event.type)) {
		positionSelected = -1;
	} else {
		$('.menu-item:eq(' + positionSelected + ')').css('background-color', '#d5a02a');
	}

	$('#URLToLoad #url').html($(link).children('a').attr('href'));
};

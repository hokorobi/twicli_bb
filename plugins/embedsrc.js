(function(){
	var res = [
		{search: /^https?:\/\/(?:\w+\.)?theta360\.com\/(?:[sm]\/\w+|spheres\/samples\/[a-z0-9-]+)/,
			replace: "$&/", type: "theta"},
		{search: /^https?:\/\/(?:\w+\.)?pinterest\.com\/pin\/\d+/,
			replace: "$&/", type: "pin"},
		{search: /^https?:\/\/(?:(?:www|m)\.youtube\.com\/watch\?.*v=|youtu\.be\/)([\w\-]+).*$/,
			replace: "http://www.youtube.com/embed/$1", type: "iframe"},
		{search: /^(https?:\/\/(?:i\.)?gyazo\.com\/[0-9a-f]+)(?:\.png)?$/,
			replace: "$1.png", type: "image"},
		{search: /https?:\/\/(?:nico\.ms|www\.nicovideo\.jp\/watch)\/((?!lv)(?!nw)(?!im)[a-z]{2}\d+)/, replace: "http://ext.nicovideo.jp/thumb_watch/$1", type: "script"},
		{search: /^https?:\/\/vine\.co\/v\/(\w+)$/, replace: "https://vine.co/v/$1/embed/simple", type: "iframe"},
		{search: /^http:\/\/img\.ly\/(\w+)$/, replace: "http://img.ly/show/large/$1", type: "iframe"},
		{search: /^https?:\/\/amp\.twimg\.com\/v\/([\w-]+)$/, replace: "https://amp.twimg.com/v/$1", type: "iframe"},
		{search: /^http:\/\/p\.twipple\.jp\/([\w-]+)$/, replace: "http://p.twipple.jp/show/large/$1", type: "image"},
		{search: /^https?:\/\/instagram\.com\/p\/([\w-]+)\/?/, replace: "http://instagram.com/p/$1/media/?size=m", type: "image"},
		{search: /^https?:\/\/.*(?:png|gif|jpg)$/, replace: "$&", type: "image"},
		{search: /^https?:\/\/pimg\.togetter\.com\//, replace: "$&", type: "image"},
		{search: /^https?:\/\/movapic\.com\/pic\/([\w]+)$/, replace: "http://image.movapic.com/pic/m_$1.jpeg", type: "iframe"},
		{search: /^https?:\/\/ow\.ly\/i\/([\w]+)$/, replace: "http://static.ow.ly/photos/normal/$1.jpg", type: "iframe"},
		{search: /^https?:\/\/vimeo\.com\/(?:m\/)?(\d+)$/, replace: "https://player.vimeo.com/video/$1", type: "iframe"}
	];

	var createAnchor = function(link, onclick) {
		var a = document.createElement('a');
		a.className = "button";
		a.href = "#";
		a.onclick = onclick;
		a.innerHTML = '<img src="images/jump.png" alt="☞" width="14" height="14">';
		link.parentNode.insertBefore(a, link.nextSibling);
	};

	registerPlugin({
		newMessageElement: function(elem) {
			var status = null;
			for(var i = 0; i < elem.childNodes.length; i++) {
				status = elem.childNodes[i];
				if (status.className && status.className.indexOf('status') >= 0)
					break;
			}
			var links = status.getElementsByTagName('a');
			var url;
			for (var i = 0; i < links.length; i++) {
				url = links[i].href;
				this.replaceUrl(null, links[i], url, url);
			}
		},
		replaceUrl : function(elem, link, lng, sht) {
			if (link.embedsrc) return;
			for (var i = 0; i < res.length; i++) {
				if (res[i].search.test(lng)) {
					link.embedsrc = true;
					createAnchor(link, function(){
						dispEmbedSrc(lng.replace(res[i].search, res[i].replace), link, res[i].type);
						return false;
					});
					return;
				}
			}
			if (lng.match(/^(https?:\/\/www\.slideshare\.net\/[-_0-9a-zA-Z.]+\/[-_0-9a-zA-Z.]+)/)) {
				link.embedsrc = true;
				xds.load("http://www.slideshare.net/api/oembed/2?url=" + RegExp.$1 + "&format=jsonp",
						function(x) {
							createAnchor(link, function(){
								dispEmbedSrc("http:\/\/www\.slideshare\.net\/slideshow\/embed_code\/"
									+ x.slideshow_id,
									link, 'iframe');
								return false;
							});
							
						});
			}
			else if (lng.match(/^(http:\/\/[\w\-]+\.tumblr\.com\/)post\/(\d+)/)) {
				xds.load(RegExp.$1+'api/read/json?id='+RegExp.$2,
					function(x) {
						var v = x.posts[0]['video-player'];
						if (!v) return;
						createAnchor(link, function(){ dispEmbedSrc(v, link, 'data') });
					})
			}
		}
	});
}());

function dispEmbedSrc(url, link, type) {
	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);
	var win_h = window.innerHeight || document.documentElement.clientHeight;
	$('rep').style.display = "block";
	var embedElem;
	if (type == "image") {
		embedElem = document.createElement("img");
		embedElem.style.margin = "auto";
		embedElem.style.display = "block";
	} else {
		var embedElem = document.createElement("iframe");
		embedElem.id = "embedsrc";
		embedElem.style.border = "0";
		embedElem.style.width = "100%";
		embedElem.style.height = "426px";
		embedElem.style.display = "block";
	}
	switch (type) {
		case 'image':
			embedElem.src = url;
			$('reps').appendChild(embedElem);
			break;
		case 'data':
			$('reps').appendChild(embedElem);
			embedElem.contentWindow.document.write('<div>' + url + '</div>');
			break;
		case 'iframe':
			embedElem.src = url;
			embedElem.style.height = Math.ceil(win_h * 0.5) + "px";
			$('reps').appendChild(embedElem);
			break;
		case 'script':
			$('reps').appendChild(embedElem);
			embedElem.contentWindow.document.write(
					'<div><scr' + 'ipt type="text/javascript" src="' + url +
					'"></scr' + 'ipt></div>');
			break;
		case 'pin':
			$('reps').appendChild(embedElem);
			embedElem.contentWindow.document.write(
					'<div><a data-pin-do="embedPin" href="' + url
					+ '"></a><scr'
					+ 'ipt type="text/javascript" async src="//assets.pinterest.com/js/pinit.js"></scr'
					+ 'ipt></div>');
			break;
		case 'theta':
			$('reps').appendChild(embedElem);
			embedElem.contentWindow.document.write(
					'<div class="ricoh-theta-spherical-image" ><a href="' + url
					+ '" target="_blank"></a></div><scr'
					+ 'ipt async src="https://theta360.com/widgets.js" charset="utf-8"></scr'
					+ 'ipt>');
			break;
	}
	$('rep').style.top = rep_top;
	scrollToDiv($('rep'));
	user_pick1 = user_pick2 = null;
}

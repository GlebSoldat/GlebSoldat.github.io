$(document).ready(function () {
	$(function() {
		function enabledFullPage() {
			new fullpage('#fullpage', {
				anchors: ['firstPage', 'secondPage', '3rdPage'],
				navigation: true,
				licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
			});
		}

		function disabledFullPage() {
			 fullpage_api.destroy('all');
		}

		enquire.register("screen and (min-width: 775px)", {
			match : function() {
				enabledFullPage()
			},
			unmatch : function() {
				disabledFullPage()	
			}
		});
	});
});
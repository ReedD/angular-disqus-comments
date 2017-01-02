import * as ng from 'angular';
declare var angular;

interface IDisqusCommentsProvider {
	shortName(): string;
}

class DisqusCommentsProvider implements ng.IServiceProvider {

	public shortName: string;

	public $get(): IDisqusCommentsProvider {
		return {
			shortName: () => {
				return this.shortName;
			}
		}
	}

}

class DisqusCommentsDirective implements ng.IDirective {

	private $window       : ng.IWindowService;
	private $timeout      : ng.ITimeoutService;
	private $location     : ng.ILocationService;
	private disqusLoaded  : Promise<void>;

	public restrict = 'E';
	public replace  = true;
	public template = '<div id="disqus_thread"></div>';

	constructor(
		$window       : ng.IWindowService,
		$timeout      : ng.ITimeoutService,
		$location     : ng.ILocationService,
		disqusComments: IDisqusCommentsProvider)
	{
		this.$window		= $window;
		this.$timeout	    = $timeout;
		this.$location	    = $location;
		// Load disqus
		this.disqusLoaded = new Promise<void>((resolve: Function, reject: Function) => {
			const shortName  = disqusComments.shortName();
			const scriptTag  = document.createElement('script');
			scriptTag.src    = `https://${shortName}.disqus.com/embed.js`;
			scriptTag.onload = function () {
				resolve();
			};
			scriptTag.setAttribute('data-timestamp', String(+ new Date()));
			document.body.appendChild(scriptTag);
		});
	}

	link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs:ng.IAttributes) {
		this.$timeout(() => {
			if (!document.body.contains(element[0])) return;
			this.disqusLoaded
				.then(() => {
					this.reset(this.$location.absUrl());
				});
		});
	}

	private reset (url: string) {
		if (!this.$window['DISQUS']) {
			console.error('Disqus is not loaded.');
		}
		this.$window['DISQUS'].reset({
			reload: true,
			config: function () {
				this.page.url = url;
			}
		});
	}

	static instance() {
		var directive = (
			$window       : ng.IWindowService,
			$timeout      : ng.ITimeoutService,
			$location     : ng.ILocationService,
			disqusComments: IDisqusCommentsProvider) =>
		{
			return new DisqusCommentsDirective($window, $timeout, $location, disqusComments);
		};
		directive['$inject'] = ['$window', '$timeout', '$location', 'disqusComments'];
		return directive;
	}

}

angular.module('DisqusComments', [])
	.provider('disqusComments',  DisqusCommentsProvider)
	.directive('disqusComments', DisqusCommentsDirective.instance());

export = 'DisqusComments';

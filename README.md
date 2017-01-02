# Angular Disqus Comments

A directive to add Disqus comments into your angular templates

## Install

yarn: `yarn add angular-disqus-comments`

npm: `npm install --save angular-disqus-comments`

## Setup

Add `angular-disqus-comments` to your applications module dependencies and then during the configuration stage set `shortName` equal to the short name associated with your Disqus account. This can be found in your Disqus [admin panel](https://disqus.com/admin/).

```javascript
angular
	.module('myApp', [
		require('angular-disqus-comments'), // Added via Browserify (or similar)
		'angular-disqus-comments' // Or added manually
	])
	.config(['disqusCommentsProvider', function (disqusProvider) {
		disqusProvider.shortName = '<YOUR SHORT NAME>';
	}]);
```

Then in your template simply add `<disqus-comments />` wherever you would like the comments injected.

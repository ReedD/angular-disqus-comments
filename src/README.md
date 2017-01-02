# Angular Disqus Comments

A directive to add Disqus comments into your angular templates

## Install

Yarn: `yarn add angular-disqus-comments`
NPM: `npm install --save angular-disqus-comments`

## Setup

Add `angular-disqus-comments` to your applications module dependencies and then during the configuration stage set `shortName` equal to the short name of your Disqus account. This can be found in your Disqus [admin panel](https://disqus.com/admin/).

```javascript
angular
	.module('myApp', [
		require('angular-disqus-comments'), // Add via Browserify
		'angular-disqus-comments' // Or add manually
	])
	.config(['disqusCommentsProvider', function (disqusProvider) {
		disqusProvider.shortName = '<YOUR SHORT NAME>';
	}]);
```

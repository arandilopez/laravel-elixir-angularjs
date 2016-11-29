# Laravel Elixir for AngularJS

Based on [Hrcc Laravel Elixir Angular](https://github.com/HRcc/laravel-elixir-angular)

**This package is just an update of @Hrcc with laravel/elixir new api**

## JSHInt
This package doesn't use *JSHint*.

## Usage
> (Take it from [Hrcc Laravel Elixir Angular](https://github.com/HRcc/laravel-elixir-angular))

This is a simple wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-angularjs');

elixir(function(mix) {
   mix.angular();
});
```
This will scan your `resources/assets/angular` directory for all .js files. Generates *Sourcemaps*,  concatenates and minifies (if environment is set to production) the final script.

Directory structure in `resources/assets/angular` is not forced, the only limitation is to provide at least one **\*.module.js** script with module initialization:

```javascript
angular.module('foo', ['other.module']);
```

Example use of a nested structure might look like this:
```
 /resources
     /angular
         foo.module.js
         /some-feature
             some-feature.module.js
             some-feature.controller.js
```

Finally, if you'd like to output to a different directory than the default `public/js/app`, then you may override this, while changing the name of resulting script if desired:

```javascript
mix.angular("resources/assets/angular/", "public/js/myapp/", "myapp.js");
```

## Why???
I just need this... I can't wait for an update, sorry...

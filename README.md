grunt-ria-pack
==========

>gruntplungin  js  css  combine


## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ria-pack --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ria-pack');
```

## fdserver task

### Overview
In your project's Gruntfile, add a section named `fdserver` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fdserver: {
     default:{
          options: {
             // Task-specific options go here.
          },
          your_target: {
            // Target-specific file lists
          },
     }
})
```

### Options

#### options.projectName
>state：specific project name
>Type: `String`
>Default value: `undefined`

#### options.reset
state：all files combined or uglify
Type: `Boolean`
Default value: `true`

#### options.minify
state：all files uglify
Type: `Boolean`
Default value: `false`

### Usage Examples

#### Options

```js
grunt.initConfig({
   fdserver: {
      default_options: {
        options: {
          projectName : 'blog7',      //projectName
          reset : true,   // all files combined or uglify
          minify: true     // all files uglify        
        },
        files: {
          'test/tmp': 'test/'
        }
      },
    },
})
```
source path :test/blog7
publish path : test/tmp

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.7

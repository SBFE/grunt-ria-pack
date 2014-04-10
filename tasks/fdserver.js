/*
 * fdserver
 * https://github.com/xiaoyue3/gruntplugin
 *
 * Copyright (c) 2014 xiaoyue
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var Path = require('path');
var rootpath = process.cwd();
var utils = require('js-combine-pack');
var tool = utils.tool;
var toolOptions = tool.config;

var findFiles = tool.findFiles;
// var byline = tool.lineStream;
var dStream = tool.depsStream;

var md5Cache = tool.md5Cache;

var findJsAllImport = tool.findJsAllImport;
function isJs(path) {
	return Path.extname(path) === '.js';
}

function isDirPath(path) {
	return Path.lastIndexOf('/') === path.length - 1;
}

module.exports = function(grunt) {
	grunt.registerMultiTask('fdserver', 'a simple, efficient, convenient RIA development environment', function() {
	    var done = this.async();
	    var options = this.options({
	     //    projectName : 'blog7'
	    });
	    //设置工程名
		if (options.projectName) {
			toolOptions.projectName = options.projectName;
		}
		// if(options.minify){
		// 	toolOptions.minify = options.minify;
		// }
	    this.files.forEach(function(f) {
	      	var confList, jsListCon, jsList;	
		    f.src.filter(function(path) {
		        if (grunt.file.exists(path)) {
					return true;
				} else {
					return false;
				}
		    }).forEach(function(path) {
		    	if(grunt.file.isDir(path)){
		    		//打包的根目录 打包的工程名 在此目录下进行打包
		    		toolOptions.basedir = Path.resolve(path,toolOptions.projectName);
		    		//获取要打包的文件夹下所有的js文件地址
		    		jsList = findFiles.allFilesList(toolOptions.basedir);
		    		//获取要打包的文件夹下所有的js文件内容
		    		jsListCon = findFiles.allFilesCon(jsList);
		    		//获取要打包的文件夹下所有需要合并并打包的文件列表
		    		confList = jsList.filter(function(value,key){
									return value.match(/\\conf\\/);
								});
		    		confList.forEach(function(file) {
		    			findJsAllImport(toolOptions.basedir,file,jsListCon,function(data){
		    				var filename = Path.basename(file).replace(/\.dev/,'');
			    			grunt.file.write(f.dest + filename, data);
			    			grunt.log.writeln('File "' + f.dest + filename + '" created.');
			    			done();
			    		});
					});	
		    	}
		    });
	    });
	});
};

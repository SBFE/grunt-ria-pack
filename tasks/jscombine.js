/*
 * grunt-ria-pack
 * https://github.com/liuxiaoyue/grunt-ria-pack
 *
 * Copyright (c) 2014 xiaoyue
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var Path = require('path');
var utils = require('js-combine-pack');
var async = require('async');
var tool = utils.tool;
var toolOptions = tool.config;
var findFiles = tool.findFiles;
var findJsAllImport = tool.findJsAllImport;

module.exports = function(grunt) {
	grunt.registerMultiTask('jscombine', 'blog js combine gruntplugin', function() {
	    var done = this.async();
	    var options = this.options({
	     //    projectName : 'blog7'
	    });
	    //设置工程名
		if (options.projectName) {
			toolOptions.projectName = options.projectName;
		}
		
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
		    		jsListCon = findFiles.allFilesCon(jsList,toolOptions.basedir);
		    		//获取要打包的文件夹下所有需要合并并打包的文件列表
		    		confList = jsList.filter(function(value,key){
									return value.match(/\\conf\\/);
								});
		    		async.each(confList, function(file, callback) {
		    			findJsAllImport(file,jsListCon,function(data){
							var filename = Path.basename(file).replace(/\.dev/,'');
			    			grunt.file.write(f.dest + '/' +options.projectName + '/'+filename, data);
			    			grunt.log.writeln('File "' + f.dest + filename + '" created.');
			    		});
					}, function(err){
					  	done();
					});
		    	}
		    });
	    });
	});
};

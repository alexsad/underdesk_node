module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			view:{
				expand: true,
				cwd: './app/br',
				src: [
				"**/view/*.js"
				],
				dest: 'public/js/br'
			}
			,viewAssets:{
				expand: true,
				cwd: '../src/br',
				src: [
					"**/view/assets/**"
				],
				dest: 'public/js/br'
			}
			,serverResources:{
				expand: true,
				cwd: '../src/br',
				src: [
					"**/gerador/resource/template/**"
				],
				dest: 'app/br'
			}
			,jsLibs:{
				expand: true,
				cwd: './bower_components',
				src: [
					'!underas/'
					,"**/*min.js"
					,"**/require.js"
				],
				dest: 'public/js/lib'
			}
			,jsLibsNotMin:{
				expand: true,
				cwd: './bower_components/underas/dist/js/lib',
				src: [
					"bootstrap/**/*.*"
					,"underas/**/*.*"
					,"util/**/*.*"
				],
				dest: 'public/js/lib'
			}
		}
		,clean: {
			server: {
				src: ['app/br']
			}
			,client: {
				src: 'public/js/br'
			}
		}
		,uglify: {
			view: {
				files: [{
					expand: true,
					src: "**/view/*.js",
					dest: 'public/js/br',
					cwd: './public/js/br'
				}]
			}
			,server: {
				options: {
					mangle: false
				}
				,files: [{
					expand: true,
					src: "**/*.js",
					dest: 'app/br',
					cwd: './app/br'
				}]
			}
		}
		,ts: {
		  view : {
				tsconfig: "../tsconfigview.json"
		  }
		  ,server : {
				tsconfig: "../tsconfigserver.json"
		  }
		}
		,bower: {
			install: {
				 //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			}
		}
});


	//console.log( grunt.option( "target" ) );

	//var targetFile = grunt.option( "target" );

	//global[targetFile] = grunt.option( "target" );


	grunt.registerTask('build-view-pos', function(){
		grunt.file.recurse("public/js/br/", function(abspath, rootdir, subdir, filename){
			//console.log(abspath+":"+rootdir+":"+filename);
			if(filename.indexOf(".js")>-1){
				var contentFile = grunt.file.read(abspath);
				if(contentFile.indexOf("})(container_1.ModWindow);")){
					contentFile = contentFile.replace(/(_super\.call\(this,.*)/,"$1 this.setUrlModule('"+abspath.replace("public/","").replace(/\//g,".").replace(".js","")+"');");
					grunt.file.write(abspath, contentFile);
					//grunt.log.writeln('File "' + abspath + '" modified.');
				}
			};
		});
	});



	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower-task');


	grunt.registerTask('default', ['build-dev']);
	//grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('build-server-dev', ['clean:server','ts:server','copy:serverResources']);
	grunt.registerTask('build-server-deploy', ['build-server-dev','uglify:server']);
	grunt.registerTask('build-view-dev', ['clean:client','ts:view','copy:viewAssets','build-view-pos']);
	grunt.registerTask('build-view-deploy', ['build-view-dev','uglify:view']);
	grunt.registerTask('build-dev', ['build-server-dev','build-view-dev']);
	grunt.registerTask('build-deploy', ['build-server-deploy','build-view-deploy']);
	grunt.registerTask('install-deps', ['bower:install','copy:jsLibs','copy:jsLibsNotMin']);



};

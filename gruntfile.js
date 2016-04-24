module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			my_target: {
				files: [{	
					expand: true,
					cwd: 'public/styles',
					src: ['*.css', '!*.min.css'],
					dest: 'public/styles',
					ext: '.min.css'
				}]
			}
		}
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
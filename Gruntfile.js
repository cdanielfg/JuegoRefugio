module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			css: {
				src: './www/css/main.css',
				dest: './www/css/main.min.css'
			}
		},uglify: {
      my_target: {
        files: {
          './www/js/main.min.js': ['./www/js/main.js']
        }
      }
    }
	});
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['cssmin','uglify']);
}
const sass = require('node-sass');// scss to css
const grunt=require('grunt'); // all files

require('load-grunt-tasks')(grunt); // 

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {                       
            dist: {                         
              options: {                      
                style: 'expanded',
                implementation:sass
              },
              files: [{                      
                expand: true,
                cwd: 'assets/scss',
                src: '**/*.scss',
                dest: 'assets/css',
                ext: '.css'
              }]
            }
        }
    })
    grunt.registerTask('default',['sass']); 
};
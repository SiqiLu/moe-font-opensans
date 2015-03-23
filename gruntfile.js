module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './',
          src: ['fonts.css'],
          dest: './',
          ext: '.min.css'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/**/*.js']
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      }
    },

    exec: {
      options: {
        stdout: true,
        stderr: true
      },
      npmUpdate: {
        command: 'npm update'
      },
      npmInstall: {
        command: 'npm install'
      },
      npmPublish: {
        command: 'npm publish'
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    }
  });

  grunt.registerTask('default', ['js', 'cssmin']);

  grunt.registerTask('js', ['jshint', 'jscs']);
  grunt.registerTask('release', ['exec:npmUpdate', 'default', 'bump']);
  grunt.registerTask('release-minor', ['exec:npmUpdate', 'default', 'bump:minor']);
  grunt.registerTask('release-major', ['exec:npmUpdate', 'default', 'bump:major']);

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);
};

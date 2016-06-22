module.exports = function (grunt) {

  var jsFiles = [
    '*.js',
    'services/**/*.js',
    'test/**/*.js',
    '*.js',
    //Explicit Ignore
    '!test/app/**/*'
  ];

  grunt.initConfig({
    watch: {
      scripts: {
        files: jsFiles,
        tasks: ['eslint']
      }
    },
    eslint: {
      js: {
        src: jsFiles,
        options: {
          configFile: './config/.eslintrc-default.json'
        }
      }
    },
    jsbeautifier: {
      modify: {
        src: jsFiles,
        options: {
          config: './config/.jsbeautifyrc'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 10000,
          ui: 'bdd',
          growl: true,
          colors: true,
          require: ['should']
        },
        src: [
          './test.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'eslint:js',
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'jsbeautifier:modify',
    'test'
  ]);
};

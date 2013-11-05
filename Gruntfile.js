module.exports = function (grunt)
{
    var angularFiles = [
        'src/app/_agidoMockups.js', 'src/app/editorCtrl.js', 'src/app/stage.js'
    ];
    var kineticFiles = [
        'src/icons/arrowDown.icon.js',
        'src/icons/arrowLeft.icon.js',
        'src/icons/arrowRight.icon.js',
        'src/icons/arrowUp.icon.js',
        'src/icons/backButton.icon.js',
        'src/icons/calendar.icon.js',
        'src/icons/datepicker.icon.js',
        'src/icons/home.icon.js',
        'src/icons/nextButton.icon.js',
        'src/icons/search.icon.js',
        'src/components/_util.js',
        'src/components/arrow.js',
        'src/components/button.js',
        'src/components/checkbox.js',
        'src/components/checkboxGroup.js',
        'src/components/comment.js',
        'src/components/datepicker.js',
        'src/components/grid.js',
        'src/components/imageItem.js',
        'src/components/input.js',
        'src/components/link.js',
        'src/components/menu.js',
        'src/components/menuBar.js',
        'src/components/pagination.js',
        'src/components/panel.js',
        'src/components/paragraph.js',
        'src/components/radioGroup.js',
        'src/components/radioItem.js',
        'src/components/select.js',
        'src/components/table.js',
        'src/components/textArea.js',
        'src/components/window.js'
    ];
    var sourceFiles = kineticFiles.concat(angularFiles);

    // Project configuration.
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dev_angular: {
                src: angularFiles,
                dest: 'dist/agido-mockups-dev.angular.js'
            },
            dev_kinetic: {
                src: kineticFiles,
                dest: 'dist/agido-mockups-dev.kintetic.js'
            },
            prod_kinetic: {
                src: kineticFiles,
                dest: 'dist/agido-mockups-v<%= pkg.version %>.kinetic.js'
            },
            prod_angular: {
                src: angularFiles,
                dest: 'dist/agido-mockups-v<%= pkg.version %>.angular.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> http://itcrowd.pl by IT Crowd @it-crowd - MIT License https://github.com/it-crowd/agido-mockups/wiki/License*/\n'
            },
            build: {
                files: {
                    'dist/agido-mockups-v<%= pkg.version %>.kinetic.min.js': 'dist/agido-mockups-v<%= pkg.version %>.kinetic.js',
                    'dist/agido-mockups-v<%= pkg.version %>.angular.min.js': 'dist/agido-mockups-v<%= pkg.version %>.angular.js'
                }
            }
        },
        clean: {
            build: ['dist/*']
        },
        jshint: {
            options: {
                laxbreak: true
            },
            all: ['src/**/*.js']
        }
    };


    for (var n = 0; n < sourceFiles.length; n++) {
        var inputFile = sourceFiles[n];
        var className = (inputFile.match(/[-_\w]+[.][\w]+$/i)[0]).replace('.js', '');
        var outputFile = 'dist/agido-mockups-' + className + '-v<%= pkg.version %>.min.js';

        config.uglify.build.files[outputFile] = [inputFile];
    }

    grunt.initConfig(config);

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Tasks
    grunt.registerTask('dev', ['clean', 'concat:dev_angular', 'concat:dev_kinetic']);
    grunt.registerTask('full', ['clean', 'concat:prod_angular', 'concat:prod_kinetic', 'uglify']);
    grunt.registerTask('hint', ['clean', 'jshint']);
};

module.exports = function (grunt) {

    // *************************************************************************
    // PROJECT FILES
    // Make a list of templates you want converted to files
    // *************************************************************************

    var projectFiles = {
        'frame_main.html':  'frame_main.html.tmpl',
        'frame_fixed.html': 'frame_fixed.html.tmpl',
        'frame_extra.html': 'frame_extra.html.tmpl',
        'frame_main.inc':   'frame_main.inc.tmpl',
        'frame_fixed.inc':  'frame_fixed.inc.tmpl',
        'frame_extra.inc':  'frame_extra.inc.tmpl',
        'test.html':        'test.html.tmpl'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************

    grunt.config('multi_lang_site_generator', {
        default: {
            options: {
                vocabs:             ['<%= config.services.default %>'],
                vocab_directory:    'source/vocabs',
                template_directory: 'source/tmpl/',
                output_directory:   'content',
                data: {
                    version:             '<%= pkg.version %>',
                    inlineStyleElm:      '<style><%= grunt.file.read("content/" + config.services.default + "/css/inline.css") %></style>',
                    inlineIframeManager: '<%= grunt.file.read("source/js/lib/news_special/iframemanager__host.js") %>',
                    path:                '<%= env[config.whichEnv].domain %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
                    pathStatic:          '<%= env[config.whichEnv].domainStatic %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
                    projectNumber:       '<%= config.project_number %>',
                    cpsId:               '<%= config.cps_id || config.project_number %>',
                    istatsName:          '<%= config.istatsName %>',
                    storyPageUrl:        '<%= config.storyPageUrl %>',
                    debug:               '<%= config.debug %>',
                    amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>'
                }
            },
            files: projectFiles
        },
        build_all_other_sites: {
            options: {
                vocabs:             '<%= config.services.others %>',
                vocab_directory:    'source/vocabs',
                template_directory: 'source/tmpl/',
                output_directory:   'content',
                data: {
                    version:             '<%= pkg.version %>',
                    inlineStyleElm:      '<style><%= grunt.file.read("content/" + config.services.default + "/css/inline.css") %></style>',
                    inlineIframeManager: '<%= grunt.file.read("source/js/lib/news_special/iframemanager__host.js") %>',
                    path:                '<%= env[config.whichEnv].domain %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
                    pathStatic:          '<%= env[config.whichEnv].domainStatic %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
                    projectNumber:       '<%= config.project_number %>',
                    cpsId:               '<%= config.cps_id || config.project_number %>',
                    istatsName:          '<%= config.istatsName %>',
                    storyPageUrl:        '<%= config.storyPageUrl %>',
                    debug:               '<%= config.debug %>',
                    amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>'
                }
            },
            files: projectFiles
        }
    });
    grunt.loadNpmTasks('grunt-multi-lang-site-generator');
};

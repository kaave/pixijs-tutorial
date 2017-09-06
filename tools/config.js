module.exports = {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  // この項目に要素を追加すると[copy:*]という名称で勝手にtaskも増えます。
  copy: {
    assets: ['assets/**/*'],
  },

  rev: {
    src: 'build/**/*.{js,css,png,gif,jpg,jpeg,svg,eot,ttf,woff,ico}',
    dest: 'build',
    manifestFileName: 'manifest.json',
    isEnable: true
  },

  revReplace: {
    src: ['build/index.html', 'build/**/*.{js,css,html}'],
    dest: 'build',
  },

  view: {
    src: ['src/views/**/*.ejs', '!src/views/**/_*'],
    watch: ['src/views/**/*.ejs', 'src/modules/**/*.ejs'],
    rename (path) {
      // TODO: ちょっと複雑感あるので、一旦コメントアウト
      // if (path.basename === 'index') {
      //   return;
      // }

      // let basename = 'index';
      // let dirname = `${path.dirname}/`;

      // dirname += path.basename.split('.').reduce((str, item) => {
      //   if (item.charAt(0) === '_') {
      //     basename = item.substr(1);
      //   } else {
      //     str += `${item}/`;
      //   }
      //   return str;
      // }, '');

      // path.basename = basename;
      // path.dirname = dirname;
    },
  },

  style: {
    src: ['src/styles/**/*.css', '!src/styles/**/_*'],
    watch: ['src/styles/**/*.css', 'src/components/**/*.css', 'src/modules/**/*.css'],
    urlOption: { filter: ['./**/*'], url: 'inline' },
    autoprefixerOption: { grid: true }
  },

  script: {
    src: ['src/scripts/**/*.{js,jsx}', '!src/scripts/**/_*'],
    watch: ['src/scripts/**/*', 'src/components/**/*.{js,jsx}', 'src/modules/**/*.{js,jsx}', 'src/libs/**/*.js']
  },

  browser: {
    notify: false,
    port: 9012,
    reloadDebounce: 500,
    server: {
      baseDir: ['.tmp'],
      routes: {
        '/': 'assets'
      },
    },
  },
};
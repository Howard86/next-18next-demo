const fs = require('fs');
const chalk = require('chalk');
const { i18n } = require('./next-i18next.config');

const DEFAULT_NAMESPACE = 'common';
const DEFAULT_NON_TRANSLATED_STRINGS = '__NOT_TRANSLATED__';

module.exports = {
  input: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  output: './',
  options: {
    sort: true,
    removeUnusedKeys: true,
    lngs: i18n.locales,
    ns: [DEFAULT_NAMESPACE, 'hero'],
    defaultLng: i18n.defaultLocale,
    defaultNs: DEFAULT_NAMESPACE,
    defaultKey: (_lng, ns, key) => `${ns}-${key}`,
    defaultValue: (lng, _ns, key) =>
      lng === i18n.defaultLocale ? key : DEFAULT_NON_TRANSLATED_STRINGS,
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    'use strict';
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);

    let ns;
    const match = content.match(/useTranslation\(.+\)/);
    if (match) ns = match[0].split(/(\'|\")/)[2];

    let count = 0;
    parser.parseFuncFromString(
      content,
      { list: ['t'] },
      function (key, options) {
        parser.set(
          key,
          Object.assign({}, options, {
            ns: ns ? ns : DEFAULT_NAMESPACE,
            nsSeparator: ':',
            keySeparator: false,
          }),
        );
        ++count;
      },
    );
    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};

# node-mybatis-generator
  [![Build Status][travis-image]][travis-url]
  [![Build Status][appveyor-image]][appveyor-url]
  [![NPM version][npm-image]][npm-url]
  [![Code Climate][quality-image]][quality-url]
  [![Codecov branch][codecov-image]][codecov-url]

使用node.js实现的mybatis generator，生成mybatis mapper的JAVA代码。

## Installation

```shell
$ npm install --g mybatis-generator
```

## Usage：

```shell
$ mybatis-generator -c examples/mapper.json -d examples/db.json
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/mybatis-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mybatis-generator
[travis-image]: https://img.shields.io/travis/liuwill/node-mybatis-generator/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/liuwill/node-mybatis-generator
[quality-image]: https://img.shields.io/codeclimate/github/liuwill/node-mybatis-generator.svg?style=flat-square
[quality-url]: https://codeclimate.com/github/liuwill/node-mybatis-generator
[appveyor-image]: https://img.shields.io/appveyor/ci/liuwill/node-mybatis-generator/master.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/liuwill/node-mybatis-generator
[codecov-image]: https://img.shields.io/codecov/c/github/liuwill/node-mybatis-generator.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/liuwill/node-mybatis-generator

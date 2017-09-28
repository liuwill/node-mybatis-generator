'use strict'

var chai = require('chai')
var nunjucks = require('nunjucks')

chai.should()
var expect = chai.expect

describe('#nunjucks features', function() {
  it('is template works', function() {
    var languages = ['Java', 'javascript', 'Python']
    var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('examples'))
    var result = nunjucksEnv.render('template.njk', { languages: languages })
    expect(result).to.include(languages[0])
  })
})

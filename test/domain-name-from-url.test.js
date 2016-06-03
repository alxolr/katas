const domainName = url => {
    let striped = url.replace(/http:\/\//g, '')
      .replace(/https:\/\//g, '')
      .replace(/www./g, '');
    
    return /(.+?)\./g.exec(striped)[1];
  },
  assert = require('assert'),

  configs = [{ in : 'http://github.com/carbonfive/raygun',
    out: 'github'
  }, { in : 'http://www.zombie-bites.com',
    out: 'zombie-bites'
  }, { in : 'http://www.cnet.com',
    out: 'cnet'
  }, { in : 'https://youtube.com',
    out: 'youtube'
  }, { in : 'www.xakep.ru',
    out: 'xakep'
  }, { in : 'http://google.co.jp',
    out: 'google'
  }];

describe('DomainName', () => {
  configs.forEach(item => {
    it(`should return '${item.out}' given '${item.in}'`, () => {
      assert.equal(domainName(item.in), item.out);
    });
  });
});

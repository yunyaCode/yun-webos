
var CSSCoder = {
  format: function (t: any) {
    return t = t.replace(/body|html/g, "").
      replace(/\s*([\{\}\:\;\,])\s*/g, "$1").
      replace(/;\s*;/g, ";").
      replace(/\,[\s\.\#\d]*{/g, "{").
      replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2").
      replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2").
      replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2")
  },
  packAdv: function (t: any) {
    return t = t.replace(/body|html/g, "").
      replace(/\/\*(.|\n)*?\*\//g, "").
      replace(/\s*([\{\}\:\;\,])\s*/g, "$1").
      replace(/\,[\s\.\#\d]*\{/g, "{").
      replace(/;\s*;/g, ";"),
      null == (t = t.match(/^\s*(\S+(\s+\S+)*)\s*$/)) ? "" : t[1]
  },
  pack: function (t: any) {
    return t = t.replace(/body|html/g, "").
      replace(/\/\*(.|\n)*?\*\//g, "").
      replace(/\s*([\{\}\:\;\,])\s*/g, "$1").
      replace(/\,[\s\.\#\d]*\{/g, "{").
      replace(/;\s*;/g, ";").
      replace(/;\s*}/g, "}").
      replace(/([^\s])\{([^\s])/g, "$1{$2").
      replace(/([^\s])\}([^\n]s*)/g, "$1}\n$2")
  }
};

export function ruleStyle(selectorText: string, prefix: string) {
  selectorText = '@charset \"utf-8\";' + CSSCoder.packAdv(selectorText).split('}').map((item: string) => {

    if (!item || item.length < 1) return ''
    console.log('itemitemitemitem1,', item)

    if (item.includes('@charset')) {
      item = item.split(';').filter((v: string) => {
        if (v.includes('@charset')) {
          return null
        } else {
          return v
        }
      }).join(';')
    }

    if (item.includes(',') && item.split(',').length > 1) {
      item = item.split(',').map((v: string) => {
        return `${prefix} ${v}`
      }).join(',')
    } else {
      item = `${prefix} ${item}`
    }
    console.log('itemitemitemitem2,', item)
    return item
  }).join('}')

  return selectorText
}

export function add(code: string, content: HTMLElement) {



}

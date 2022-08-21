import { Schema, NodeSpec, MarkSpec, DOMOutputSpec } from 'prosemirror-model'

export const dinos = ['brontosaurus', 'stegosaurus', 'triceratops', 'tyrannosaurus', 'pterodactyl']
export const dinoNodeSpec = {
  // Dinosaurs have one attribute, their type, which must be one of
  // the types defined above.
  // Brontosaurs are still the default dino.
  attrs: {
    type: { default: 'brontosaurus' },
    varLabel: { default: 'varLabel' },
    inputValue: { default: 'inputValue' }
  },
  inline: true,
  group: 'inline',
  draggable: true,

  // These nodes are rendered as images with a `dino-type` attribute.
  // There are pictures for all dino types under /img/dino/.
  toDOM: node => {
    const outerSpan = document.createElement('span')
    outerSpan.contentEditable = 'true'

    const span = document.createElement('span')
    span.contentEditable = 'false'
    span.setAttribute('varLabel', node.attrs.varLabel)
    span.classList.add('variable-block')
    span.innerText = node.attrs.inputValue
    span.style.margin = '0px 5px'

    const curSpan = document.createElement('span')
    curSpan.innerHTML = '&#xFEFF;'

    outerSpan.append(span, curSpan)

    return outerSpan
    // return [
    //   'span',
    //   node.attrs.inputValue
    //   // {
    //   //   contenteditable: false,
    //   //   varLabel: node.attrs.varLabel,
    //   //   inputValue: node.attrs.inputValue
    //   // }
    // ]
  }
  // When parsing, such an image, if its type matches one of the known types, is converted to a dino node.
  // parseDOM: [
  //   {
  //     tag: 'span[varLabel]',
  //     getAttrs: dom => {
  //       let type = dom.getAttribute('dino-type')
  //       return dinos.indexOf(type) > -1 ? { type } : false
  //     }
  //   }
  // ]
}

const pDOM: DOMOutputSpec = ['p', 0],
  blockquoteDOM: DOMOutputSpec = ['blockquote', 0],
  hrDOM: DOMOutputSpec = ['hr'],
  preDOM: DOMOutputSpec = ['pre', ['code', 0]],
  brDOM: DOMOutputSpec = ['br']

/// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
  /// NodeSpec The top level document node.
  doc: { content: 'block+' } as NodeSpec,

  dino: dinoNodeSpec,

  /// A plain paragraph textblock. Represented in the DOM
  /// as a `<p>` element.
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return pDOM
    }
  } as NodeSpec,

  /// A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    content: 'inline*', // *代表不允许存在子节点; block+ 默认可以被退格键删除
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return blockquoteDOM
    }
  } as NodeSpec,

  /// A heading textblock, with a `level` attribute that
  /// should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  /// `<h6>` elements.
  heading: {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } }
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, 0]
    }
  } as NodeSpec,

  /// The text node.
  text: { group: 'inline' } as NodeSpec
}

const emDOM: DOMOutputSpec = ['em', 0],
  strongDOM: DOMOutputSpec = ['strong', 0],
  codeDOM: DOMOutputSpec = ['code', 0]

/// [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
  /// A strong mark. Rendered as `<strong>`, parse rules also match
  /// `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      { tag: 'b', getAttrs: (node: HTMLElement) => node.style.fontWeight != 'normal' && null },
      { style: 'font-weight', getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }
    ],
    toDOM() {
      return strongDOM
    }
  } as MarkSpec
}

/// This schema roughly corresponds to the document schema used by
/// [CommonMark](http://commonmark.org/), minus the list elements,
/// which are defined in the [`prosemirror-schema-list`](#schema-list)
/// module.
///
/// To reuse elements from this schema, extend or read from its
/// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).

export const mySchema = new Schema({ nodes, marks })

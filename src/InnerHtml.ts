
import type { Slots } from 'vue'
import { defineComponent, h } from 'vue'
import { parse, type ParseResult } from './parse'

const parseRender: (node: ParseResult, slots: Slots) => any = (node: ParseResult, slots) => {
  if (typeof node === 'string')
    return node
  if (Array.isArray(node)) { return node.map(child => parseRender(child, slots)) }
  else if (node) {
    const childrenRender = () => node.children ? parseRender(node.children, slots) : undefined
    const render = () => h(node.tag, node.props, childrenRender())
    const slot = slots[node.tag]
    if (slot)
      return slot({ node, render, childrenRender })
    else
      return render()
  }
}

const InnerHtml = defineComponent({
  name: 'InnerHtml',
  props: {
    nodes: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const pNodes = parse(props.nodes)
    return () => parseRender(pNodes, slots)
  },
})

export default InnerHtml

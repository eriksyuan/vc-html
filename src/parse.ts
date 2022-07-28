import { Parser } from 'htmlparser2'
import type { Handler } from 'htmlparser2/lib/Parser'

export type ParseResult = Array<PNode | string> | PNode | string

export interface PNode {
  tag: string
  props: Record<string, string | boolean>
  children?: ParseResult
}

type Tag = keyof HTMLElementTagNameMap

export const parse = (html: string) => {
  const bufList: PNode[] = []
  let results: ParseResult
  const lastBufList = () => {
    return bufList[bufList.length - 1]
  }

  function push(value: string | PNode, target?: ParseResult) {
    if (!target) return value
    if (Array.isArray(target)) target.push(value)
    else
      target = [target, value]
    return target
  }

  const onopentag: Handler['onopentag'] = (tag: Tag, attribs) => {
    const props = Object.keys(attribs).reduce<Record<string, string | boolean>>((pre, attr) => {
      if (attribs[attr] === '')
        pre[attr] = true
      else
        pre[attr] = attribs[attr]
      return pre
    }, {})
    bufList.push(
      {
        tag,
        props,
      },
    )
  }

  const ontext: Handler['ontext'] = (data) => {
    const last = lastBufList()
    if (typeof last !== 'string' && last)
      last.children = push(data, last.children)
    else
      results = push(data, results)
  }
  const onclosetag: Handler['onclosetag'] = () => {
    const buf = bufList.pop()
    if (bufList.length <= 0 && buf) {
      results = push(buf, results)
    }
    else if (buf) {
      const last = lastBufList()
      if (last && typeof last !== 'string')
        last.children = push(buf, last.children)
    }
  }
  const htmlParser = new Parser({
    onopentag,
    ontext,
    onclosetag,
  })
  htmlParser.write(html)
  htmlParser.end()

  return results
}

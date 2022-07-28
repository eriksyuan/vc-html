
import { h } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import InnerHtml, { parse } from '@eriksyuan/vc-html'
import { mount } from '@vue/test-utils'

describe('parse', () => {
  it('only string', () => {
    expect(parse('hello')).toEqual('hello')
  })
  it('child', () => {
    expect(parse('<div class="hello_world" site>hello<span title="haha">haha</span><img src="www.baidu.com"/></div>')).toEqual({
      tag: 'div',
      props: {
        class: 'hello_world',
        site: true,
      },
      children: [
        'hello',
        { tag: 'span', props: { title: 'haha' }, children: 'haha' },
        {
          tag: 'img',
          props: {
            src: 'www.baidu.com',
          },
        },
      ],
    })
  })
})

describe('component', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(InnerHtml, {
      props: {
        nodes: '<div id="custom" class="custom_style" title="divTitle"><img src="https://www.baidu.com"><div>haha2</div></div>',
      },
      slots: {
        div({ node, render, childrenRender }) {
          if (node.props.class === 'custom_style') {
            console.log(node)
            return h('div', {
              ...node.props,
              class: 'custom_class',
            }, h(childrenRender))
          }
          else {
            return h(render)
          }
        },
      },
    })
  })

  it('should be render', () => {
    expect(wrapper.html()).toBe(
      `<div id="custom" class="custom_class" title="divTitle"><img src="https://www.baidu.com">
  <div>haha2</div>
</div>`)
  })
})

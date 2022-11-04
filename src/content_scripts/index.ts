import { getItem } from '@/utils/storage'
import pkg from '../../package.json'

const previousKeyword = ['上一页', '前一页', 'Previous', 'previous']
const nextKeyword = ['下一页', '后一页', 'Next', 'next']

let previousDom: HTMLElement | null = null
let nextDom: HTMLElement | null = null

const ignoreNodeNames = ['SCRIPT', 'STYLE', 'IFRAME', 'LINK', 'SCRIBE-SHADOW', 'NOSCRIPT']

window.addEventListener('load', () => {
  window.addEventListener('keydown', handleKeydown)
})

window.addEventListener('beforeunload', () => {
  previousDom = null
  nextDom = null
  window.removeEventListener('keydown', handleKeydown)
})

function isPaginationNode(node: HTMLElement, paginationKeyword: string[]) {
  const { title, firstChild, ariaLabel, rel } = node as any
  const { nodeValue } = firstChild || {}
  return paginationKeyword.some(keyword => [title, nodeValue, ariaLabel, rel].join('').includes(keyword))
}

function forNode(node: HTMLElement) {
  if (!node) return
  if (ignoreNodeNames.includes(node.nodeName)) return
  if (isPaginationNode(node, previousKeyword)) previousDom = node
  if (isPaginationNode(node, nextKeyword)) nextDom = node
  if (node.children !== undefined) {
    for (let i = 0; node.children[i] != undefined; i++) {
      forNode(node.children[i] as HTMLElement)
    }
  }
}

async function handleKeydown(e: KeyboardEvent) {
  // 在搜索输入框按左右键不做任何处理
  if (document.activeElement?.nodeName === 'INPUT') return
  // 判断是否为开启状态
  const active = await getItem(pkg.name)
  if (!active) return
  if (e.key === 'ArrowLeft') { // 下一页
    forNode(document.body)
    if (previousDom) previousDom.click()
  } else if (e.key === 'ArrowRight') { // 上一页
    forNode(document.body)
    if (nextDom) nextDom.click()
  }
}

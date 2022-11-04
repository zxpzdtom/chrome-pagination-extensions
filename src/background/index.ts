import { getItem, setItem } from '@/utils/storage'
import pkg from '../../package.json'

const ACTIVE_ICON = '/icons/active.png'
const INACTIVE_ICON = '/icons/inactive.png'

async function updateExtensionStatus() {
  const active = await getItem(pkg.name) ?? true
  chrome.action.setIcon({
    path: active ? INACTIVE_ICON : ACTIVE_ICON,
  })
  setItem(pkg.name, !active)
}

chrome.action.onClicked.addListener(updateExtensionStatus)

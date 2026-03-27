<script lang="ts">
  import { onMount } from 'svelte'

  import { copyTextToClipboard } from '@/lib/clipboard'
  import {
    articleShareDomHooks,
    queryByHook,
    queryScopedByHook,
    readDataHookValue,
    sharedDomHooks,
  } from '@/lib/dom-hooks'

  type Props = {
    controllerId: string
  }

  let { controllerId }: Props = $props()

  onMount(() => {
    const root = queryScopedByHook<HTMLElement>(
      document,
      articleShareDomHooks.root,
      sharedDomHooks.controllerId,
      controllerId,
    )

    if (!(root instanceof HTMLElement)) {
      return
    }

    const nativeButton = queryByHook<HTMLButtonElement>(root, articleShareDomHooks.nativeButton)
    const copyButton = queryByHook<HTMLButtonElement>(root, articleShareDomHooks.copyButton)
    const feedback = queryByHook<HTMLElement>(root, articleShareDomHooks.feedback)
    const manualSection = queryByHook<HTMLElement>(root, articleShareDomHooks.manualSection)
    const manualInput = queryByHook<HTMLInputElement>(root, articleShareDomHooks.manualInput)

    if (
      !(nativeButton instanceof HTMLButtonElement) ||
      !(copyButton instanceof HTMLButtonElement) ||
      !(feedback instanceof HTMLElement) ||
      !(manualSection instanceof HTMLElement) ||
      !(manualInput instanceof HTMLInputElement)
    ) {
      return
    }

    const shareTitle = readDataHookValue(articleShareDomHooks.title, root) || document.title
    const shareDescription = readDataHookValue(articleShareDomHooks.description, root)
    const shareUrl = readDataHookValue(articleShareDomHooks.url, root) || window.location.href
    const shareFallback = readDataHookValue(articleShareDomHooks.fallback, root) || 'Share is unavailable.'
    const copyLinkSuccess = readDataHookValue(articleShareDomHooks.copyLinkSuccess, root) || 'Link copied.'
    const copyLinkError = readDataHookValue(articleShareDomHooks.copyLinkError, root) || 'Unable to copy the link.'
    const copyLinkManual = readDataHookValue(articleShareDomHooks.copyLinkManual, root) || copyLinkError

    root.setAttribute(articleShareDomHooks.ready.attr, 'true')
    manualInput.value = shareUrl

    if (typeof navigator.share !== 'function') {
      nativeButton.hidden = true
    }

    const setFeedback = (message: string) => {
      feedback.textContent = message
      feedback.classList.remove('hidden')
    }

    const showManualCopy = () => {
      manualSection.classList.remove('hidden')
      manualInput.focus()
      manualInput.select()
    }

    const hideManualCopy = () => {
      manualSection.classList.add('hidden')
    }

    const copyLink = async () => {
      if (await copyTextToClipboard(shareUrl)) {
        hideManualCopy()
        setFeedback(copyLinkSuccess)
        return true
      }

      showManualCopy()
      setFeedback(copyLinkManual)
      return false
    }

    const handleNativeShare = async () => {
      if (typeof navigator.share !== 'function') {
        setFeedback(shareFallback)
        return
      }

      try {
        await navigator.share({
          text: shareDescription,
          title: shareTitle,
          url: shareUrl,
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setFeedback(shareFallback)
      }
    }

    const handleCopyClick = () => {
      void copyLink()
    }

    const handleManualCopyFocus = () => {
      manualInput.select()
    }

    nativeButton.addEventListener('click', handleNativeShare)
    copyButton.addEventListener('click', handleCopyClick)
    manualInput.addEventListener('focus', handleManualCopyFocus)
    manualInput.addEventListener('click', handleManualCopyFocus)

    return () => {
      root.removeAttribute(articleShareDomHooks.ready.attr)
      nativeButton.removeEventListener('click', handleNativeShare)
      copyButton.removeEventListener('click', handleCopyClick)
      manualInput.removeEventListener('focus', handleManualCopyFocus)
      manualInput.removeEventListener('click', handleManualCopyFocus)
    }
  })
</script>

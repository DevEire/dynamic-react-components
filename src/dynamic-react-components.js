// import React from 'react'
// import { createRoot } from 'react-dom/client'

export function dynamicReactComponents(options = {
  components: {},
  React: false,
  createRoot: false,
  selector: 'dynamic-react-component',
  disableLogs: false
}) {
  const DEBUG =
    !options.disableLogs && (
    window.location.hostname === 'localhost' ||
    window.location.href.includes('_drc=debug'))

  DEBUG && console.log('Dynamic React Components: Debug enabled.')

  if (!options.React) {
    console.error('Dynamic React Components: Requires React to be passsed as an options argument.')
    return
  }

  if (!options.createRoot) {
    console.error('Dynamic React Components: Requires createRoot to be passsed as an options argument.')
    return
  }

  const DynamicReactComponents = {}
  DynamicReactComponents.options = options

  const initializeDynamicReactComponents = () => {
    window.DynamicReactComponents = DynamicReactComponents
    DEBUG && console.log('Dynamic React Components: Initialized.', window.DynamicReactComponents)

    const domElements = document.querySelectorAll(options.selector)

    if (domElements.length === 0) {
      DEBUG && console.log('Dynamic React Components: No components to render. Options used:', options)
      return
    }

    let componentName
    let root
    let props
    let prop

    domElements.forEach((element) => {
      if (!element.hasAttribute('data-component')) {
        console.log('%cDynamic React Components: Component name must be passed using the `data-component` attribute.', 'color: #d84315', element)
        return
      }

      componentName = element.getAttribute('data-component')
      root = options.createRoot(element)

      props = {}

      for (prop in element.dataset) {
        props[prop] = element.dataset[prop]
      }

      props._innerHTML = element.innerHTML

      if (options.components.hasOwnProperty(componentName)) {
        root.render(
          options.React.createElement(options.components[componentName], props)
        )
      } else {
        console.log('%cDynamic React Components: Component not found ->', 'color: #d84315', componentName)
      }
    })
  }

  const dynamicReactComponents_update = () => {
    if (!window.DynamicReactComponents && document.readyState === 'complete') {
      initializeDynamicReactComponents()
    } else {
      if (window.DynamicReactComponents) {
        console.log('%cDynamic React Components: Already initialized.', 'color: #d84315', window.DynamicReactComponents)
      } else {
        DEBUG && console.log('Dynamic React Components: Document not ready.')
      }
    }
  }

  document.addEventListener('readystatechange', dynamicReactComponents_update, true)

  dynamicReactComponents_update()
}
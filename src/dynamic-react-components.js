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
		let json
		let root

    domElements.forEach((element) => {
      // import/render each element, passing the JSON/data?
      componentName = element.getAttribute('data-component')
      json = element.getAttribute('data-json')
      root = options.createRoot(element)

			if (options.components.hasOwnProperty(componentName)) {
				root.render(
					options.React.createElement(options.components[componentName], { json })
				)
			} else {
				console.log('%cDynamic React Components: Component not found ->', 'color: #d84315', componentName)
			}
    })
  }

  const DynamicReactComponents_update = () => {
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

  document.addEventListener('readystatechange', DynamicReactComponents_update, true)

  DynamicReactComponents_update()
}
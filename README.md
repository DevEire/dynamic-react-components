# Dynamic React Components

This library allows you to render isolated React components on the front end. It is especially useful in cases where you need to ingest back-end data/endpoints but don't have access to the back-end renderer.

```
npm i @deveire/dynamic-react-components
```

# How to use this library

This library does not contain React, or React DOM - these must be included in the projects you are running this library with. The reason is that the components will need to be created in the external project, so you will need React to do that there.

## In Your Markup

This is a basic example of a component that is being passed some simple JSON.

```
<dynamic-react-component
	data-component="ReactModuleA"
	data-json="{ \"title\": \"This is the title\", \"description\": \"This is the description\" }">
<dynamic-react-component>
```

**Note:** You can pass any number of `data-` attributes that will get picked up and passed through automatically to your React component props.

Any inner HTML (if any) will be passed under `props._innerHTML`.

## In Your JavaScript

Using the `dynamicReactComponents(options)` is as simple as:

```
import React from 'react'
import { createRoot } from 'react-dom/client'
import { dynamicReactComponents } from '@deveire/dynamic-react-components'

import ReactModuleA from './components/ReactModuleA'
import ReactModuleB from './components/ReactModuleB'

dynamicReactComponents({
  components: {
    ReactModuleA,
    ReactModuleB
  },
  React,
  createRoot,
  selector: 'dynamic-react-component'
})
```

## Example ReactModuleA Code

```
import React from 'react'

export default class ReactModuleA extends React.Component {
  render () {
    const data = JSON.parse(this.props.json)

    return (
      <div className='ReactModuleA'>
        <p>This is a React Module A example</p>
        <p>Here is the JSON: </p>

        <code>
          { this.props.json }
        </code>

        <hr/>

        { data.title &&
          <div className="ReactModuleA-title">{ data.title }</div>
        }
        { data.description &&
          <div className="ReactModuleA-description">{ data.description }</div>
        }
      </div>
    )
  }
}
```

## Options

The following options are available when calling `dynamicReactComponents(options)`:

| Option      | Description |
| ----------- | ----------- |
| components | Object notation of all the components you want dynamically rendered. |
| React | This library requires that you pass in `React`, this is required. |
| createRoot | This library requires that you pass in `createRoot`, this is required. |
| selector | The selector for selecting your dynamic components. This defaults to `dynamic-react-component` but could be anything class based too e.g. `.my-dynamic-react-component` |
| disableLogs  | Logs will show if using localhost or by having `_drc=debug` in the url. Passing `true` for this value will disable most logs. |

## To build and test locally

Clone the repo and `cd` to it followed by running `npm install`.

Then run the build command: `npm run build`

Next is to go to the project you are using the library in and install the locally built version of this library:

`npm install path\to\the\local\repo`
import React from 'react'
import App from './AppRoot'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<App stopwatch={{}} />).toJSON()
  expect(rendered).toBeTruthy()
})

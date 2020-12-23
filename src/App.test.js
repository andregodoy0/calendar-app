import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import App from 'components/App'
import store from 'store'

test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )
    const linkElement = screen.getBy(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})

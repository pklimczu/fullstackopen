import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogEntry from './BlogEntry'

describe('<BlogEntry />', () => {
    let component
    let updateMockHandler

    beforeEach(() => {
        const blogEntry = {
            title: 'test title',
            url: 'http://test.com',
            author: 'Test Author',
            likes: 9
        }

        updateMockHandler = jest.fn()

        component = render(
            <BlogEntry blog={blogEntry} extraEventHandlerForLikesUpdate={updateMockHandler} />
        )
    })


    test('renders blog entry', () => {
        const element = component.getByText('test title')
        expect(element).toBeDefined()

    })

    test('a test which checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
        const div_before = component.container.querySelector('.shownState')
        expect(div_before).toHaveStyle('display: none')

        const button = component.getByText('details')
        fireEvent.click(button)

        const div_after = component.container.querySelector('.shownState')
        expect(div_after).not.toHaveStyle('display: none')
    })

    test('a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(updateMockHandler.mock.calls).toHaveLength(2)
    })
})
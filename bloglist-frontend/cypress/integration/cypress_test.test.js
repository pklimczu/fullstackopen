describe('Blog app', function() {
    beforeEach(function() {
        const baseUrl = 'http://localhost:3001/api'
        cy.request('POST', `${baseUrl}/testing/reset`)

        const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpswd1234'
        }
        cy.request('POST', `${baseUrl}/users`, user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#login_input').type('testuser')
            cy.get('#password_input').type('testpswd1234')

            cy.contains('login').click()
            cy.contains('Logged as')
        })

        it('fails with wrong credentials', function() {
            cy.get('#login_input').type('no_user')
            cy.get('#password_input').type('no_pswd')

            cy.contains('login').click()
            cy.on('window:alert', (msg) => msg === 'Wrong credentials')
        })
    })

    describe('Blog app - when logged in', function() {
        beforeEach(function() {
            const user = {
                username: 'testuser',
                password: 'testpswd1234'
            }
            cy.login(user)
        })

        it('A blog can be created', function() {
            cy.contains('new note form').click()
            cy.get('#title_input').type('title')
            cy.get('#author_input').type('author')
            cy.get('#url_input').type('http://test.com')

            cy.contains('add entry').click()
            cy.contains('title')
        })

        it('A blog can be liked', function() {
            const entry1 = { title: 'title1', author: 'author1', url: 'http://test1.com' }
            cy.createBlogEntry(entry1)

            cy.contains('details').click()
            cy.contains('like').click()
            cy.contains('1 likes')
        })

        it('Blogs are sorted by likes', function() {
            // Tricky test, sorting is checked by liking the second blog and then removing the first one
            // (as the one that should be below the liked one)
            const entry1 = { title: 'title1', author: 'author1', url: 'http://test1.com' }
            const entry2 = { title: 'title2', author: 'author2', url: 'http://test2.com' }
            cy.createBlogEntry(entry1)
            cy.createBlogEntry(entry2)

            cy.get('.showButton').last().click()
            cy.get('.likeButton').last().click()

            cy.get('.showButton').last().click()
            cy.get('.removeButton').last().click()

            cy.contains('title2')
        })
    })
})
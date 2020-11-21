const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithMoreBlogs = [
    { likes: 1, title: 'test 1', author: 'Edmund' },
    { likes: 2, title: 'test 2', author: 'Jane' },
    { likes: 3, title: 'test 3', author: 'Edmund' }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(6)
    })
})

describe('the favorite one', () => {
    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })

    test('when list has only one blog, returns that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.favoriteBlog(listWithMoreBlogs)
        expect(result).toEqual(listWithMoreBlogs[2])
    })
})

describe('the one with most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    })

    test('when list has only one blog, returns author of that blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.mostBlogs(listWithMoreBlogs)
        expect(result).toEqual({ author: 'Edmund', blogs: 2 })
    })
})

describe('the one with most likes in general', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
    })

    test('when list has only one blog, returns author of that blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.mostLikes(listWithMoreBlogs)
        expect(result).toEqual({ author: 'Edmund', likes: 4 })
    })
})
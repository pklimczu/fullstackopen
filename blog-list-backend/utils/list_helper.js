/* eslint-disable no-trailing-spaces */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return list.length === 0 ? 0 : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
    let favorite = null
    let maxLikes = -1

    list.forEach(entry => {
        if (entry.likes > maxLikes) {
            maxLikes = entry.likes
            favorite = entry
        }
    })

    return favorite
}

const mostBlogs = (list) => {
    if (list.length === 0) return null

    var authorStats = {}

    list.forEach(entry => {
        if (entry.author in authorStats) {
            authorStats[entry.author] += 1
        } else {
            authorStats[entry.author] = 1
        }
    })

    var bestAuthor = Object.keys(authorStats)
        .reduce((x, y) => authorStats[x] > authorStats[y] ? x : y)

    return { author: bestAuthor, blogs: authorStats[bestAuthor] }
}

const mostLikes = (list) => {
    if (list.length === 0) return null

    var authorStats = {}

    list.forEach(entry => {
        if (entry.author in authorStats) {
            authorStats[entry.author] += entry.likes
        } else {
            authorStats[entry.author] = entry.likes
        }
    })

    var bestAuthor = Object.keys(authorStats)
        .reduce((x, y) => authorStats[x] > authorStats[y] ? x : y)

    return { author: bestAuthor, likes: authorStats[bestAuthor] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
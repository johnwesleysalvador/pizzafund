export const statsCount = (items, prop) => {
    return items.reduce(function(a, b) {
        return b[prop] === null || b[prop].retweeted_status ? a : a + b[prop]
    }, 0)
}

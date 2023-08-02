module.exports.search_get = (req, res) => {
    res.status(200).json({ response: "Search successful." })
}

module.exports.item_get = (req, res) => {
    res.status(200).json({ response: "Got Item" })
}

module.exports.item_add = (req, res) => {
    res.status(201).json({ response: "Added Item" })
}
module.exports = function MdlTest() {
    return {
        query: 'SELECT * from test limit 1',
        getRandomEvents: 'SELECT * from events limit 10',
        getEventData: 'SELECT title, description, url, price, discount from events INNER JOIN price on price.event_id = events.event_id where events.event_id = ${event_id}',
        getEventsWithLocation: 'SELECT  events.event_id, title, description, image_url FROM events INNER JOIN images on images.event_id = events.event_id WHERE events.destination_id = ${destination_id}'
    }
}
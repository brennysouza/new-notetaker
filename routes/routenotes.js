// Constructor method for routenote class, creates blue print for data saved when made
class routeNote {
    title; text; id;
    constructor(title, text, id = null){
        this.title = title;
        this.text = text;
        this.id = id;
    }
}

module.exports = routeNote;
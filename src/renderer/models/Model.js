import _ from 'lodash'

export default class Model {

    constructor() {
        this.fillable = []
        this.db = null,
        this._id = null,
        this.attributes = {}
    }

    fill(data) {
        _.forEach(this.fillable, key => {
            const value_default = this.attributes[key]
            this[key] = typeof(data[key]) != 'undefined' ? data[key] : value_default
            this.attributes[key] = typeof(data[key]) != 'undefined' ? data[key] : value_default
        })
    }

    save() {
        if(this._id) {
            this.update(this.attributes, (err, numReplaced) => {
                
            })
        } else if(Object.keys(this.attributes).length){
            this.db.insert(this.attributes, (err, item) => {
                if(!err) {
                    this._id = item._id
                }
            })
        }
        
    }

    update(data, completion = null) {
        this.fill(data)
        this.db.update({ _id: this._id}, this.attributes, {}, (err, numReplaced) => { 
            if(completion) {
                completion(err, numReplaced)
            }
        })
    }

    remove(completion = null) {
        this.db.remove({ _id: this._id }, {}, (err, numRemoved) => {
            if(completion) {
                completion(err, numRemoved)
            }
        });
    }

    fetch(completion) {
        this.db.find({}, (err, items) => {
            this.convertDataIfNeed(err, items, completion)
        })
    }

    findById(id, completion) {
        this.db.findOne({ _id: id },  (err, doc) => {
            this.convertDataIfNeed(err, doc, completion)
        });
    }

    convertDataIfNeed(err, items, completion = null) {
        if(err) {
            completion(err, null)
        } else {
            if(Array.isArray(items)) {
                if(!items.length) {
                    completion(err, [])
                    return false
                }
                var result = []
                _.forEach(items, item => {
                    var obj = this.parseRawData(item)
                    result.push(obj)
                })
                completion(err, result)
            } else {
                var obj = this.parseRawData(items)
                completion(err, obj)
            }
        }
    }

    find(condition) {
        return this.db.find(condition)
    }

    parseRawData(item) {
        var obj = new Model()
        obj._id = item._id
        obj.fill(item)
        return obj
    }

    removeAll(completion = null) {
        this.db.remove({}, { multi: true }, (err, numRemoved) => {
			if(completion) {
				completion(err, numRemoved)
			}
		})
    }

    create(data, completion = null) {
        var tmp = {...this.attributes}
        _.forEach(this.fillable, key => {
            tmp[key] = typeof(data[key]) != 'undefined' ? data[key] : tmp[key]
        })
		this.db.insert(tmp, (err, newDoc) => {
            if(completion) {
                completion(err, newDoc)
            }
        })
    }
}
import Model from './Model'
import {todos_db} from '../datastore'
import moment from 'moment'

let default_color = {
	hex: "#AEA1FF",
	rgba: {
		r: 174,
		g: 161,
		b: 255,
		a: 1
	},
}

export default class Todo extends Model {
	constructor() {
		super()
		this.db = todos_db
		this.db.loadDatabase(err => {
			if(err) {
                console.log('todo load error', err)
            }
		})
		this.fillable = [
			'title', 'status', 'color', 'created_at', 'updated_at','start_time','start_date',
			'end_date', 'end_time', 'alert', 'note'
		]
		this.attributes = {
			title: "",
			color: {...default_color},
			start_time: moment().format('HH:mm'),
			start_date: moment().format('YYYY/MM/DD'),
			end_date: moment().format('YYYY/MM/DD'),
			end_time: moment().add(1, 'hour').format('HH:mm'),
			alert: 10,
			note: "",
			status: "new",
			created_at: moment().local().format(),
			updated_at: moment().local().format()
		}
	}

	parseRawData(item) {
        var obj = new Todo()
        obj._id = item._id
        obj.fill(item)
        return obj
	}
}
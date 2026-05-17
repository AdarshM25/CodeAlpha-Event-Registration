const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect(
		'mongodb+srv://adarsh:adarsh123@codealphacluster.hn1hlbh.mongodb.net/?appName=CodeAlphaCluster',
	)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

const EventSchema = new mongoose.Schema({
	title: String,
	date: String,
});

const RegistrationSchema = new mongoose.Schema({
	name: String,
	email: String,
	eventId: String,
});

const Event = mongoose.model('Event', EventSchema);
const Registration = mongoose.model('Registration', RegistrationSchema);

app.post('/events', async (req, res) => {
	const event = new Event(req.body);
	await event.save();
	res.json(event);
});

app.get('/events', async (req, res) => {
	const events = await Event.find();
	res.json(events);
});

app.post('/register', async (req, res) => {
	const registration = new Registration(req.body);
	await registration.save();
	res.json(registration);
});

app.listen(5001, () => {
	console.log('Server running on port 5001');
});

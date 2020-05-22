const chakram = require('chakram'),
	expect = chakram.expect;

describe('Training Course - Create your own web application testing framework using JavaScript', function() {
	const APIurl = 'https://api.unsplash.com/';
	const token = 'J-vHNT7cZE_3CWbTrehbxxALZMOiXKVCjY08AbxD_Y8';

	before(function() {
		chakram.setRequestDefaults({
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
	});

	describe('Scenario 1: Update user location to Vietnam and check if the location is updated correctly', function() {
		let location = 'Vietnam';
		let params = {
			location: location
		};

		it('it should provide status code = 200 and the location is inputted', function() {
			let response = chakram.put(`${APIurl}me`, params);
			return response.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body.location).to.equal(location);
			});
		});
	});

	describe('Scenario 2: Add a random photo to a collection, check if a photo exists in that collection', function() {
		let collectionID = 10478170;
		let photoID = 'Q80sukYa7Nc';
		let params = {
			photo_id: photoID
		};

		it('it should provide status code = 201, the collecton ID and photo ID are correctly', function() {
			let response = chakram.post(`${APIurl}collections/${collectionID}/add`, params);
			return response.then(function(res) {
				expect(res).to.have.status(201);
				expect(res.body.collection.id).to.equal(collectionID);
				expect(res.body.photo.id).to.equal(photoID);
			});
		});
	});

	describe('Scenario 3: Remove a photo from the existing collection', function() {
		let collectionID = 10478170;
		let photoID = 'Q80sukYa7Nc';
		let params = {
			photo_id: photoID
		};

		it('it should provide status code = 200, the photo ID is correctly', function() {
			let response = chakram.delete(`${APIurl}collections/${collectionID}/remove`, params);
			return response.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body.photo.id).to.equal(photoID);
			});
		});
	});

	describe('Scenario 4: Like a photo and verify the number of a photo’s likes are increased by 1', function() {
		let photoID = 'fHLkv5IJrAY';

		it('it should provide status code = 201, the photo ID is correctly', function() {
			return chakram.get(`${APIurl}photos/${photoID}/statistics`).then(function(resq) {
				let response = chakram.post(`${APIurl}photos/${photoID}/like`);
				return response.then(function(res) {
					expect(res).to.have.status(201);
					expect(res.body.photo.likes).to.equal(resq.body.likes.total + 1);
				});
			});
		});
	});

	describe('Scenario 5: Update photo’s exif ISO to 400 and verify results', function() {
		let photoID = 'Q80sukYa7Nc';
		let iso = 400;
		let params = {
			exif: {
				iso: iso
			}
		};

		it('it should provide status code = 200 and the photo’s exif ISO is correctly', function() {
			let response = chakram.put(`${APIurl}photos/${photoID}`, params);
			return response.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body.exif.iso).to.equal(iso);
			});
		});
	});
});

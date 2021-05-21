const DomParser = require('dom-parser');
const parser = new DomParser();
const axios = require('axios').default;
const firebase = require("firebase");
require("firebase/firestore");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

var firebaseConfig = {
	apiKey: "AIzaSyCBkBtVWrWisISnECdMP1LTID5E4xbkTOY",
	authDomain: "covid-resource-314307.firebaseapp.com",
	projectId: "covid-resource-314307",
	storageBucket: "covid-resource-314307.appspot.com",
	messagingSenderId: "1018984797",
	appId: "1:1018984797:web:7ea9197dd31169419bd0b4",
	measurementId: "G-DH7YEELKK5"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const getList = async function(){
	const html = await axios.get('https://stopcorona.tn.gov.in/beds.php')
	const dom = parser.parseFromString(html.data);
	const rows = dom.getElementById('dtBasicExample').getElementsByTagName('tbody')[0].getElementsByTagName('tr')
	if(rows.length > 500){
		// Get a new write batch
	    // let batch = db.batch()

	    // const oldDocs = await db.collection('hospital_locations').get()
	    // oldDocs.forEach((val, index)=>{
	    // 	batch.delete(val.ref)
	    // 	if(index%100===0){
	    // 		batch.commit()
	    // 		batch = db.batch()
	    // 	}
	    // })

	    // await batch.commit()

	    const start = async () => {
		  await asyncForEach(rows, async (row) => {
		    const coloumns = row.getElementsByTagName('td')
			const district = coloumns[0].textContent
			const institution = coloumns[1].textContent
			const covid_beds = {
				total: coloumns[2].textContent,
				occupied: coloumns[3].textContent,
				vacant: coloumns[4].textContent
			}
			const oxygen_supported_beds = {
				total: coloumns[5].textContent,
				occupied: coloumns[6].textContent,
				vacant: coloumns[7].textContent
			}
			const non_oxygen_supported_beds = {
				total: coloumns[8].textContent,
				occupied: coloumns[9].textContent,
				vacant: coloumns[10].textContent
			}
			const icu_beds = {
				total: coloumns[11].textContent,
				occupied: coloumns[12].textContent,
				vacant: coloumns[13].textContent
			}
			const ventilators = {
				total: coloumns[14].textContent,
				occupied: coloumns[15].textContent,
				vacant: coloumns[16].textContent
			}
			const last_updated = new Date(coloumns[17].textContent).valueOf()
			const contact_number = coloumns[18].textContent
			const remarks = coloumns[19].textContent

			let map_address = ""
			let location = {

			}
			let queryScore = 0
			try{
				const reponse = await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+institution+','+district+',Tamilnadu,India&apiKey=em1ObyNzQWLlphqoA3w_80mvXA01LdvRnPU9mec19W4')
				map_address = reponse.data.items[0].address.label
				location = {
					_lat: reponse.data.items[0].position.lat,
					_long: reponse.data.items[0].position.lng
				}
				queryScore = reponse.data.items[0].scoring.queryScore
				cityScore = reponse.data.items[0].scoring.fieldScore.city
				const hospitalData = {
					institution,
					district,
					covid_beds,
					oxygen_supported_beds,
					non_oxygen_supported_beds,
					icu_beds,
					ventilators,
					last_updated,
					contact_number,
					remarks,
					map_address,
					location,
					queryScore,
					cityScore
				}
				await db.collection("hospital_locations").add(hospitalData)
			}
			catch(e){
				console.log(e)
			}
		  });
		  console.log('Done');
		}

		start();
	}
}

getList()
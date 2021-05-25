import * as Realm from 'realm-web'

export default async ({ app }, inject) => {
  const id = 'tncovidresource-wvjzp'
  const config = {
    id,
  }
  const realmApp = new Realm.App(config)
  const credentials = Realm.Credentials.apiKey(
    'An0lsNjTyVQtGNOJ1mD9EdKWYKeeTbMIM8H8R1dG2AKMzx1b9fSgG72iv67C7pFF'
  )
  await realmApp.logIn(credentials).then(function () {})
  const mongodb = realmApp.currentUser.mongoClient('mongodb-atlas')
  const hospitalCollection = mongodb
    .db('covidresource')
    .collection('tn_hospital_locations')
  inject('db', hospitalCollection)
  inject('realm', realmApp)
}

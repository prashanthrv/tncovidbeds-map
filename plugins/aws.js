import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'

export default ({ app }, inject) => {
  const dbClient = new DynamoDB({
    region: 'ap-south-1',
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: 'ap-south-1' }),
      identityPoolId: 'ap-south-1:c249d252-5b9d-46dc-9010-96aebbb736dd',
      logins: {
        // Optional tokens, used for authenticated login.
      },
    }),
  })
  inject('dbClient', dbClient)
}

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import {
  AsyncStorage
} from 'react-native'
import { WHOSDOWN_TOKEN_KEY, API_URL } from '../constants'

async function fetchQuery(
  operation,
  variables,
) {
  const token = await AsyncStorage.getItem(WHOSDOWN_TOKEN_KEY)
  return fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token},`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
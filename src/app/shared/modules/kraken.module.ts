import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

let uri = '';
export function createApollo(httpLink: HttpLink) {
  const accessToken = localStorage.getItem('access_token');
  const headers = new HttpHeaders().append('Authorization', `Bearer ${accessToken}`);

  return {
    link: httpLink.create({ uri, headers }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class KrakenModule {
  constructor() {
    uri = environment.apiUrl + '/krakenql/schema';
  }
}

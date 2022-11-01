import { Injectable, Inject } from '@angular/core';

import { HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';

type endpoints = '/krakenql/public' |
    '/krakenql/schema' |
    '/api-reserva/schema' |
    '/api-meus-pagamentos/schema' |
    '/api-mgm-indique-ganhe/schema';
const clients = [
    {
        name: 'krakenql',
        endpoint: '/krakenql/schema',
        host: environment.apiUrl,
        requireAuthorization: true
    },
    {
        name: 'krakenql-public',
        host: environment.apiUrl,
        endpoint: '/krakenql/public',
        requireAuthorization: false
    },
    {
        name: 'api-reserva',
        host: environment.urlApiReserva,
        endpoint: '/api-reserva/schema',
        requireAuthorization: true
    },
    {
        name: 'api-meus-pagamentos',
        host: environment.urlApiMeusPagamentos,
        endpoint: '/api-meus-pagamentos/schema',
        requireAuthorization: true
    },
    {
        name: 'api-mgm-indique-ganhe',
        host: environment.urlApiMgm,
        endpoint: '/api-mgm-indique-ganhe/schema',
        requireAuthorization: true
    }
];

@Injectable({
    providedIn: 'root'
})
export class ApolloService {

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink
    ) {
    }

    createClient(endpoint: endpoints) {
        const client = clients.find(x => x.endpoint === endpoint);
        this.removeApolloClient(client.name);

        const defaultOptions: DefaultOptions = {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        };
        const headers = this.createHeaders(client.requireAuthorization);

        const apolloParams = {
            cache: new InMemoryCache(),
            link: this.httpLink.create({ uri: client.host + endpoint, headers }),
            defaultOptions
        };

        try {
            if (!client.name) {
                this.apollo.createDefault(apolloParams);
            } else {
                this.apollo.create(apolloParams, client.name);
            }
            return client.name ? this.apollo.use(client.name) : this.apollo.default();
        } catch (error) {
            console.error('Booking - Falha ao criar Apollo Client', error);
            throw error;
        }
    }

    removeApolloClient(name: string = '') {
        if (!name && this.apollo.default()) {
            this.apollo.removeClient();
        }
        if (this.apollo.use(name)) {
            this.apollo.removeClient(name);
        }
    }

    private createHeaders(includeAuthorization): HttpHeaders {
        const accessToken = localStorage.getItem('access_token');
        if (includeAuthorization && accessToken) {
            return new HttpHeaders().append('Authorization', `Bearer ${accessToken}`);
        }
        return null;
    }
}

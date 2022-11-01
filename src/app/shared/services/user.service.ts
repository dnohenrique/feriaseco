import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apollo;
  constructor(private apolloService: ApolloService) {
  }

  public getUserNameById(id: string): any {
    this.apollo = this.apolloService.createClient('/krakenql/schema');
    return this.apollo.query({
      query: gql`query ($id: ID!) {
          user(id: $id){
            nome
            email
            dataConfirmacaoEmail
          }
        }`,
      variables: { id }
    }).toPromise();
  }


}

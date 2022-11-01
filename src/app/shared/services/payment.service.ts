import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apollo;
  constructor(private apolloService: ApolloService) {
  }

  async getPaymentStatus(cpf: string) {
    try {
      this.apollo = this.apolloService.createClient('/api-meus-pagamentos/schema');
      const response: any = await this.apollo.query({
        query: gql`query getMyPayments($cpf: String!){
          getMyPayments(cpf: $cpf
          ){
            temPendencia, 
            alertas { 
             vencimento, 
             referencia, 
             valor, 
             situacao
            }
          }                                                 
        }`,
        variables: { cpf }
      }).toPromise();
      return response.data.getMyPayments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

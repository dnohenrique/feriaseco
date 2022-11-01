import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class MgmService {
  private apollo;
  constructor(private apolloService: ApolloService) {
  }

  async consultarSePodeVerIndiqueGanhe(cnpj: string = '', cpf: string = '') {
    try {
      this.apollo = this.apolloService.createClient('/api-mgm-indique-ganhe/schema');
      const response: any = await this.apollo.query({
        query: gql`query consultarSePodeVerIndiqueGanhe(
                      $cnpj: String,
                      $cpf: String) {
                      consultarSePodeVerIndiqueGanhe(
                          cnpj: $cnpj,
                          cpf: $cpf) {
                        result {
                          acessar
                          indicar
                        }
                      }
                    }`,
        variables: { cnpj, cpf }
      }).toPromise();
      return response.data.consultarSePodeVerIndiqueGanhe;
    } catch (error) {
      console.error(error);
    }
  }
}

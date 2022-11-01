import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apollo;
  constructor(private apolloService: ApolloService) {
  }

  collaboratorAllCompanies(cpf: string): any {
    const escopo = 1; // Portal Colaborador / RH
    const publicApolloClient = this.apolloService.createClient('/krakenql/public');
    return publicApolloClient.query({
      query: gql`query ($cpf: String!, $escopo: Int!) {
        collaboratorAllCompanies(cpf: $cpf, escopo: $escopo){
          cnpjs
        }
      }`,
      variables: { cpf, escopo }
    }).toPromise();
  }

  public getColaboradorById(id: string): any {
    this.apollo = this.apolloService.createClient('/krakenql/schema');
    return this.apollo.query({
      query: gql`query ($id: String!) {
          collaborator(id: $id){
            id
            nome
            emailPessoal
            emailCorporativo
            empresa {
              descontoFolha
            }
            plano {
              contaGratuita
              dataAdesao
              tipoPlano
              diariasDisponiveis
              fingerprint {
                termoUso
                termoMgm
              }
            }
            carteira {
              pontos {
                saldo
              }
            }
          }
        }`,
      variables: { id },
      fetchPolicy: 'network-only'
    }).toPromise();
  }

  public getColaboradorByCpfCnpj(cpf: string, cnpj: string): any {
    this.apollo = this.apolloService.createClient('/krakenql/schema');
    return this.apollo.query({
      query: gql`query ($cpf: String!, $cnpj: String!) {
        collaboratorByCpfCnpj(cpf: $cpf, cnpj: $cnpj){
            id
            nome
            emailPessoal
            plano {
              dataAdesao
              tipoPlano
              diariasTotais
              diariasDisponiveis
              fingerprint {
                termoUso
                termoMgm
              }
            }
            carteira {
              pontos {
                saldo
              }
            }
          }
        }`,
      variables: { cpf, cnpj },
      fetchPolicy: 'network-only'
    }).toPromise();
  }

  public getPontosNotificacao(userId: string): any {
    this.apollo = this.apolloService.createClient('/api-reserva/schema');
    return this.apollo.query({
      query: gql`query ($userId: String!) {
        getNewPointsNotification(userId: $userId){
          status
          notification {
            amount
            pointsAccumulation {
              id
            }
          }
          }
        }`,
      variables: { userId },
      fetchPolicy: 'network-only'
    }).toPromise();
  }

  async putPontosNotificacao(input: any) {
    try {
      this.apollo = this.apolloService.createClient('/api-reserva/schema');
      const response: any = await this.apollo.mutate({
        mutation: gql`mutation($input: notificationPut!) {
                  updateNewPointsNotification(input: $input)
                }`,
        variables: { input }
      }).toPromise();

      return {
        error: false,
        message: response.data
      };
    } catch (error) {
      console.error('error:', error);
      return {
        error: true
      };
    }
  }

  async getPaymentType(cnpj: string, cpf: string) {
    const limit = 4;
    const offset = 0;
    try {
      this.apollo = this.apolloService.createClient('/krakenql/schema');
      const response: any = await this.apollo.query({
        query: gql`query collaboratorsByCompanyFilterCpf($cnpj: String!, $limit: Int!, $offset: Int!, $cpf: String!) {
                collaboratorsByCompanyFilterCpf(cnpj: $cnpj, limit: $limit, offset: $offset, cpf: $cpf) {
                    colaboradores{
                        nome
                        cpf
                        celular
                        empresa{
                          descontoFolha
                        }
                    }
                }
              }`,
        variables: { cnpj, limit, offset, cpf }
      }).toPromise();
      return response.data.collaboratorsByCompanyFilterCpf;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
// tslint:disable-next-line:max-file-line-count
}

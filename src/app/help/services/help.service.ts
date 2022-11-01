import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Answer } from '../models/answer';
import { HttpClient } from '@angular/common/http';
import { MessageModel } from '../models/message-model';
import { ApolloService } from 'src/app/shared/services/apollo.service';

@Injectable({
    providedIn: 'root'
})
export class HelpService {

    private helpMessageUrl: string;
    private apollo;

    constructor(
        private http: HttpClient,
        private apolloService: ApolloService
    ) {
        this.helpMessageUrl = environment.helpMessageApi + '/case';
        this.apollo = this.apolloService.createClient('/krakenql/schema');
    }

    async getSubjects(): Promise<any> {
        const resp: any = await this.apollo.query({
            query: gql`query {
                knowledges(filter : ""){
                    theme
                }
            }`
        }).toPromise();
        if (resp.data && resp.data.knowledges) {
            const allThemes = resp.data.knowledges.map((value) => value.theme);
            const themesUnique = allThemes.filter(this.onlyUnique);
            return themesUnique.map((value, index) => {
                return { id: index.toString(), title: value, active: false };
            });
        }
        return null;
    }

    async getKnowledge(filter: string = ''): Promise<Answer[]> {
        filter = filter.split(' ').join('_');
        const resp: any = await this.apollo.query({
            query: gql`query ($filter: String) {
            knowledges(filter : $filter){
                theme,
                question,
                answer
            }
        }`,
            variables: { filter }
        }).toPromise();

        if (resp.data && resp.data.knowledges) {
            const knowledges = resp.data.knowledges.map((value, index) => {
                return {
                    id: index,
                    answer: this.stripAllHtml(value.answer),
                    question: this.stripAllHtml(value.question),
                    collapsed: false,
                    theme: value.theme
                };
            });
            return knowledges;
        }
        return null;
    }

    async sendMessage(body: MessageModel) {
        try {
            const userInfo = await this.getUserInfo();
            Object.assign(body, {
                name: userInfo.user.nome,
                email: userInfo.user.email
            });
            const response: any = await this.http.post(this.helpMessageUrl, body).toPromise();

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    private async getUserInfo() {
        const id = sessionStorage.getItem('sub');
        const resp: any = await this.apollo.query({
            query: gql`query($id: ID!) {
                user(id: $id) {
                  nome,
                  email
                }
              }`,
            fetchPolicy: 'network-only',
            variables: { id }
        }).toPromise();
        return resp.data;
    }

    private onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    private stripAllHtml(str) {
        if (!str || !str.length) {
            return '';
        }

        str = str.replace(/<script.*?>.*?<\/script>/igm, '');
        const tmp = document.createElement('DIV');
        tmp.innerHTML = str;
        return tmp.textContent || tmp.innerText || '';
    }

}

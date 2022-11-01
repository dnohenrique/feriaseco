import { environment } from 'src/environments/environment';
import { chatStyleMock  } from './chatStyleMock';

const {
  initMySalesForceUrl,
  initSalesforceUrl,
  orgId,
  baseLiveAgentContentURL,
  baseLiveAgentURL,
  embeddedService,
} = environment.help.chat;

export const getChatScriptMock = () => {
  const cpf = sessionStorage.getItem('xdc');
  const firstName = sessionStorage.getItem('firstName');
  return [
    {
      htmlTag: 'script',
      attribute: { name: 'type', value: 'text/javascript' },
      innerHTML: `
        var initESW = function (gslbBaseURL) {
            embedded_svc.settings.displayHelpButton = true; //Ou falso
            embedded_svc.settings.language = 'pt-BR'; //Por exemplo, insira "pt" ou "pt-BR"
            //Adicionar esse script abaixo
            embedded_svc.settings.extraPrechatInfo = [{
              "entityFieldMaps": [{
                "doCreate": false,
                "doFind": false,
                "fieldName": "LastName",
                "isExactMatch": true,
                "label": "Sobrenome"
              }, {
                "doCreate": false,
                "doFind": false,
                "fieldName": "FirstName",
                "isExactMatch": true,
                "label": "Nome"
              }, {
                "doCreate": false,
                "doFind": false,
                "fieldName": "Email",
                "isExactMatch": true,
                "label": "Email"
              }, {
                "doCreate": false,
                "doFind": true,
                "fieldName": "CPF__c",
                "isExactMatch": true,
                "label": "CPF"
              }],
              "entityName": "Contact"
            }];
            embedded_svc.settings.extraPrechatFormDetails = [{
              "label": "Nome",
              "name": "FirstName",
              "value": "${firstName}", //preencher com o usuário logado
              "displayToAgent": true
            }, {
              "label": "CPF",
              "name": "CPF__c",
              "value": "${cpf}", //preencher com o usuário logado
              "displayToAgent": true
            }
          ];


            embedded_svc.settings.defaultMinimizedText = 'Atendente online'; //(Assume como padrão o Chat com um especialista)
            embedded_svc.settings.disabledMinimizedText = 'Inativo'; //(Assume como padrão Agente off-line)

            embedded_svc.settings.loadingText = 'Carregando'; //(Assume como padrão Carregando)
            //embedded_svc.settings.storageDomain = 'yourdomain.com';
            //(Define o domínio de sua implantação para que seus visitantes possam navegar em subdomínios durante uma sessão de chat)

            // Configurações para Chat
            //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
            // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
            // Returns a valid button ID.
            //};
            //embedded_svc.settings.prepopulatedPrechatFields = {}; //Define o preenchimento automático de campos de formulário de pré-chat
            //embedded_svc.settings.fallbackRouting = []; //Uma matriz de IDs de botão, IDs de usuário ou userId_buttonId
            //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Padronizado para Entre em contato conosco)

            embedded_svc.settings.enabledFeatures = ['LiveAgent'];
            embedded_svc.settings.entryFeature = 'LiveAgent';

            embedded_svc.init(
              '${initMySalesForceUrl}',
              '${initSalesforceUrl}',
              gslbBaseURL,
              '${orgId}',
              'Feris_CO',
              {
                baseLiveAgentContentURL: '${baseLiveAgentContentURL}',
                deploymentId: '5724P0000004HBj',
                buttonId: '5734P0000004HzV',
                baseLiveAgentURL: '${baseLiveAgentURL}',
                eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I4P000000008tUAA_16ef4e949fc',
                isOfflineSupportEnabled: false
              }
            );
          };

          if (!window.embedded_svc) {
            var s = document.createElement('script');
            s.setAttribute('src', '${embeddedService}');
            s.onload = function() {
              initESW(null);
            };
            document.body.appendChild(s);
          } else {
            initESW('https://service.force.com');
          }
    `
    }, {
      htmlTag: 'style',
      attribute: { name: 'type', value: 'text/css' },
      innerHTML: chatStyleMock
    }
  ];
};

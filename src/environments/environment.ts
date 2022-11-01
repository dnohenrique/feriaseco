import { Chat } from './../app/help/models/chat';

let chatVariables: Chat = {
  initMySalesForceUrl: 'https://feriasco--beedev.my.salesforce.com',
  initSalesforceUrl: 'https://beedev-feriasco.cs45.force.com/',
  orgId: '00D8A000000Az25',
  deploymentId: '5724P0000004HBj',
  buttonAvailabilityId: '5734P0000004HzV',
  baseLiveAgentContentURL: 'https://c.la2-c1cs-ph2.salesforceliveagent.com/content',
  baseLiveAgentURL: 'https://d.la2-c1cs-ph2.salesforceliveagent.com/chat',
  embeddedService: 'https://feriasco--beedev.my.salesforce.com/embeddedservice/5.0/esw.min.js',
  liveAgentApiVersion: '48'
};

let environment = {
  name: 'dev',
  production: false,
  logoCompanyURL: 'https://fc-bkt-hml-crm-attachments-public.s3.amazonaws.com/',
  urlAvailabilityApi: 'http://localhost:32315/v1/',
  // urlAvailabilityApi: 'http://api-proxy-staging.platform.ferias.in/v1/',
  urlBookingApi: 'http://localhost:32316/v1/',
  urlApiDisponibilidade: 'http://localhost:32608',
  // urlApiDisponibilidade: 'http://api-proxy-staging.platform.ferias.in',
  // urlApiReserva: 'http://localhost:32609',
  urlApiReserva: 'http://api-proxy-staging.platform.ferias.in',
  urlApiMeusCartoes: 'http://localhost:32700',
 // urlApiMeusPagamentos: 'http://localhost:32701',
  urlApiMeusPagamentos: 'http://api-proxy-staging.platform.ferias.in',
  urlApiKraken: 'http://localhost:32603',
  apiUrl: 'http://api-proxy-staging.platform.ferias.in',
  urlApiMgm: 'http://localhost:32705',
  apiUrlAssinaturas: 'http://localhost:32612',
  authURL: 'http://api-proxy-staging.platform.ferias.in',
  client_id: '023a35e141fb4925a258ff71dd16f7fc',
  client_secret: '4d8b9a579c504a9e97c0e6aca9f220f5',
  originHost: 'portal-colaborador',
  helpMessageApi: 'https://or8obdbezd.execute-api.us-east-1.amazonaws.com/dev',
  urlIp: 'http://api-proxy-staging.platform.ferias.in/ip?format=json',
  urlRedirectDetail: 'home/detail',
  urlRedirectList: 'home/list/',
  fcStyles: 'http://css-styleguide-staging.platform.ferias.in/styles/main.css',
  kondutoKey: 'T26F7FE0052',
  portalAssinante: 'http://webapp-hotsite-staging.platform.ferias.in/#/login',
  help: {
    chat: chatVariables,
    whatsapp: '+55 11 94355-0551'
  },
};

if (window.location.origin === 'http://localhost:32802') {
  chatVariables = {
    initMySalesForceUrl: 'https://feriasco--beedev.my.salesforce.com',
    initSalesforceUrl: 'https://beedev-feriasco.cs45.force.com/',
    orgId: '00D8A000000Az25',
    deploymentId: '5724P0000004HBj',
    buttonAvailabilityId: '5734P0000004HzV',
    baseLiveAgentContentURL: 'https://c.la2-c1cs-ph2.salesforceliveagent.com/content',
    baseLiveAgentURL: 'https://d.la2-c1cs-ph2.salesforceliveagent.com/chat',
    embeddedService: 'https://feriasco--beedev.my.salesforce.com/embeddedservice/5.0/esw.min.js',
    liveAgentApiVersion: '48'
  };

  environment = {
    name: 'dev',
    production: false,
    logoCompanyURL: 'https://fc-bkt-hml-crm-attachments-public.s3.amazonaws.com/',
    urlAvailabilityApi: 'http://localhost:8080/v1/',
    urlBookingApi: 'http://localhost:8080/v1/',
    urlApiDisponibilidade: 'http://localhost:8080',
    urlApiReserva: 'http://localhost:8080',
    urlApiMeusCartoes: 'http://localhost:8080',
    urlApiMeusPagamentos: 'http://localhost:8080',
    urlApiKraken: 'http://localhost:8080',
    apiUrl: 'http://localhost:8080',
    urlApiMgm: 'http://localhost:8080',
    apiUrlAssinaturas: 'http://localhost:8080',
    authURL: 'http://localhost:8080',
    client_id: '023a35e141fb4925a258ff71dd16f7fc',
    client_secret: '4d8b9a579c504a9e97c0e6aca9f220f5',
    originHost: 'portal-colaborador',
    helpMessageApi: 'https://or8obdbezd.execute-api.us-east-1.amazonaws.com/dev',
    urlIp: 'http://api-proxy-staging.platform.ferias.in/ip?format=json',
    urlRedirectDetail: 'home/detail',
    urlRedirectList: 'home/list/',
    fcStyles: 'http://css-styleguide-staging.platform.ferias.in/styles/main.css',
    kondutoKey: 'T26F7FE0052',
    portalAssinante: 'http://webapp-hotsite-staging.platform.ferias.in/#/login',
    help: {
      chat: chatVariables,
      whatsapp: '+55 11 94355-0551'
    },
  };
}

if (window.location.origin === 'http://webapp-colaborador-staging.platform.ferias.in') {
  chatVariables = {
    initMySalesForceUrl: 'https://feriasco--beedev.my.salesforce.com',
    initSalesforceUrl: 'https://beedev-feriasco.cs45.force.com/',
    orgId: '00D8A000000Az25',
    deploymentId: '5724P0000004HBj',
    buttonAvailabilityId: '5734P0000004HzV',
    baseLiveAgentContentURL: 'https://c.la2-c1cs-ph2.salesforceliveagent.com/content',
    baseLiveAgentURL: 'https://d.la2-c1cs-ph2.salesforceliveagent.com/chat',
    embeddedService: 'https://feriasco--beedev.my.salesforce.com/embeddedservice/5.0/esw.min.js',
    liveAgentApiVersion: '48'
  };

  environment = {
    name: 'dev',
    production: true,
    logoCompanyURL: 'https://fc-bkt-hml-crm-attachments-public.s3.amazonaws.com/',
    urlAvailabilityApi: 'http://api-proxy-staging.platform.ferias.in/v1/',
    urlBookingApi: 'http://api-proxy-staging.platform.ferias.in/v1/',
    urlApiDisponibilidade: 'http://api-proxy-staging.platform.ferias.in',
    urlApiReserva: 'http://api-proxy-staging.platform.ferias.in',
    urlApiMeusCartoes: 'http://api-proxy-staging.platform.ferias.in',
    urlApiMeusPagamentos: 'http://api-proxy-staging.platform.ferias.in',
    urlApiKraken: 'http://api-proxy-staging.platform.ferias.in',
    apiUrl: 'http://api-proxy-staging.platform.ferias.in',
    urlApiMgm: 'http://api-proxy-staging.platform.ferias.in',
    apiUrlAssinaturas: 'http://api-proxy-staging.platform.ferias.in',
    authURL: 'http://api-proxy-staging.platform.ferias.in',
    client_id: '023a35e141fb4925a258ff71dd16f7fc',
    client_secret: '4d8b9a579c504a9e97c0e6aca9f220f5',
    originHost: 'portal-colaborador',
    helpMessageApi: 'https://or8obdbezd.execute-api.us-east-1.amazonaws.com/hml',
    urlIp: 'http://api-proxy-staging.platform.ferias.in/ip?format=json',
    urlRedirectDetail: 'home/detail',
    urlRedirectList: 'home/list/',
    fcStyles: 'http://css-styleguide-staging.platform.ferias.in/styles/main.css',
    kondutoKey: 'T26F7FE0052',
    portalAssinante: 'http://webapp-hotsite-staging.platform.ferias.in/#/login',
    help: {
      chat: chatVariables,
      whatsapp: '+55 11 94355-0551'
    }
  };

}

if (window.location.origin === 'http://webapp-colaborador-production.platform.ferias.in') {
  chatVariables = {
    initMySalesForceUrl: 'https://feriasco.my.salesforce.com',
    initSalesforceUrl: 'https://feriasco.force.com',
    orgId: '00D4P000000y3OE',
    deploymentId: '5724P0000004HBj',
    buttonAvailabilityId: '5734P0000004HzV',
    baseLiveAgentContentURL: 'https://c.la3-c1-ia2.salesforceliveagent.com/content',
    baseLiveAgentURL: 'https://d.la3-c1-ia2.salesforceliveagent.com/chat',
    embeddedService: 'https://feriasco.my.salesforce.com/embeddedservice/5.0/esw.min.js',
    liveAgentApiVersion: '48'
  };

  environment = {
    name: 'prod',
    production: true,
    logoCompanyURL: 'https://fc-bkt-prd-crm-attachments-public.s3.amazonaws.com/',
    urlAvailabilityApi: 'http://api-proxy-production.platform.ferias.in/v1/',
    urlBookingApi: 'http://api-proxy-production.platform.ferias.in/v1/',
    urlApiDisponibilidade: 'http://api-proxy-production.platform.ferias.in',
    urlApiReserva: 'http://api-proxy-production.platform.ferias.in',
    urlApiMeusCartoes: 'http://api-proxy-production.platform.ferias.in',
    urlApiMeusPagamentos: 'http://api-proxy-production.platform.ferias.in',
    urlApiKraken: 'http://api-proxy-production.platform.ferias.in',
    apiUrl: 'http://api-proxy-production.platform.ferias.in',
    urlApiMgm: 'http://api-proxy-production.platform.ferias.in',
    apiUrlAssinaturas: 'http://api-proxy-production.platform.ferias.in',
    authURL: 'http://api-proxy-production.platform.ferias.in',
    client_id: '023a35e141fb4925a258ff71dd16f7fc',
    client_secret: '4d8b9a579c504a9e97c0e6aca9f220f5',
    originHost: 'portal-colaborador',
    helpMessageApi: 'https://or8obdbezd.execute-api.us-east-1.amazonaws.com/prd',
    urlIp: 'http://api-proxy-production.platform.ferias.in/ip?format=json',
    urlRedirectDetail: 'home/detail',
    urlRedirectList: 'home/list/',
    fcStyles: 'http://css-styleguide-production.platform.ferias.in/styles/main.css',
    kondutoKey: 'P512DD9580B',
    portalAssinante: 'https://assinante.ferias.co/',
    help: {
      chat: chatVariables,
      whatsapp: '+55 11 97095-8791'
    }
  };
}

if (window.location.origin === 'https://colaborador.ferias.co') {
  chatVariables = {
    initMySalesForceUrl: 'https://feriasco.my.salesforce.com',
    initSalesforceUrl: 'https://feriasco.force.com',
    orgId: '00D4P000000y3OE',
    deploymentId: '5724P0000004HBj',
    buttonAvailabilityId: '5734P0000004HzV',
    baseLiveAgentContentURL: 'https://c.la3-c1-ia2.salesforceliveagent.com/content',
    baseLiveAgentURL: 'https://d.la3-c1-ia2.salesforceliveagent.com/chat',
    embeddedService: 'https://feriasco.my.salesforce.com/embeddedservice/5.0/esw.min.js',
    liveAgentApiVersion: '48'
  };

  environment = {
    name: 'prod',
    production: true,
    logoCompanyURL: 'https://fc-bkt-prd-crm-attachments-public.s3.amazonaws.com/',
    urlAvailabilityApi: 'https://api.ferias.co/v1/',
    urlBookingApi: 'https://api.ferias.co/v1/',
    urlApiDisponibilidade: 'https://api.ferias.co',
    urlApiReserva: 'https://api.ferias.co',
    urlApiMeusCartoes: 'https://api.ferias.co',
    urlApiMeusPagamentos: 'https://api.ferias.co',
    urlApiKraken: 'https://api.ferias.co',
    apiUrl: 'https://api.ferias.co',
    urlApiMgm: 'https://api.ferias.co',
    apiUrlAssinaturas: 'https://api.ferias.co',
    authURL: 'https://api.ferias.co',
    client_id: '023a35e141fb4925a258ff71dd16f7fc',
    client_secret: '4d8b9a579c504a9e97c0e6aca9f220f5',
    originHost: 'portal-colaborador',
    helpMessageApi: 'https://or8obdbezd.execute-api.us-east-1.amazonaws.com/prd',
    urlIp: 'https://api.ferias.co/ip?format=json',
    urlRedirectDetail: 'home/detail',
    urlRedirectList: 'home/list/',
    fcStyles: 'https://css-styleguide.ferias.co/styles/main.css',
    kondutoKey: 'P512DD9580B',
    portalAssinante: 'https://assinante.ferias.co/',
    help: {
      chat: chatVariables,
      whatsapp: '+55 11 97095-8791'
    }
  };
}

// tslint:disable-next-line:max-file-line-count
export { environment };
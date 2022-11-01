// tslint:disable: max-file-line-count
// Desabilitado TSLINT para arquivo pois se trata de um mock em uma string muito grande
export const chatStyleMock = `
.embeddedServiceSidebarExtendedHeader {
  background-color: #535252;
}
.embeddedServiceSidebar.modalContainer {
  font-family: Roboto;
}

.embeddedServiceHelpButton .helpButton {
  right: 20px;
}
.embeddedServiceHelpButton .helpButton .uiButton {
  background-color: #00b0b0;
  font-family: Roboto;
}
.embeddedServiceHelpButton .helpButton .uiButton:focus {
  outline: none;
}

.helpButtonEnabled:focus .helpButtonLabel {
  text-decoration: none;
}

.embeddedServiceSidebarButton {
  background-color: #00b0b0;
}

.embeddedServiceSidebarButton:focus {
  text-decoration: none;
}

.embeddedServiceSidebarButton.uiButton--inverse .label {
  color: #00b0b0;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.embeddedServiceSidebarHeader {
  background-color: #535252;
}

.embeddedServiceSidebarFormField .uiInput .uiLabel-left {
  margin-left: 0;
  font-size: 1rem;
}

.embeddedServiceHelpButton .helpButton .helpButtonDisabled {
  background-color: #dcdcdc;
  color: #a8a8a8;
}
.embeddedServiceHelpButton .helpButton .helpButtonDisabled:focus {
  outline: 0;
}

/** BOTÃO INICIAR CHAT **/
.embeddedServiceSidebarButton:not(:disabled):focus,
.embeddedServiceSidebarButton:not(:disabled):hover {
  background-color: #00b0b0;
}
.embeddedServiceSidebarButton:not(:disabled):active,
.embeddedServiceSidebarButton:not(:disabled):active {
  background-color: #007d7d;
}
.embeddedServiceSidebarButton:not(:disabled):hover,
.embeddedServiceSidebarButton:not(:disabled):hover {
  background-color: #009797;
}

/** Bolinhas carregando **/
.embeddedServiceLiveAgentQueuePosition .embeddedServiceLoadingBalls .loadingBall {
  background-color: #535252;
}

/** FORM SELECT **/

.embeddedServiceSidebarFormField .slds-style-select {
  cursor: pointer;
}

.embeddedServiceSidebarFormField .uiInputSelect:after {
  border-top: 7px solid #535252;
}

.embeddedServiceSidebarFormField .slds-style-inputtext,
.embeddedServiceSidebarFormField .slds-style-select {
  color: #535252;
  font-family: "Roboto";
}

.embeddedServiceSidebarFormField .slds-style-inputtext:focus,
.embeddedServiceSidebarFormField .slds-style-select:focus {
  box-shadow: none;
  outline: none;
  border: 1px solid #00B0B0;
}

/** BOTAO MINIMIZADO **/
.embeddedServiceSidebarMinimizedDefaultUI {
  border-color: transparent;
  background-color: #00B0B0;
}
.embeddedServiceSidebarMinimizedDefaultUI.helpButton {
  background-color: #00b0b0;
  border-color: transparent;
}

.embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer:hover {
  background-color: #018a8a;
}
.embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer:focus {
  background-color: #00B0B0;
  text-decoration: none;
}
.embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer:active {
  background-color: #007d7d;
  text-decoration: none;
}

/** BOTAO ESTA AI **/
.embeddedServiceSidebarMinimizedDefaultUI.idleTimeout,
.embeddedServiceSidebarMinimizedDefaultUI.newMessage {
  background-color: #f9b508;
}

.embeddedServiceSidebarMinimizedDefaultUI.idleTimeout:hover,
.embeddedServiceSidebarMinimizedDefaultUI.newMessage:hover {
  background-color: #e2a405;
}
.embeddedServiceSidebarMinimizedDefaultUI.idleTimeout:active,
.embeddedServiceSidebarMinimizedDefaultUI.newMessage:active {
  background-color: #c99205;
}


/** CHAT HEADER NA CONVERSA **/
.embeddedServiceLiveAgentStateChatHeader .content {
  height: 165px;
}
.embeddedServiceLiveAgentStateChatHeaderOption:focus {
  text-decoration: none;
}
.embeddedServiceLiveAgentStateChatHeaderOption:active {
  text-decoration: none;
}
.embeddedServiceLiveAgentStateChatHeaderOption:hover {
  color: white;
}
.embeddedServiceLiveAgentStateChatHeaderOption.chatOption:focus:after {
  border: 1px solid white;
}
.embeddedServiceLiveAgentStateChatHeader .message {
  padding: 0 30px;
}
.embeddedServiceLiveAgentStateChatHeader:not(.alert) .message {
  white-space: normal;
}

.embeddedServiceLiveAgentStateChat .messageArea:focus {
  border: none;
}

/** CHAT TEXTO **/

.embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.chasitor.plaintextContent {
  background: #00b0b0;
}
.embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.agent.plaintextContent {
  background-color: #f9f9f9;
  border: solid 1px #dcdcdc;
}

.embeddedServiceLiveAgentStateChatEventMessage .eventMessage>.uiOutputRichText {
  padding: 0;
  white-space: normal;
}

.embeddedServiceLiveAgentStateChat .endChatContainer .endChatButton.postChatButton {
  border: 1px solid #535252;
}

/** AVATAR **/
.embeddedServiceLiveAgentStateChatAvatar.isLightningOutContext .agentIconColor0 {
  background-color: #f9b508;
}

/** INPUT MENSAGEM FOOTER **/

.embeddedServiceLiveAgentStateChatInputFooter .chasitorText.textAreaIsFocused {
  border-color: #00b0b0;
}
.embeddedServiceLiveAgentStateChatInputFooter .chasitorText {
  font-family: 'Roboto';
}

`;

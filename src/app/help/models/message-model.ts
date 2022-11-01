export class MessageModel {
    orgid: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    description: string;
    company: string;
    type: string;
    status: string;
    reason: string;
    assunto: string;

    constructor(obj: any) {
        const cpf = sessionStorage.getItem('xdc');

        Object.assign(this, {
            orgid: '00D4P000000y3OE',
            cpf,
            name: obj.name,
            email: obj.name,
            phone: obj.phome,
            subject: obj.subject,
            description: obj.description,
            type: obj.type,
            status: 'Novo',
            reason: obj.reason,
            assunto: obj.subject,
            recordType: '0124P000000EOC4'
        });
    }
}

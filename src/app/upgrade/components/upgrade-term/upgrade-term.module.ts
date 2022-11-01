import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { UpgradeTermComponent } from './upgrade-term.component';
import { TermModule } from 'src/app/term/term.module';



const routes: Routes = [
    { path: '', component: UpgradeTermComponent }
];

@NgModule({
    declarations: [
        UpgradeTermComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ModalModule.forRoot(),
        TermModule
    ],
    exports: []
})
export class UpgradeTermModule { }

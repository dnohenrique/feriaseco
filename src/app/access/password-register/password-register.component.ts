import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-register',
  templateUrl: './password-register.component.html',
  styleUrls: ['./password-register.component.scss']
})
export class PasswordRegisterComponent implements OnInit {

  token = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  setActionEvent(action) {
    if (action === 'login') {
      this.router.navigate(['login']);
    }
  }

}

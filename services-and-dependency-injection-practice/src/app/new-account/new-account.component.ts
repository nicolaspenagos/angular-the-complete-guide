import { Component } from '@angular/core';
import { LogginService } from '../logging.service';
import { AccountsService } from '../account.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LogginService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LogginService,
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.css']
})
export class IndentComponent implements OnInit {
  indents: any = [];
  p: number = 1;
  userid:number;
  userrole:string;
  userRole: string;
  masterId: string;
  constructor(private auth:AuthService,private fpoService:FpoService) { }

  ngOnInit(): void {
    this.getIdent()
   
  }
  getIdent() {
    
    
    this.indents = [ ],
    // localStorage.setItem('userRole', response.userRole);
    //localStorage.setItem('masterId', response.masterId);
    this.userRole = localStorage.getItem('userRole');
    this.masterId = localStorage.getItem('masterId');
    console.log("User role on Indent List Page  = "+this.userRole);
    console.log("Master Id on Indent List Page  = "+this.masterId);
    
    if (this.userRole == 'ROLE_FPC') {  
      this.fpoService.getIndentByFpoId(this.masterId).subscribe(data=>{
        console.log("Data Has been received"+JSON.stringify(data));
        this.indents = data;
      })

    } else if(this.userRole == 'ROLE_MIN') {
      
    } else if(this.userRole == 'ROLE_BUYERSELLER'){
      
    }else{
      
    }


  }
}

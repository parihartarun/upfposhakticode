import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

        transform(list:  Array<any>, filterText: string): any {
          // console.log(list);
        // return list ? list.filter(item => item.description.search(new RegExp(filterText, 'i')) > -1) : [];
        if(!filterText){
          console.log('no search')
          return list;  
        }

        return list.filter(it=>{
            let sno,description,createDate;    
            sno = it.id.toString().includes(filterText) 
            description = it.description.toLowerCase().includes(filterText.toLowerCase())
            createDate = it.createDate.toLowerCase().includes(filterText.toLowerCase())
            if( createDate == null){
              createDate = false
            }
            if(description == null){
              description = false
            }
            if(sno == null){
              sno = false
            }
            //console.log( "SNO",sno );console.log( "Desc==>", description); 
            //console.log( "Create==>", createDate);
            return (sno + description +createDate);      
        })

      }

}

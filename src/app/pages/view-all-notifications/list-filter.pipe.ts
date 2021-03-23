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
            const sno = it.id.toString().includes(filterText) 
            const description = it.description.toLowerCase().includes(filterText.toLowerCase())
            const createDate = it.createDate.toLowerCase().includes(filterText.toLowerCase())
            //console.log( "SNO",sno );console.log( "Desc==>", description); 
            //console.log( "Create==>", createDate);
            return (sno + description +createDate);      
        })

      }

}

import { FormControl } from "@angular/forms";

export function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;
    let types = type.split(',');
    console.log(types);
    if (file) {
      const extensions = file.split('.');
      console.log();
      console.log(types.includes(extensions[extensions.length - 1].toLowerCase()));
      if (types.includes(extensions[extensions.length - 1].toLowerCase())) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}

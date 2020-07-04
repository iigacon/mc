import { Injectable } from '@nestjs/common';
const fs = require('fs');
const mime = require('mime-types');

@Injectable()
export class UploadService {

    fileSupported = ['image/bmp','image/png','image/gif','image/jpeg','video/mpeg','video/webm','video/mp2t','video/mp4'];

    checkSupported(data: any): boolean{
        return this.fileSupported.includes(mime.contentType(data.originalname));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async saveFile(data: any){
        const fileName =new Date().getTime()+'.'+this.getExtension(data.originalname);
        const fullFileName  =  "static/"+ fileName;
        fs.writeFileSync(fullFileName, data.buffer);
        return fileName;
    }

    getExtension(filename: string): string{
        try{
            return filename.split('.').pop();
        }catch (e) {
            return ''
        }
    }


}

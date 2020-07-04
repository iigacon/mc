import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, Request, UseGuards} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {UploadService} from "./upload.service";
import {FormResponseNOK, FormResponseOK} from "../modal/FormResponse";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('upload')
export class UploadController {

    constructor(private readonly uploadService: UploadService){}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Request() req: Request) {
        let res =  new FormResponseOK();
        try{
            if(this.uploadService.checkSupported(file)){
                res.data = 'http://'+req.headers['host']+'/'+await this.uploadService.saveFile(file);
                return res;
            }else{
                res =  new FormResponseNOK();
                res.message = `File don't support`;
                return res;
            }

        }catch (e) {
            return new FormResponseOK();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('uploads')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFiles(@UploadedFiles() files, @Request() req: Request) {
        let res =  new FormResponseOK();
        try{
            let isSupport = true;
            const listFiles = [];

            for (let i = 0; i < files.length; i++) {
                if(!this.uploadService.checkSupported(files[i])){
                    isSupport = false;
                    break;
                }
            }
            if(isSupport){
                for (let i = 0; i < files.length; i++) {
                    listFiles.push('http://'+req.headers['host']+'/'+await this.uploadService.saveFile(files[i]));
                }
                res.data = listFiles;
                return res;
            }else{
                res =  new FormResponseNOK();
                res.message = `File don't support`;
                return res;
            }

        }catch (e) {
            return new FormResponseOK();
        }
    }
}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventsModule} from "./gateway/events/events.module";
import {ScheduleModule} from "@nestjs/schedule";
import {TasksModule} from "./tasks/tasks.module";
import {AudioModule} from "./audio/audio.module";
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path";
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Anhduc1234',
      database: 'cm',
      autoLoadEntities: true,
      synchronize: false,
    }),
    EventsModule,
    ScheduleModule.forRoot(),
    TasksModule,
    AudioModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static')
    }),
    UploadModule,
  ],
  providers: [AppService, UploadService],
})
export class AppModule {}

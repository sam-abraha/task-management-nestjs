import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FilterUserInterceptor } from './filter-user.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema : configSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : async (configSerivce : ConfigService) => {
        return {
          type: 'postgres',
          host: configSerivce.get('DB_HOST'),
          port: configSerivce.get('DB_PORT'),
          username: configSerivce.get('DB_USERNAME'),
          password: configSerivce.get('DB_PASSWORD'),
          database: configSerivce.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [Task, User],
          controllers: [AppController],
        }
      }
    }),
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterUserInterceptor,
    },
  ],
})
export class AppModule {}
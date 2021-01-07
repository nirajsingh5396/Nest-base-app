import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environments';

@Module({
  imports: [MongooseModule.forRoot(environment.DB_PATH) ,UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

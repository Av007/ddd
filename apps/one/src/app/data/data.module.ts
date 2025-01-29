import { Module } from '@nestjs/common';
import { DataRepository } from './data.repository';
import {DatabaseModule} from '@libs/database';

@Module({
    imports: [DatabaseModule],
    providers: [DataRepository],
    exports: [DataRepository]
})
export class DataModule {}

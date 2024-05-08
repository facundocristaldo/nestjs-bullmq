import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BullModule } from "@nestjs/bull";
import { TRANSCODE_QUEUE } from "./constants";
import { TranscodeConsumer } from "./transcode.consumer";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          post: configService.get("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: TRANSCODE_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TranscodeConsumer],
})
export class AppModule {}

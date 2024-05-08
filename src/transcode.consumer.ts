import { Process, Processor } from "@nestjs/bull";
import { TRANSCODE_QUEUE } from "./constants";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log(`transcoding message: ${job.id}`);
    this.logger.debug(job.data);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000));
    this.logger.log(`transcoding complete for ${job.id}`);
  }
}

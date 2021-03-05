import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {

    public static log(message: string, context?: string) {
        super.log(message, context);
    }
}

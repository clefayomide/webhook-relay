import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';


// This file defines a factory function to create a logger instance using `nest-winston`.
// The logger supports daily rotating file logs for error and combined logs,
// and console logs for non-production environments.

export const LoggerFactory = () => {
  const logger = WinstonModule.createLogger({
    transports: [
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-error.log`,
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
        maxFiles: '30d',
      }),
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-combined.log`,
        format: format.combine(format.timestamp(), format.json()),
        maxFiles: '30d',
      }),
      ...(process.env.NODE_ENV !== 'production'
        ? [
            new transports.Console({
              format: format.combine(
                format.cli(),
                format.splat(),
                format.timestamp(),
                format.printf((info) => {
                  return `${info.timestamp} ${info.level}: ${info.message}`;
                }),
              ),
            }),
          ]
        : []),
    ],
  });

  return logger;
};

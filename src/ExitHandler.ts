import { httpTerminator, server } from './server';

const exitAction = (msg: string, code: number) => {
  console.log(msg);
  process.exit(code);
};

class ExitHandler {
  public async handleExit(code: number, timeout = 5000): Promise<void> {
    try {
      console.log(`Attempting a graceful shutdown with code ${code}`);

      setTimeout(() => {
        console.log(`Forcing a shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      if (server.listening) {
        console.log('Terminating HTTP connections');
        await httpTerminator.terminate();
      }

      exitAction(`Exiting gracefully with code ${code}`, code);
    } catch (error) {
      console.log('Error shutting down gracefully');
      console.log(error);

      exitAction(`Forcing exit with code ${code}`, code);
    }
  }
}

export const exitHandler = new ExitHandler();

import { SetupWorkerApi } from "msw";
import { SetupServerApi } from "msw/node";

let workerOrServer: SetupWorkerApi | SetupServerApi | undefined;

export async function startMsw() {
  if (workerOrServer) {
    return;
  }

  if (typeof window === "undefined") {
    const { server } = await import("./server");
    workerOrServer = server;
    server.listen();
  } else {
    const { worker } = await import("./browser");
    workerOrServer = worker;
    worker.start();
  }
}

export function stopMsw() {
  if (!workerOrServer) {
    return;
  }

  if (typeof window === "undefined") {
    (workerOrServer as SetupServerApi).close();
    workerOrServer = undefined;
  } else {
    (workerOrServer as SetupWorkerApi).stop();
    workerOrServer = undefined;
  }
}

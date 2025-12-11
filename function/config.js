export async function onRequestGet(context) {
    return new Response(
      JSON.stringify({
        workerUrl: context.env.WORKER_URL
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }
  